# AI Handoff Context (Dhruv Tomar / Agentic AI Hub)

Last updated: 2026-02-10

IMPORTANT: This is the MASTER CONTEXT FILE. Read this FIRST in every new session.
This file captures everything: clients, pipeline, priorities, decisions, budget, and technical state.
UPDATE THIS FILE at the end of every session with new information.

---

## 1) Identity, brand, and links

- Name: Dhruv Tomar
- Brand: AiwithDhruv
- Tagline: Turning AI into Outcomes
- Website: https://agenticaisolutonshub.com/
- YouTube: https://www.youtube.com/@aiwithdhruv
- LinkedIn (personal): https://www.linkedin.com/in/dhruv-tomar-674a5b204/
- LinkedIn (brand): https://www.linkedin.com/in/aiwithdhruv/
- Calendly: https://calendly.com/aiwithdhruv/makeaiworkforyou

Proof links (production AI):
- End-to-end AI product: https://youtu.be/N1btQ3VaKQQ
- Agentic AI (self-hosted): https://www.youtube.com/live/jQqFbps-Z0k
- Agentic AI demo: https://youtu.be/KGGFc9cee0I
- Agentic automation: https://youtu.be/_zqu6bgxA7s
- Self-hosted Open WebUI on AWS: https://youtu.be/I-sg2XJhumk
- Real-time AI voice agents: https://youtu.be/3hzoRwTRuTU

---

## 2) High-paying job hunt context

Goal:
- Target CTC: 30 LPA to 1 Cr
- Target roles: AI Solutions Architect, Head/Director of AI, Applied AI Engineer, Sales Head/VP Sales (B2B SaaS)
- USP: production AI systems (not POCs), sales + AI combo, one-man-army execution

Preferences (current):
- Location: Gurgaon (flexible)
- Notice period: 15 to 30 days preferred

Templates and files:
- Job context: `High Paying Jobs/JOB-CONTEXT.md`
- Recruiter replies and LinkedIn templates: `High Paying Jobs/LINKEDIN-TEMPLATES.md`

Style and standards for job replies:
- Confident, direct, no fluff
- Emphasize production delivery, revenue impact, and end-to-end ownership
- Position for senior AI leadership or AI solutions roles

Open items:
- Keep replying to recruiters with the above positioning
- Continue prioritizing high-impact, high-CTC roles (global or remote)

---

## 3) n8n workflows summary (core)

Hosting:
- Self-hosted n8n on Hostinger VPS
- Domain: https://n8n.aiwithdhruv.cloud

Active workflows (from `.context/workflows.md`):
- Daily AI News Digest (ID: eXFngiKv2boNVs4q)
  - Runs daily, curates AI news and sends HTML email
- AI Chat Bot (webhook-based, endpoint `/chat`)

ClickUp task automation workflows:
- ClickUp Push Tasks - Manual Only (ID: S56Hbzfrh228aGs9)
  - Manual trigger, creates predefined tasks in ClickUp
- ClickUp - Update Task Status (ID: TzK1dE5GzI3HoSFH)
  - Manual trigger; set task name + new status in Set node
- ClickUp Move Tasks - Webhook (ID: tR3EjHMoejX8n4eT)
  - Webhook: `clickup-move-in-progress`
  - Used to move specific tasks remotely (TO DO / IN PROGRESS / COMPLETE)
  - A client-side runner exists: `ClickUp-Connect/run-move-tasks.html`

Client workflows (created for sharing):
- Outlook Daily Email Summary (ID: gZ94tdSunYpLwWFV)
  - Created for Ramu (Euron Bootcamp member)
  - Fetches unread Outlook emails daily at 8 AM
  - Uses OpenAI to create actionable summaries
  - Sends beautifully formatted briefing email
  - Includes color-coded sticky notes for easy client setup
  - GitHub: `Automation/n8n/Feb_2026/Outlook-Email-Summary/`

- Simple AI News Daily (ID: XEPhPQRexNuncWDY)
  - Daily 9 AM trigger
  - RSS feed → Top 3 AI news → Gmail to aiwithdhruv@gmail.com

Important workflow policy:
- Always export workflow JSON from n8n and use that file. Do not manually recreate workflow JSON.
- See `.context/workflows.md` for sync rules.

