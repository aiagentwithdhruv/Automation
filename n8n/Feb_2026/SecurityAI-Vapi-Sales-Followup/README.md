# SecurityAI - Vapi Sales Follow-up

**n8n Workflow ID:** `aeB7LxxNmLfJJEJC`
**Nodes:** 11
**Created:** 2026-02-17
**Last Updated:** 2026-02-18

## Description

Automated sales follow-up workflow for Paladin Security AI. Receives Vapi voice call data via webhook, extracts call details, routes actions (email follow-up, meeting scheduling), parses date/time with AI, creates Google Calendar events, and logs everything to Google Sheets.

## Use Case

Automate post-call follow-up for AI voice sales agents — send emails, book meetings, log to CRM.

## Nodes

| Node Name | Type |
|-----------|------|
| Vapi Webhook | `webhook` |
| Extract Call Data | `code` |
| Route by Action | `switch` |
| Send Meeting Email | `gmail` |
| Send Info Email | `gmail` |
| Send Callback Email | `gmail` |
| Log to Google Sheet | `googleSheets` |
| Respond to Vapi | `respondToWebhook` |
| AI Parse DateTime | `code` |
| Create an event | `googleCalendar` |
| Calendar Ready? | `if` |

## Required Credentials

- Gmail
- Google Calendar
- Google Sheets
- OpenAI/OpenRouter

## Setup

1. Import `workflow.json` into your n8n instance
2. Configure the credentials listed above
3. Activate the workflow

## Source

Exported from https://n8n.aiwithdhruv.cloud on 2026-02-22.
