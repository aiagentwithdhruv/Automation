/**
 * Slack notification tool
 */

interface SlackBlock {
  type: string;
  text?: { type: string; text: string; emoji?: boolean };
  fields?: { type: string; text: string }[];
}

export async function notify(
  message: string,
  blocks?: SlackBlock[]
): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("SLACK_WEBHOOK_URL not configured, skipping notification");
    return;
  }

  const payload: { text: string; blocks?: SlackBlock[] } = { text: message };
  if (blocks) {
    payload.blocks = blocks;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Slack notification failed: ${response.status}`);
    }
  } catch (error) {
    console.error(`Slack notification error: ${error}`);
  }
}

export function directiveStartBlocks(
  slug: string,
  directive: string,
  inputData: Record<string, any>
): SlackBlock[] {
  const inputStr = JSON.stringify(inputData, null, 2).slice(0, 800) || "None";
  const time = new Date().toISOString().slice(11, 19) + " UTC";

  return [
    {
      type: "header",
      text: { type: "plain_text", text: `🎯 Directive: ${slug}`, emoji: true },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Directive:* \`${directive}\`` },
        { type: "mrkdwn", text: `*Time:* ${time}` },
      ],
    },
    {
      type: "section",
      text: { type: "mrkdwn", text: `*Input:*\n\`\`\`${inputStr}\`\`\`` },
    },
    { type: "divider" },
  ];
}

export function thinkingBlocks(turn: number, thinking: string): SlackBlock[] {
  const truncated =
    thinking.length > 2500 ? thinking.slice(0, 2500) + "..." : thinking;
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `🧠 *Turn ${turn}:*\n\`\`\`${truncated}\`\`\``,
      },
    },
  ];
}

export function toolCallBlocks(
  turn: number,
  toolName: string,
  toolInput: Record<string, any>
): SlackBlock[] {
  const inputStr = JSON.stringify(toolInput, null, 2).slice(0, 1500);
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `🔧 *Turn ${turn} - ${toolName}:*\n\`\`\`${inputStr}\`\`\``,
      },
    },
  ];
}

export function toolResultBlocks(
  turn: number,
  toolName: string,
  result: string,
  isError: boolean = false
): SlackBlock[] {
  const emoji = isError ? "❌" : "✅";
  const truncated = result.length > 1500 ? result.slice(0, 1500) + "..." : result;
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${emoji} *Result:*\n\`\`\`${truncated}\`\`\``,
      },
    },
  ];
}

export function completeBlocks(
  response: string,
  usage: { input_tokens: number; output_tokens: number; turns: number }
): SlackBlock[] {
  const truncated =
    response.length > 2000 ? response.slice(0, 2000) + "..." : response;
  return [
    { type: "divider" },
    {
      type: "header",
      text: { type: "plain_text", text: "✨ Complete", emoji: true },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Tokens:* ${usage.input_tokens}→${usage.output_tokens}`,
        },
        { type: "mrkdwn", text: `*Turns:* ${usage.turns}` },
      ],
    },
    {
      type: "section",
      text: { type: "mrkdwn", text: `*Response:*\n\`\`\`${truncated}\`\`\`` },
    },
  ];
}

export function errorBlocks(error: string): SlackBlock[] {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `❌ *Error:*\n\`\`\`${error.slice(0, 2000)}\`\`\``,
      },
    },
  ];
}