ClickUp IDs (verify in UI if mismatched):
- Workspace: 90161464007
- Space: 90166202270
- Folder: 90168365781
- List ID used in workflow: 901613344354
- Note: `.context/clickup-setup.md` lists Angelina Task list as 90161334354. Verify actual list ID in ClickUp URL before edits.

---

## 4) Angelina AI System (Current State — Feb 6, 2026)

App path: `Angelina AI System/angelina-app/web/`
Tech: Next.js 14 App Router, runs on localhost:3000

What's BUILT and WORKING:
- Multi-provider text chat (OpenAI, Anthropic, Perplexity, Google, OpenRouter)
- Real-time voice with GPT-4o Realtime API (WebSocket, interruption handling)
- Browsing tools: Tavily web search, Wikipedia, Hacker News
- Persistent memory system: memory-data.json (survives restarts)
  - AI auto-saves client details, research, decisions via save_memory tool
  - Memory context injected into every chat call automatically
  - recall_memory tool for searching past memories
- Real-time dashboard: cost tracking for text + voice (usage-data.json)
- Markdown rendering: tables, headings, code blocks, formatted responses
- Model selector: text + voice model dropdowns
- Default text model: Gemini 3 Flash Preview (OpenRouter) — cheapest good model
- Gmail/Calendar integration via Google OAuth
- Error handling: actual API errors shown to user

API Keys in .env.local:
- OPENAI_API_KEY (for voice + GPT models)
- OPENROUTER_API_KEY (for Gemini, Kimi, etc.)
- TAVILY_API_KEY (for web search)

STOP building new Angelina features. Focus on selling.

Docs:
- `Angelina AI System/PRD-TECH-STACK.md`
- `Angelina AI System/ANGELINA-SYSTEM-PROMPT.md`

---

## 5) Smart AI Chat — AI Knowledge Assistant (NEW — Feb 8, 2026)

Project path: `Smart AI Chat/`
Status: PRD v1.0 + System Design v1.0 COMPLETE. Ready to build Phase 1 backend. Waiting for UI design files for frontend.

What it is:
- AI-powered Knowledge Assistant for our project management software
- RAG system that answers client + internal team questions from company knowledge base
- Embeddable everywhere: website, in-app, mobile, Slack, Teams

Target users:
- Clients (product questions, troubleshooting, feature guidance)
- Internal team (onboarding, SOPs, product knowledge)
- Admins (upload docs, manage knowledge, view analytics)

Tech stack decided:
- Next.js 14 + Python FastAPI + Pinecone + Claude Sonnet 4.5 + Gemini Flash fallback
- Vercel AI SDK + LangChain.js + Supabase + Clerk + Cloudflare R2 + BullMQ
- See `Smart AI Chat/TECH-STACK.md` for full details

Key docs in folder:
- `Smart AI Chat/PRODUCT-STORY.md` — Product story for PRD generation
- `Smart AI Chat/COMPETITOR-ANALYSIS.md` — Full market research (Intercom, Zendesk, CustomGPT, etc.)
- `Smart AI Chat/TECH-STACK.md` — Decided tech stack + cost estimates
- `Smart AI Chat/BUILD-vs-BUY.md` — Why we're building custom
- `Smart AI Chat/AI_Knowledge_Assistant_PRD_v1.0.docx` — Full PRD (market research, requirements, roadmap, costs)
- `Smart AI Chat/AI_Knowledge_Assistant_System_Design_v1.0.docx` — System design (architecture, API specs, DB schema, RAG pipeline, security, CI/CD)

Build phases:
- Phase 1: Backend + RAG pipeline + basic chat
- Phase 2: Admin panel + document management + analytics
- Phase 3: Embeddable widget + mobile SDK + Slack/Teams
- Phase 4: Smart troubleshooting flows + escalation + multi-language
- Phase 5: Optimization, caching, fine-tuning, white-label

Estimated monthly cost: $150-500/mo (vs $10K+/mo on SaaS at scale)

---

## 5b) Social Media Agent (Angelina-powered)

Goal:
- Automate content creation + posting for LinkedIn, Twitter/X, Instagram, YouTube
- Use AI-generated text, images, avatar videos

