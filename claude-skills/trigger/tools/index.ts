/**
 * Tool exports and registry
 */

export * from "./gmail";
export * from "./sheets";
export * from "./instantly";
export * from "./slack";
export * from "./web";

// Import tool definitions
import { sendEmailTool, sendEmail } from "./gmail";
import { readSheetTool, updateSheetTool, readSheet, updateSheet } from "./sheets";
import {
  instantlyGetEmailsTool,
  instantlySendReplyTool,
  getEmails,
  sendReply,
} from "./instantly";
import { webSearchTool, webFetchTool, webSearch, webFetch } from "./web";

// All tool definitions for Claude
export const ALL_TOOLS: Record<string, any> = {
  send_email: sendEmailTool,
  read_sheet: readSheetTool,
  update_sheet: updateSheetTool,
  instantly_get_emails: instantlyGetEmailsTool,
  instantly_send_reply: instantlySendReplyTool,
  web_search: webSearchTool,
  web_fetch: webFetchTool,
};

// Tool implementations - call these with tool_use.input
export const TOOL_IMPLEMENTATIONS: Record<
  string,
  (input: any) => Promise<any>
> = {
  send_email: async (input: { to: string; subject: string; body: string }) =>
    sendEmail(input.to, input.subject, input.body),

  read_sheet: async (input: { spreadsheet_id: string; range: string }) =>
    readSheet(input.spreadsheet_id, input.range),

  update_sheet: async (input: {
    spreadsheet_id: string;
    range: string;
    values: string[][];
  }) => updateSheet(input.spreadsheet_id, input.range, input.values),

  instantly_get_emails: async (input: { lead_email: string; limit?: number }) =>
    getEmails(input.lead_email, input.limit),

  instantly_send_reply: async (input: {
    eaccount: string;
    reply_to_uuid: string;
    subject: string;
    html_body: string;
  }) => sendReply(input.eaccount, input.reply_to_uuid, input.subject, input.html_body),

  web_search: async (input: { query: string }) => webSearch(input.query),

  web_fetch: async (input: { url: string }) => webFetch(input.url),
};

// Get filtered tools for a directive
export function getToolsForDirective(allowedTools: string[]): any[] {
  return allowedTools
    .filter((name) => ALL_TOOLS[name])
    .map((name) => ALL_TOOLS[name]);
}

// Execute a tool by name
export async function executeTool(
  toolName: string,
  input: any
): Promise<{ result: any; error?: string }> {
  const impl = TOOL_IMPLEMENTATIONS[toolName];
  if (!impl) {
    return { result: null, error: `No implementation for tool: ${toolName}` };
  }

  try {
    const result = await impl(input);
    return { result };
  } catch (error) {
    return {
      result: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
