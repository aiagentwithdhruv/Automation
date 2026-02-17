---
name: ai-chat-app
description: Multi-provider AI chat application architecture with voice, memory, and usage tracking. Use when asked to build or modify an AI chat app, add model providers, implement voice features, manage memory systems, or track API usage costs.
---

# Multi-Provider AI Chat Application

## Goal
Build and maintain a multi-provider AI chat application with voice, memory, and cost tracking.

## Architecture Pattern

- **Framework:** Next.js 14 App Router
- **Providers:** OpenAI, Anthropic, Perplexity, Google, OpenRouter
- **Persistence:** Cookies (API keys), JSON files (usage + memory)

## Key Architecture Decisions

### Provider Routing
- Each provider has its own function returning `rawData` for token extraction
- Token extraction differs by provider — normalize in a shared `extractTokenUsage` function
- Strip `rawData` before sending to client

### Memory System
- JSON file persistence, lazy loaded
- 500 entry cap, auto-saved
- Memory context injected into every chat call
- Tools: `save_memory` (AI saves) + `recall_memory` (AI retrieves)

### Voice (Realtime)
- GPT-4o Realtime API for real-time voice
- Separate audio/text token pricing
- `calculateRealtimeCost()` for accurate cost tracking

### API Key Resolution
- Priority: environment variables first, then cookies
- Settings page saves keys as HTTP-only cookies

### Cost Tracking
- Per-call token counting with provider-specific extraction
- Separate text vs. voice usage logging
- Real-time dashboard display

## Common Build Issues & Fixes

| Issue | Fix |
|-------|-----|
| `ArrayBufferLike` type error in voice | Cast `as ArrayBuffer` + `new Float32Array()` |
| Union type on `result.toolCalls` | Type `result` as `any` |
| Realtime model constant in catch block | Use `DEFAULT_REALTIME_MODEL` constant |
| API key not found | Check env vars before cookies |
| Errors not visible in frontend | Check `data.error` before processing |