Docs:
- `Angelina AI System/Social Media Agent/OVERVIEW.md`
- `Angelina AI System/Social Media Agent/TOOLS.md`
- `Angelina AI System/Social Media Agent/PROMPTS.md`
- `Angelina AI System/Social Media Agent/SCHEDULE.md`

Status:
- Planning and research complete
- Workflows for posting automation still to be built

---

## 6) Clients and pricing context

### Active Leads (from Waalaxy — Feb 2026)

Setu Nutrition / Pine Labs (HIGH PRIORITY):
- Contact: Nihaal Mariwala (nihaal@setu.in)
- Company: https://setu.co — Nutrition science / fintech (Pine Labs)
- Need: Research-based automation & copywriting for product launches
- What we built: Complete n8n Research & Copywriting Pipeline
  - Input form → Parallel research (clinical + competitor) → AI processing → Copy generation → Google Sheet + Email delivery
  - Saves 4-6 hours per product → under 2 minutes
  - 50+ SKUs = 15-20 hrs/week saved
  - Phase 2: WhatsApp alerts, social auto-post, multilingual, SEO blogs
- Status: Meeting Feb 6 — Nihaal didn't join. Dhruv sent:
  - Sample Biotin product copy to nihaal@setu.in
  - LinkedIn message with demo screenshots + workflow architecture
  - Phone number shared for callback
- Next: Wait for Nihaal's response. Follow up in 2-3 days if no reply.
- Potential: ₹1L-5L+ depending on scope

Health & Wellness Startup Client:
- Contact: Female founder, Indian startup
- Need: TBD (meeting booked)
- Meeting date: February 12, 2026
- Status: Confirmed meeting
- Potential: ₹20K-1L (startup pricing)

3rd Waalaxy Lead:
- Status: DROPPED. Meeting done Feb 5. Cannot afford ₹20K. Just starting, zero clients. No potential now.

### Previous Clients

Ramesh (Job Hunt Automation):
- Scope: job scraping, filtering, Google Sheets, email alerts
- Payment: Said will pay ₹5K (reduced from ₹10K). NOT PAID YET. Uncertain.
- PRD: `Clients/Quotation/ROM-PRD-2026-02-03.html`

Omkar (Sales Automation with Zoho CRM):
- STATUS: DROPPED. He's an employee, not a decision-maker. Cannot pay or authorize. Zero potential.

Generic PRD template (for new clients):
- `Clients/Quotation/JOB-AUTOMATION-PRD-TEMPLATE.html`
- Pricing baseline: Essential 20k, Pro 35k, Custom on request

---

## 7) Outreach and Waalaxy

Status: WORKING! 3 leads in 2 days (as of Feb 6, 2026).

Templates:
- `Waalaxy-Templates.md` contains LinkedIn message sequences
- Cold email sequence (3 emails) added, with YouTube demo link

Video used in outreach emails:
- Live Voice Call Automation: https://youtu.be/3hzoRwTRuTU?si=rmd0WCTUGE7dkWtx

Signature in email templates:
- Includes Agentic AI Hub website and Full Stack Automation Class link
- Class link placeholder still needs the exact URL

---

## 8) Current priorities (high level)

- Smart AI Chat: PRD + System Design DONE. Build Phase 1 backend now. UI files pending.
- CLOSE Setu deal — prepare research automation demo/proposal
- Prepare for Health & Wellness meeting (Feb 12)
- Keep Waalaxy running — it's generating real leads
- Package Outlook Email Summary workflow as a ₹15K-25K product
- Post daily on LinkedIn showing builds (Angelina, workflows)
- Follow up Ramesh for ₹5K payment
- Continue high-CTC job applications in parallel

---

## 9) AI Assistant Tools & Access

n8n API Access:
- Host: https://n8n.aiwithdhruv.cloud
- API access configured via MCP: `~/.claude/mcp_servers.json`
- Can list, create, update workflows directly
- Total workflows: 199 (46 active, 153 inactive)

GitHub Access:
- Repo: https://github.com/aiagentwithdhruv/Automation
- Authenticated via PAT
- Workflows pushed to: `n8n/Feb_2026/`
- Always include README.md with setup instructions

MCP Servers configured:
- n8n-mcp: Full n8n API access (list/create/update workflows)

