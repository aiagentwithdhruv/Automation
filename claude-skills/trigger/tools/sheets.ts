/**
 * Google Sheets tools for reading and updating spreadsheets
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

export async function readSheet(
  spreadsheetId: string,
  range: string
): Promise<{ rows: number; values: string[][] }> {
  const tokenData = getTokenData();
  const auth = getAuthClient(tokenData);
  const sheets = google.sheets({ version: "v4", auth });

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const values = (result.data.values as string[][]) || [];
  console.log(`📊 Read ${values.length} rows from sheet`);

  return {
    rows: values.length,
    values,
  };
}

export async function updateSheet(
  spreadsheetId: string,
  range: string,
  values: string[][]
): Promise<{ updated_cells: number }> {
  const tokenData = getTokenData();
  const auth = getAuthClient(tokenData);
  const sheets = google.sheets({ version: "v4", auth });

  const result = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  });

  const updatedCells = result.data.updatedCells || 0;
  console.log(`📊 Updated ${updatedCells} cells`);

  return {
    updated_cells: updatedCells,
  };
}

// Tool definitions for Claude
export const readSheetTool = {
  name: "read_sheet",
  description:
    "Read data from a Google Sheet. Returns all rows as a 2D array.",
  input_schema: {
    type: "object" as const,
    properties: {
      spreadsheet_id: { type: "string", description: "The Google Sheet ID" },
      range: {
        type: "string",
        description:
          "A1 notation range (e.g., 'Sheet1!A1:D10' or 'Sheet1!A:Z' for all)",
      },
    },
    required: ["spreadsheet_id", "range"],
  },
};

export const updateSheetTool = {
  name: "update_sheet",
  description: "Update cells in a Google Sheet.",
  input_schema: {
    type: "object" as const,
    properties: {
      spreadsheet_id: { type: "string", description: "The Google Sheet ID" },
      range: { type: "string", description: "A1 notation range" },
      values: {
        type: "array",
        description: "2D array of values to write",
      },
    },
    required: ["spreadsheet_id", "range", "values"],
  },
};
