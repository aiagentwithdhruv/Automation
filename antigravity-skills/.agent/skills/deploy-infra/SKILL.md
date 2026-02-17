---
name: deploy-infra
description: Deploy applications, create webhooks, manage servers, and design websites. Use when asked to deploy to cloud, set up webhooks, run local servers, design landing pages, or manage infrastructure.
---

# Deployment & Infrastructure

## Goal
Deploy applications to cloud platforms, set up webhooks, manage servers, and build websites.

## Modal Deployment

### Quick Deploy
```bash
modal deploy execution/modal_webhook.py
```

### Webhook Endpoints (replace `your-username`)
- List: `https://your-username--claude-orchestrator-list-webhooks.modal.run`
- Execute: `https://your-username--claude-orchestrator-directive.modal.run?slug={slug}`
- Test: `https://your-username--claude-orchestrator-test-email.modal.run`

### Available Webhook Tools
`send_email`, `read_sheet`, `update_sheet`

## Free AI Infrastructure (Euri API)

- Base URL: `https://api.euron.one/api/v1/euri`
- **200,000 free tokens/day** (resets midnight UTC)
- OpenAI-compatible format
- Endpoints: `/chat/completions`, `/embeddings`, `/images/generations`
- Models: `gemini-2.5-flash`, `gpt-4.1-nano`, `gemini-2.5-pro`
- Python SDK: `pip install euriai`

## Hosting Patterns

| Service | Best For |
|---------|---------|
| Hostinger VPS | n8n self-hosted |
| Vercel | Next.js frontends |
| Modal | Serverless functions, webhooks |
| Railway | Backend services |
