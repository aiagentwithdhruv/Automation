# QuotaHit - Daily Blog Post Generator

**n8n Workflow ID:** `UCSCmilt6au6vaRG`
**Nodes:** 18
**Created:** 2026-02-20
**Last Updated:** 2026-02-21

## Description

Generates daily SEO blog posts for quotahit.com using Claude Sonnet 4.6 for writing and Nano Banana Pro (fal.ai) for featured images. Posts are saved to Google Drive and served on the website.

## Use Case

Automated daily blog content generation for SaaS marketing — AI writes, AI illustrates, auto-publishes.

## Nodes

| Node Name | Type |
|-----------|------|
| Daily 9AM IST | `scheduleTrigger` |
| Pick Today's Topic | `code` |
| Generate Blog (Claude Sonnet 4.6) | `httpRequest` |
| Parse & Format | `code` |
| Image Prompt | `code` |
| Generate Image (Nano Banana) | `httpRequest` |
| Process Image | `code` |
| IF Has Image | `if` |
| Upload to Drive | `googleDrive` |
| Share Public | `httpRequest` |
| Build Image URL | `code` |
| Publish to QuotaHit | `httpRequest` |
| Notify Dhruv | `telegram` |
| Evening 6PM IST | `scheduleTrigger` |
| Ping Google Sitemap | `httpRequest` |
| Prepare Social Post | `code` |
| Share on LinkedIn | `linkedIn` |
| Share on Twitter | `twitter` |

## Required Credentials

- OpenRouter (Claude)
- fal.ai (image gen)
- Google Drive
- Google Sheets

## Setup

1. Import `workflow.json` into your n8n instance
2. Configure the credentials listed above
3. Activate the workflow

## Source

Exported from https://n8n.aiwithdhruv.cloud on 2026-02-22.
