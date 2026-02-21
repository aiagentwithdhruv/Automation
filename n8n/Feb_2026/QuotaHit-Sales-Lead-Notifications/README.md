# QuotaHit Sales Agent Lead Notifications

**n8n Workflow ID:** `EwldtVuZqsLomLfS`
**Nodes:** 5
**Created:** 2026-02-21
**Last Updated:** 2026-02-21

## Description

Monitors new sales leads and sends real-time notifications via Telegram when new leads come in through QuotaHit.

## Use Case

Instant lead alerts — never miss a new signup or sales inquiry.

## Nodes

| Node Name | Type |
|-----------|------|
| Webhook | `webhook` |
| Format Message | `code` |
| Notify Dhruv | `telegram` |
| Prepare Sheet Row | `code` |
| Log to Sheet | `googleSheets` |

## Required Credentials

- Telegram
- Webhook

## Setup

1. Import `workflow.json` into your n8n instance
2. Configure the credentials listed above
3. Activate the workflow

## Source

Exported from https://n8n.aiwithdhruv.cloud on 2026-02-22.
