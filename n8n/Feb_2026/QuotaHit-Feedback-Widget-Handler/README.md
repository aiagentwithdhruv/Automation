# QuotaHit - Feedback Widget Handler

**n8n Workflow ID:** `W4p7Z4rfFNMPIV1d`
**Nodes:** 17
**Created:** 2026-02-21
**Last Updated:** 2026-02-21

## Description

Processes user feedback submitted through the QuotaHit in-app feedback widget. Classifies sentiment, stores responses, and sends alerts for negative feedback.

## Use Case

Automated feedback collection and triage for SaaS products.

## Nodes

| Node Name | Type |
|-----------|------|
| Feedback Webhook | `webhook` |
| Is Feedback? | `if` |
| Has Screenshot? | `if` |
| Base64 to Binary | `code` |
| Upload to Drive | `googleDrive` |
| Set Screenshot URL | `code` |
| No Screenshot | `code` |
| Merge | `merge` |
| Format Feedback | `code` |
| Telegram | `telegram` |
| Gmail | `gmail` |
| Prepare Sheet Row | `code` |
| Log to Sheet | `googleSheets` |
| Respond OK | `respondToWebhook` |
| Format Vote | `code` |
| Log Vote | `googleSheets` |
| Respond Vote OK | `respondToWebhook` |

## Required Credentials

- Webhook
- Google Sheets
- Telegram

## Setup

1. Import `workflow.json` into your n8n instance
2. Configure the credentials listed above
3. Activate the workflow

## Source

Exported from https://n8n.aiwithdhruv.cloud on 2026-02-22.
