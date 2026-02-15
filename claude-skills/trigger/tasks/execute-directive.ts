/**
 * Execute Directive Task
 *
 * Core agentic executor that reads a directive file and runs Claude with tools.
 * This is the TypeScript equivalent of the Modal run_directive() function.
 */
import { task, logger } from "@trigger.dev/sdk/v3";
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs/promises";
import * as path from "path";
import {
  getToolsForDirective,
  executeTool,
} from "../tools";
import {
  notify,
  directiveStartBlocks,
  thinkingBlocks,
  toolCallBlocks,
  toolResultBlocks,
  completeBlocks,
} from "../tools/slack";

interface DirectivePayload {
  slug: string;
  directiveName: string;
  inputData: Record<string, any>;
  allowedTools: string[];
  maxTurns?: number;
}

interface DirectiveResult {
  response: string;
  thinking: { turn: number | string; thinking: string }[];
  conversation: {
    turn: number;
    tool: string;
    input: any;
    result?: string;
  }[];
  usage: {
    input_tokens: number;
    output_tokens: number;
    turns: number;
  };
}

// Extended content block type to include thinking (newer SDK feature)
interface ThinkingBlock {
  type: "thinking";
  thinking: string;
}

type ExtendedContentBlock = Anthropic.ContentBlock | ThinkingBlock;

async function loadDirective(directiveName: string): Promise<string> {
  // Try multiple possible locations
  const possiblePaths = [
    path.join(process.cwd(), "directives", `${directiveName}.md`),
    path.join("/app", "directives", `${directiveName}.md`),
    `./directives/${directiveName}.md`,
  ];

  for (const directivePath of possiblePaths) {
    try {
      const content = await fs.readFile(directivePath, "utf-8");
      logger.info(`Loaded directive from ${directivePath}`);
      return content;
    } catch {
      // Try next path
    }
  }

  throw new Error(`Directive not found: ${directiveName}`);
}

export const executeDirective = task({
  id: "execute-directive",
  retry: {
    maxAttempts: 2,
  },
  run: async (payload: DirectivePayload): Promise<DirectiveResult> => {
    const {
      slug,
      directiveName,
      inputData,
      allowedTools,
      maxTurns = 15,
    } = payload;

    logger.info(`🎯 Executing directive: ${slug}`);

    // Load directive content
    const directiveContent = await loadDirective(directiveName);

    // Initialize Anthropic client
    const anthropic = new Anthropic();

    // Build prompt
    const prompt = `You are executing a specific directive. Follow it precisely.

## DIRECTIVE
${directiveContent}

## INPUT DATA
${inputData ? JSON.stringify(inputData, null, 2) : "No input data provided."}

## INSTRUCTIONS
1. Read and understand the directive above
2. Use the available tools to accomplish the task
3. Report your results clearly

Execute the directive now.`;

    // Get tool definitions for allowed tools only
    const tools = getToolsForDirective(allowedTools);

    // Initialize conversation
    const messages: Anthropic.MessageParam[] = [
      { role: "user", content: prompt },
    ];

    const conversationLog: DirectiveResult["conversation"] = [];
    const thinkingLog: DirectiveResult["thinking"] = [];
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let turnCount = 0;

    // Notify Slack of start
    await notify(
      `Directive ${slug} started`,
      directiveStartBlocks(slug, directiveName, inputData)
    );

    // Request params with extended thinking (type cast to bypass SDK type limitation)
    const createRequest = (msgs: Anthropic.MessageParam[]) => ({
      model: "claude-opus-4-5-20251101",
      max_tokens: 40000,
      tools: tools as Anthropic.Tool[],
      messages: msgs,
      // Extended thinking - cast to any to bypass SDK types
      thinking: {
        type: "enabled",
        budget_tokens: 32000,
      },
    });

    // Initial request (cast to any for extended thinking support)
    let response = await (anthropic.messages.create as any)(createRequest(messages));

    totalInputTokens += response.usage.input_tokens;
    totalOutputTokens += response.usage.output_tokens;

    // Tool use loop
    while (response.stop_reason === "tool_use" && turnCount < maxTurns) {
      turnCount++;

      // Process content blocks (including thinking)
      const contentBlocks = response.content as ExtendedContentBlock[];
      for (const block of contentBlocks) {
        if (block.type === "thinking") {
          thinkingLog.push({ turn: turnCount, thinking: block.thinking });
          await notify(
            `Turn ${turnCount} thinking`,
            thinkingBlocks(turnCount, block.thinking)
          );
        }
      }

      // Find tool use block
      const toolUse = contentBlocks.find(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
      );

      if (!toolUse) break;

      let toolResult: string;
      let isError = false;

      // Security check: only execute allowed tools
      if (!allowedTools.includes(toolUse.name)) {
        toolResult = JSON.stringify({
          error: `Tool '${toolUse.name}' not permitted for this directive`,
        });
        isError = true;
      } else {
        // Log tool call
        await notify(
          `Tool: ${toolUse.name}`,
          toolCallBlocks(turnCount, toolUse.name, toolUse.input as Record<string, any>)
        );

        conversationLog.push({
          turn: turnCount,
          tool: toolUse.name,
          input: toolUse.input,
        });

        // Execute tool
        const { result, error } = await executeTool(
          toolUse.name,
          toolUse.input
        );

        if (error) {
          toolResult = JSON.stringify({ error });
          isError = true;
        } else {
          toolResult = JSON.stringify(result);
        }

        conversationLog[conversationLog.length - 1].result = toolResult;
      }

      // Notify result
      await notify(
        `Result: ${toolUse.name}`,
        toolResultBlocks(turnCount, toolUse.name, toolResult, isError)
      );

      // Continue conversation
      messages.push({ role: "assistant", content: response.content });
      messages.push({
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: toolResult,
          },
        ],
      });

      // Next request
      response = await (anthropic.messages.create as any)(createRequest(messages));

      totalInputTokens += response.usage.input_tokens;
      totalOutputTokens += response.usage.output_tokens;
    }

    // Extract final response text
    let finalText = "";
    const finalBlocks = response.content as ExtendedContentBlock[];
    for (const block of finalBlocks) {
      if (block.type === "text") {
        finalText += (block as Anthropic.TextBlock).text;
      }
      if (block.type === "thinking") {
        thinkingLog.push({ turn: "final", thinking: block.thinking });
      }
    }

    const usage = {
      input_tokens: totalInputTokens,
      output_tokens: totalOutputTokens,
      turns: turnCount,
    };

    // Notify completion
    await notify("Complete", completeBlocks(finalText, usage));

    logger.info(`✨ Directive complete: ${turnCount} turns, ${totalInputTokens}+${totalOutputTokens} tokens`);

    return {
      response: finalText,
      thinking: thinkingLog,
      conversation: conversationLog,
      usage,
    };
  },
});
