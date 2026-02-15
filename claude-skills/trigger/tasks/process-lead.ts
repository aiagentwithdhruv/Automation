/**
 * Process Lead Task
 *
 * Webhook equivalent for the "process-lead" slug.
 * Uses the execute-directive task to classify and process incoming leads.
 */
import { task, logger } from "@trigger.dev/sdk/v3";
import { executeDirective } from "./execute-directive";

interface ProcessLeadPayload {
  data: Record<string, any>;
  maxTurns?: number;
}

export const processLead = task({
  id: "process-lead",
  retry: {
    maxAttempts: 2,
  },
  run: async (payload: ProcessLeadPayload) => {
    logger.info("Processing lead", { payload });

    // Trigger the directive executor and wait for result
    const result = await executeDirective.triggerAndWait({
      slug: "process-lead",
      directiveName: "classify_leads_llm",
      inputData: payload.data,
      allowedTools: ["send_email", "read_sheet", "update_sheet"],
      maxTurns: payload.maxTurns || 15,
    });

    if (!result.ok) {
      throw new Error(`Directive failed: ${result.error}`);
    }

    return {
      status: "success",
      slug: "process-lead",
      mode: "agentic",
      directive: "classify_leads_llm",
      response: result.output.response,
      usage: result.output.usage,
      timestamp: new Date().toISOString(),
    };
  },
});
