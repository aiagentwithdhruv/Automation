# AIwithDhruv - Social Media v3

**n8n Workflow ID:** `HrHmBqxevYgegY37`
**Nodes:** 21
**Created:** 2026-02-14
**Last Updated:** 2026-02-21

## Description

Full social media automation: reads topics from Google Sheets, generates content with GPT-5 + Perplexity research, creates images via fal.ai (Nano Banana Pro), posts to LinkedIn and Twitter with images, and sends Telegram notifications. Runs on schedule (10 AM + 10 PM IST).

## Use Case

Automated AI-powered social media posting with image generation — LinkedIn + Twitter on autopilot.

## Nodes

| Node Name | Type |
|-----------|------|
| 10 AM Trigger | `scheduleTrigger` |
| 10 PM Trigger | `scheduleTrigger` |
| Manual Trigger | `manualTrigger` |
| Set Time Slot | `set` |
| Get Topic | `googleSheets` |
| Has Topic? | `if` |
| No Topics | `telegram` |
| Update Generating | `googleSheets` |
| AI Content Generator | `agent` |
| GPT-5 | `lmChatOpenAi` |
| Perplexity Research | `perplexityTool` |
| Parse Content | `set` |
| Generate Image | `httpRequest` |
| Wait for Image | `wait` |
| Get Image Result | `httpRequest` |
| Save to Sheet | `googleSheets` |
| Download Post Image | `httpRequest` |
| Post LinkedIn + Image | `linkedIn` |
| Post Twitter | `twitter` |
| Mark Posted | `googleSheets` |
| Notify Done | `telegram` |

## Required Credentials

- OpenAI (GPT-5)
- Perplexity
- fal.ai
- Google Sheets
- LinkedIn OAuth
- Twitter
- Telegram

## Setup

1. Import `workflow.json` into your n8n instance
2. Configure the credentials listed above
3. Activate the workflow

## Source

Exported from https://n8n.aiwithdhruv.cloud on 2026-02-22.