Workflow Creation Style:
- Use color-coded sticky notes for client-friendly documentation
- Colors: Blue (intro), Yellow (trigger), Orange (data), Pink (AI), Green (output)
- Always include README.md with step-by-step setup
- Node names should be simple and descriptive

---

## 10) Budget & Tool Subscriptions (Feb 2026)

Total invested so far: ~₹20,000-25,000 ($240+)
Revenue so far: ₹0

Active subscriptions:
- Claude Pro ($20/mo) — considering upgrade to Max $100/mo for brainstorming/proposals
- Waalaxy — paid, WORKING (generating leads)
- Gamma — ₹600 sub for PPT/PDF creation
- n8n — self-hosted (free, on Hostinger VPS)

Exhausted/Done:
- Cursor: Paid ~₹6,500 ($80). LIMIT EXCEEDED. Cannot use.
- Gamma API: Needs ₹1,200 extra. NOT PAID. Use free tier.

Decision (Feb 6): Upgrade Claude to $100 Max. Use ONLY for money-making activities:
- Client proposals, pitches, brainstorming
- LinkedIn content
- Meeting prep
- NOT for building more Angelina features

Cost optimization for Angelina:
- Use Gemini 3 Flash (cheapest) as default text model
- Avoid GPT-4o Realtime voice unless demoing (expensive: $100/1M audio tokens)
- Use GPT-4o Mini Realtime if voice needed ($10/1M — 10x cheaper)

---

## 11) Strategy & Key Decisions (Feb 6, 2026)

Core strategy: Build → Record → Post → Get Leads → Close → Reinvest
- Build automations for REAL company problems (not generic demos)
- Screen record the build (5-10 min raw video)
- Post on YouTube + LinkedIn
- Waalaxy + content brings leads
- Close deals, use revenue to fund tools

Key decisions made:
- STOP building Angelina features for 2 weeks. She's good enough.
- Focus 100% on closing Setu + Feb 12 meeting
- LinkedIn auto-post running (2 PM daily) but needs better content (show real builds)
- AI video with avatar auto-upload: NOT NOW (manual screen recordings for now)
- Package Outlook Email Summary as ₹15K-25K product for LinkedIn
- Setu research workflow is REUSABLE for any D2C/nutrition/FMCG brand

Dhruv's vision (long-term):
- Full AI operating system (Jarvis-like) — Angelina is the foundation
- Room full of tech, best setup
- Calm, high-leverage life
- ₹50+ Crore wealth goal
- This comes from REVENUE first, then reinvestment

---

## 12) Context Management System

How to maintain context across sessions:

1. `.context/AI-HANDOFF-CONTEXT.md` — MASTER FILE, read first in every session
2. `Angelina memory-data.json` — auto-saves client/research data, injected into Angelina chats
3. Claude MEMORY.md — auto-loaded by Claude Code (project-specific learnings)
4. GitHub backup — sync everything periodically

RULES FOR EVERY AI SESSION:

START of session:
- Read this file FIRST
- You already know Dhruv, his brand, clients, budget, and priorities
- Do NOT ask "what are you working on?" — check this file

DURING session:
- After any significant discussion, brainstorm, or decision — AUTO-UPDATE this file
- If Dhruv mentions a new client, lead, or opportunity → add to Section 6
- If a decision is made → add to Section 11
- If money is spent or earned → update Section 10
- If a priority changes → update Section 8
- If Angelina gets new features → update Section 4
- Do NOT wait until end of session — update as you go

END of session:
- Do a final review of this file
- Make sure everything discussed is captured
- Update the "Last updated" date at the top

WHEN DHRUV SAYS "you know" or references past context:
- Search this file + Angelina memory-data.json for relevant info
- Never say "I don't have context" — the context IS here
- Build on what's already known, don't start from scratch

---

## 13) AI Sales Coach / QuotaHit (NEW — Feb 9-10, 2026 | Updated Feb 12-13, 2026)

Product: **QuotaHit** — All-in-one AI Sales Intelligence Platform
Domain: **https://www.quotahit.com** (quotahit.com bought on Namecheap, $11.48/yr)
Live URL: https://www.quotahit.com (also: https://ai-sales-coach-one.vercel.app)
GitHub: https://github.com/aiagentwithdhruv/ai-sales-coach.git (branch: main)
Hosting: Vercel (Hobby plan, team: aiwithdhruv-7109, auto-deploys from main)
DB/Auth: Supabase (project: Sales_Coach, ap-south-1)
Default AI: Kimi K2.5 via OpenRouter (cheapest)
Status (Feb 13, 2026): FEATURE COMPLETE. 39 pages, 58 API endpoints. Product ready.
Distribution Status: $0 revenue, 0 customers. Distribution is the next focus, NOT building.

