/**
 * Gmail tool for sending emails via Google Gmail API
 */
import { google } from "googleapis";

interface TokenData {
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

function getAuthClient(tokenData: TokenData) {
  const oauth2Client = new google.auth.OAuth2(
    tokenData.client_id,
    tokenData.client_secret
  );

  oauth2Client.setCredentials({
    refresh_token: tokenData.refresh_token,
  });

  return oauth2Client;
}

function getTokenData(): TokenData {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing Google OAuth credentials. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN"
    );
  }

  return {
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  };
}

export async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<{ status: string; message_id: string }> {
  const tokenData = getTokenData();
  const auth = getAuthClient(tokenData);
  const gmail = google.gmail({ version: "v1", auth });

  // Create email in RFC 2822 format
  const emailLines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    body,
  ];
  const email = emailLines.join("\r\n");

  // Base64url encode
  const encodedEmail = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const result = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedEmail,
    },
  });

  console.log(`📧 Email sent to ${to} | ID: ${result.data.id}`);

  return {
    status: "sent",
    message_id: result.data.id || "",
  };
}

// Tool definition for Claude
export const sendEmailTool = {
  name: "send_email",
  description: "Send an email via Gmail.",
  input_schema: {
    type: "object" as const,
    properties: {
      to: { type: "string", description: "Recipient email address" },
      subject: { type: "string", description: "Email subject line" },
      body: { type: "string", description: "Email body content" },
    },
    required: ["to", "subject", "body"],
  },
};
