# Claude Telegram Sender

**n8n Workflow ID:** `fkErsg4iulUvpcsa`
**Nodes:** 2
**Created:** 2026-02-15
**Last Updated:** 2026-02-15

## Description

Utility workflow that sends messages to Telegram via Claude. Used as a helper for other workflows to send notifications.

## Use Case

Reusable Telegram notification sender for any n8n workflow.

## Nodes

| Node Name | Type |
|-----------|------|
| When chat message received | `chatTrigger` |
| Send Telegram | `telegram` |

## Required Credentials

- Telegram

## Setup

1. Import `workflow.json` into your n8n instance
2. Configure the credentials listed above
3. Activate the workflow

## Source

Exported from https://n8n.aiwithdhruv.cloud on 2026-02-22.
