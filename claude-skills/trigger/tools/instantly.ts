/**
 * Instantly tools for email automation
 */

interface Email {
  id: string;
  uuid: string;
  from: string;
  to: string[];
  subject: string;
  body_text: string;
  body_html: string;
  timestamp: string;
  eaccount: string;
}

export async function getEmails(
  leadEmail: string,
  limit: number = 10
): Promise<{ count: number; emails: Email[] }> {
  const apiKey = process.env.INSTANTLY_API_KEY;
  if (!apiKey) {
    throw new Error("INSTANTLY_API_KEY not configured");
  }

  const url = new URL("https://api.instantly.ai/api/v2/emails");
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", leadEmail);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`Instantly API error: ${response.status} - ${text}`);
    throw new Error(`Instantly API error: ${response.status}`);
  }

  const data = (await response.json()) as { items?: any[] };
  const items = data.items || [];

  console.log(`📬 Retrieved ${items.length} emails for ${leadEmail}`);

  // Format emails for easier reading
  const formatted: Email[] = items.map((item: any) => ({
    id: item.id,
    uuid: item.uuid,
    from: item.from_address_email,
    to: item.to_address_email_list,
    subject: item.subject,
    body_text: item.body?.text || "",
    body_html: item.body?.html || "",
    timestamp: item.timestamp,
    eaccount: item.eaccount,
  }));

  return { count: formatted.length, emails: formatted };
}

export async function sendReply(
  eaccount: string,
  replyToUuid: string,
  subject: string,
  htmlBody: string
): Promise<{ status: string; reply_to_uuid: string }> {
  const apiKey = process.env.INSTANTLY_API_KEY;
  if (!apiKey) {
    throw new Error("INSTANTLY_API_KEY not configured");
  }

  const response = await fetch("https://api.instantly.ai/api/v2/emails/reply", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eaccount,
      reply_to_uuid: replyToUuid,
      subject,
      body: { html: htmlBody },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`Instantly reply error: ${response.status} - ${text}`);
    throw new Error(
      `Instantly API error: ${response.status} - ${text}`
    );
  }

  console.log(`📤 Reply sent via Instantly to thread ${replyToUuid}`);
  return { status: "sent", reply_to_uuid: replyToUuid };
}

// Tool definitions for Claude
export const instantlyGetEmailsTool = {
  name: "instantly_get_emails",
  description:
    "Get email conversation history from Instantly for a specific lead email address.",
  input_schema: {
    type: "object" as const,
    properties: {
      lead_email: {
        type: "string",
        description: "The lead's email address to search for",
      },
      limit: {
        type: "integer",
        description: "Max emails to return (default 10)",
        default: 10,
      },
    },
    required: ["lead_email"],
  },
};

export const instantlySendReplyTool = {
  name: "instantly_send_reply",
  description: "Send a reply to an email thread in Instantly.",
  input_schema: {
    type: "object" as const,
    properties: {
      eaccount: {
        type: "string",
        description: "The email account to send from",
      },
      reply_to_uuid: {
        type: "string",
        description: "The UUID of the email to reply to",
      },
      subject: { type: "string", description: "Email subject line" },
      html_body: { type: "string", description: "HTML body of the reply" },
    },
    required: ["eaccount", "reply_to_uuid", "subject", "html_body"],
  },
};