Recent updates (Feb 13):
- Product docs updated: PRD v2.0, PRODUCT_ROADMAP.md, HOW-WE-BUILT-IT.md (commit 2974c91)
- Plan activation system added: /api/admin/activate-plan endpoint (commit ae4883a)
- Header now shows plan validity in profile dropdown (automationgreen, "Plan valid till [date]")
- Strategy context file created: memory/STRATEGY-CONTEXT.md (money-first rule, distribution priorities)

What's BUILT and DEPLOYED (39 pages, 58 API routes):
- AI Sales Coaching (objection handling, real-time chat)
- Voice Practice (GPT-4o Realtime API — nobody else has this)
- Call Analysis (upload, transcribe, score, AI feedback)
- Analytics Dashboard, Deal Pipeline, Custom Personas
- Playbook/RAG, Meeting Notes, Research Mode
- PPT Generator (Gamma API), Follow-up Autopilot
- Company Brain, Compliance, Quotation Builder
- Marketplace, Leaderboard, Transcripts
- Stripe billing integration (placeholder keys)
- Landing page + Pricing page
- Auth middleware (Supabase) protecting /dashboard + /settings

3 Core Features (production focus):
1. Objection Coach — /dashboard/coach
2. Practice Pitch — /dashboard/practice
3. Analyze Call — /dashboard/calls

AI Calling System:
- Full spec at: `AI Powered Sales Coach/ai-sales-coach/docs/AI-CALLING-SYSTEM-SPEC.md`
- Competitors analyzed: PreCallAI, SquadStack, Vapi, Retell, Bland
- Architecture: Twilio + Deepgram + LLM + ElevenLabs
- Cost estimate: $0.068/min (10x cheaper than competitors)
- Status: SPEC COMPLETE, ready to build

Competitive Edge:
- Only platform with real-time voice practice at $0-19/mo (vs Gong $250/mo)
- 3-in-1: Practice + Coach + Analyze (competitors do 1-2)
- Multi-provider AI (not locked to one vendor)
- AI Calling System will make it 5-in-1 (nobody offers all 5)

Env files:
- Local: `AI Powered Sales Coach/ai-sales-coach/.env.local`
- Vercel upload: `/Users/apple/Downloads/ai-sales-coach-vercel.env`
- Example: `AI Powered Sales Coach/ai-sales-coach/.env.example`

---

## 14) Automation Anywhere TPM Opportunity (Feb 14, 2026)

- Role: Technical Program Manager deployed AT Automation Anywhere
- Employer: Euron (Sudhanshu's company) - Dhruv already teaches there
- Structure: Euron/iDS is staffing partner → AA is the client → Dhruv is deployed as TPM
- Sudhanshu personally selected Dhruv for this. Euron side is locked.
- Vamsi (iDS) handled screening call
- Screening call: DONE (Feb 14, 5-6 min, went well)
- Next round: MONDAY FEB 17, 10:30 AM - deeper interview scheduled by them
- CTC: 27-28 LPA base from AA side + Euron incentives (Sudhanshu confirmed)
- Market ref: AA median is 38L per Levels.fyi
- Career plan: AA TPM (6mo) → Lead AI Engineer 50L+ (6mo) → Head of AI 75L-1Cr (12mo)
- Side: Teaching at Euron, YouTube, LinkedIn brand, international client hunting
- Key prep: LangChain/LangGraph, AA's Process Reasoning Engine, 0→6Cr ARR story, multi-agent orchestration
- AA products to know: PRE, AI Agent Studio, Mozart Orchestrator, OpenAI partnership
- Full interview prep done in Claude Code session (Feb 14)

---

## 15) If anything is missing

Areas that might need more detail depending on the next AI:
- Exact class link for "Full Stack Automation Class"
- Final ClickUp list IDs (verify in UI)
- Setu deal outcome (follow up Feb 8-9)
