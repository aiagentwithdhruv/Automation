---
name: n8n-automation
description: Build, modify, and manage n8n workflows. Use when asked to create automations, set up Google Sheets for workflows, configure scheduling, connect nodes, or troubleshoot n8n workflows.
---

# n8n Workflow Automation

## Goal
Build and manage n8n workflows on a self-hosted or cloud instance.

## Google Sheet Setup Pattern

When creating a Google Sheet for any workflow:

1. Use an EXISTING spreadsheet (from Google Sheets credential)
2. Create a NEW TAB (not a new spreadsheet) with the workflow name
3. Build a one-time utility workflow in n8n:
   - **Code node** generates all rows as items (with column headers as keys)
   - **Google Sheets "append" node** with `autoMapInputData` mode
   - Headers auto-create from first item's keys (no manual column creation)
4. After running, DELETE the utility workflow (one-time use only)

## Credential Reference

> Fill in your own n8n credential IDs below.

| Service | Credential ID | Notes |
|---------|--------------|-------|
| Google Sheets | `your-id` | |
| Google Drive | `your-id` | |
| Telegram | `your-id` | |
| OpenAI | `your-id` | |
| Gmail | `your-id` | |

## Free AI API Trick

Use OpenAI credential with Euri base URL (`https://api.euron.one/api/v1/euri`) in any OpenAI node for **200K free tokens/day**.

Models: `gemini-2.5-flash` (general), `gpt-4.1-nano` (fast), `gemini-2.5-pro` (smart)

## Workflow Policy

- Always export workflow JSON from n8n and use that file
- Do NOT manually recreate workflow JSON
- Check existing workflows before building new ones
