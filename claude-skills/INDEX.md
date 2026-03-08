# Claude Skills Library - Master Index

**Last updated:** 2026-03-06
**Location:** `.context/claude-skills/`
**Purpose:** Reusable automation skills and agent patterns for Claude Code
**Public repo:** https://github.com/aiagentwithdhruv/skills (38 published to skills.sh)
**Install:** `npx skills add aiagentwithdhruv/skills`
**Skills 2.0:** Upgraded to Claude Code 2.1 spec — frontmatter, forked contexts, agent hooks, slash invocation

---

## Skills 2.0 Upgrade (March 6, 2026)

All 40 skills + 4 agents upgraded to Claude Code 2.1 Skills 2.0 spec:

| Feature | Count | What It Does |
|---------|-------|--------------|
| `disable-model-invocation: true` | 13 skills | Side-effect skills (deploy, email, proposals) — manual `/invoke` only |
| `context: fork` + `agent:` | 7 skills | Research/isolated skills run in forked subagent context |
| `argument-hint` | 31 skills | Shows expected args in `/` autocomplete menu |
| Agent `hooks: Stop:` | 4 agents | Enforce output format (PASS/FAIL, JSON schema, etc.) |
| Proper frontmatter | 40/40 | All skills have valid YAML frontmatter |

**Manual-only skills (side effects):** instantly-campaigns, instantly-autoreply, welcome-email, send-telegram, create-proposal, onboarding-kickoff, modal-deploy, aws-production-deploy, upwork-apply, design-website, skool-monitor, gamma-presentation, skill-builder

**Forked context skills (isolated):** literature-research, cross-niche-outliers, youtube-outliers, skool-rag, classify-leads, generate-report, title-variants

---

## Quick Reference

| Category | Count | When to Use |
|----------|-------|-------------|
| **Agents** | 4 | Code review, research, testing, email classification |
| **Lead Generation** | 8 | Scraping leads, enrichment, proposals, client onboarding |
| **Email & Campaigns** | 5 | Gmail automation, cold email, auto-reply, welcome sequences |
| **Content & Video** | 9 | Video editing, thumbnails, YouTube research, image-to-video, AI image gen |
| **Community & Research** | 3 | Skool monitoring, academic research, RAG |
| **Infrastructure** | 6 | Webhooks, deployment, AWS, local server, voice-to-text |
| **Browser Automation** | 1 | LinkedIn auto-post, web scraping, human-like automation, demos |
| **Notifications** | 1 | Send messages to Telegram |
| **Euron Bootcamp** | 1 | Euri API doubts, MCP setup, model selection |
| **Visual & Image Gen** | 5 | Thumbnail prompts, Excalidraw diagrams, PNG visuals, hyper-realistic images |
| **Presentations & Docs** | 1 | AI-generated presentations, documents, webpages, social posts via Gamma MCP |
| **Utilities** | 2 | macOS control, skill scaffolding |
| **TOTAL SKILLS** | **40** | |

---

## Agents (4)

Located in `.claude/agents/` — all upgraded with **Stop hooks** to enforce output format.

| Agent | File | Stop Hook Enforces | Use When |
|-------|------|-------------------|----------|
| **Code Reviewer** | `code-reviewer.md` | Must contain PASS / PASS WITH NOTES / NEEDS CHANGES | Unbiased code review with zero context |
| **Email Classifier** | `email-classifier.md` | Must output JSON with Action Required key | Classifies Gmail emails into 3 categories |
| **QA** | `qa.md` | Must contain Status: PASS / FAIL / PARTIAL | Generates tests, runs them, reports results |
| **Research** | `research.md` | Must contain ## Answer and Key Findings | Deep research via web, files, codebase |

**Pattern:** Agents are read-only reporters with enforced output contracts. All code changes happen in parent agent.

---

## ⚡ Skills (40)

Located in `.claude/skills/`

Each skill has:
- `SKILL.md` - Instructions and workflow
- `scripts/` - Executable Python/Node scripts

### Lead Generation & Sales (8 skills)

| Skill | Use When |
|-------|----------|
| **scrape-leads** | Scrape leads via Apify with verification |
| **gmaps-leads** | Google Maps lead scraping with deep enrichment |
| **classify-leads** | LLM-based lead classification and scoring |
| **casualize-names** | Convert formal names to casual versions for outreach |
| **create-proposal** | Generate PandaDoc proposals from templates |
| **upwork-apply** | Scrape Upwork jobs and generate custom proposals |
| **onboarding-kickoff** | Full post-kickoff client automation |
| **generate-report** | Generate client reports and deliverables |

**Relevant for:** Bartisans automation, Jovita outreach, Zaid demo prep, QuotaHit lead gen

---

### Email & Campaigns (5 skills)

| Skill | Use When |
|-------|----------|
| **gmail-inbox** | Manage emails across multiple Gmail accounts |
| **gmail-label** | Auto-label and organize Gmail inbox |
| **instantly-campaigns** | Create cold email campaigns in Instantly.ai |
| **instantly-autoreply** | Auto-reply to incoming emails with AI |
| **welcome-email** | Send welcome sequence to new clients |

**Relevant for:** Bartisans WhatsApp + email automation, Waalaxy follow-ups, QuotaHit onboarding emails

---

### Content & Video (9 skills — includes thumbnail-generator, nano-banana-images, image-to-video)

| Skill | Use When |
|-------|----------|
| **video-edit** | Remove silences, add 3D transitions to videos |
| **pan-3d-transition** | Create 3D swivel effects for video content |
| **recreate-thumbnails** | Face-swap YouTube thumbnails |
| **cross-niche-outliers** | Find viral videos from adjacent niches |
| **youtube-outliers** | Monitor your niche for viral content |
| **title-variants** | Generate YouTube title variations |
| **image-to-video** | Convert thumbnails/images to 8s AI video. 11 tools profiled (Runway, Kling, Pika, Luma, Sora, Vidu, Hailuo, Veo, Firefly, Seedance, WAN). Prompt templates for tech workspace scenes, camera movements, holographic UI animation. |

**Relevant for:** AiwithDhruv YouTube content, LinkedIn video posts, demo video editing, thumbnail animations

---

### Community & Research (3 skills)

| Skill | Use When |
|-------|----------|
| **skool-monitor** | Monitor and interact with Skool communities |
| **skool-rag** | Query Skool community content via RAG pipeline |
| **literature-research** | Search academic databases for research papers |

**Relevant for:** Research tasks, community engagement, knowledge base building

---

### Infrastructure (6 skills)

| Skill | Use When |
|-------|----------|
| **add-webhook** | Add new Modal webhooks for event-driven execution |
| **modal-deploy** | Deploy to Modal cloud infrastructure |
| **aws-production-deploy** | Full AWS production stack: Docker → ECR → ECS Fargate → ALB → ElastiCache → CloudWatch → Grafana. CI/CD via GitHub Actions. Use for ANY production deployment. |
| **local-server** | Run orchestrator locally for testing |
| **design-website** | Website design and development workflows |
| **whisper-voice** | Live speech-to-text Mac app — WhisperKit, offline, auto-type at cursor |

**Relevant for:** Deploying QuotaHit features, Angelina infrastructure, Onsite system deployment, voice productivity, Euron Full-Stack AI Chat, any production app

### Euron Bootcamp (1 skill)

| Skill | Use When |
|-------|----------|
| **euron-qa** | Answer Euron Gen AI Bootcamp doubts — Euri API setup, models, MCP servers, errors, all frameworks |

**Relevant for:** Euron Gen AI Certification Bootcamp 2.0, helping students, community support

### Browser Automation (1 skill)

| Skill | Use When |
|-------|----------|
| **ghost-browser** | LinkedIn auto-post with images, engagement (like/comment/reply), job applications, scrape any website, stats tracking, visual demos. Human-like behavior (typing with typos, smooth scrolling, random delays). GitHub: `aiagentwithdhruv/ghost-browser` |

**Relevant for:** LinkedIn automation, lead scraping, job hunting, client demos, social media management
**Key scripts:** `linkedin_engage.py` (CLI), `universal_scraper.py` (any site), `demo_wow.py` (viral demo), `monkeytype_flex.py` (412 WPM)

### Notifications (1 skill)

| Skill | Use When |
|-------|----------|
| **send-telegram** | Send any message/note/reminder to Dhruv's Telegram via n8n |

**Relevant for:** Quick notifications, sending summaries, reminders, interview prep notes to phone

---

### Visual & Image Generation (5 skills)

| Skill | Use When |
|-------|----------|
| **handdrawn-diagram** | Generate hand-drawn whiteboard infographic prompts for Gemini. Notebook-style diagrams with flash cards, logos, architecture, branding. Perfect for GitHub READMEs, LinkedIn, Instagram. **Use this for any diagram/infographic/visual explainer request.** |
| **thumbnail-generator** | Generate cinematic AI image prompts for YouTube thumbnails, LinkedIn posts, social media visuals. Dhruv's signature style — dark bg, purple neon, black t-shirt, floating holographic elements. 5 proven visual hooks. **Use this FIRST for any image/thumbnail request.** |
| **excalidraw-diagram** | Generate editable Excalidraw JSON diagrams — architecture, flows, system design. Output is `.excalidraw` file you can open and edit. |
| **excalidraw-visuals** | Generate hand-drawn Excalidraw-style PNG images via fal.ai (free tier). Needs `FAL_KEY`. |
| **nano-banana-images** | Generate hyper-realistic images via fal.ai Nano Banana Pro. JSON-prompted, no AI smoothing. Needs `FAL_KEY`. |

**Relevant for:** Presentations, class materials, README visuals, thumbnails, social media images, architecture diagrams
**Image providers:** fal.ai (primary, free), Euri API (secondary, free for Euron students)
**Source:** AI Automation Society (Skool community)

---

### Presentations & Docs (1 skill — via MCP)

| Skill | Use When |
|-------|----------|
| **gamma-presentation** | Create AI-generated presentations (slides), documents, webpages, and social posts via Gamma MCP. Supports themes, custom layouts, export to PPTX/PDF, and folder organization. **Already live — no setup needed, use directly via MCP tools.** |

**How to use:** Just say "Create a Gamma presentation about X" — MCP tools available: `generate`, `get_themes`, `get_folders`, `get_generation_status`
**Relevant for:** Euron class decks, client proposals, product pitches, YouTube slides, course materials

---

### Utilities (2 skills)

| Skill | Use When |
|-------|----------|
| **mac-control** | Control macOS apps, display, audio, files, screenshots, clipboard via MCP |
| **skill-builder** | Create new Claude Code skills, optimize existing ones, audit skill quality. Follows official best practices. Has full technical reference. |

**Relevant for:** macOS automation, building new skills, extending the library

---

## 📁 Additional Resources

### Execution Scripts
**Location:** `execution/`

- Shared utilities used across multiple skills
- Video effects processing (`video_effects/`)
- Google Sheets helpers
- OAuth authentication flows
- Webhook handlers

### Prompts & Templates
**Location:** `prompts/`, `.prompts/`

- Reusable prompt templates
- Instantly campaign creator prompts
- Email sequences

### YouTube-Specific
**Location:** `for_youtube/`

- YouTube-specific directives
- Video effects execution scripts

### Trigger System
**Location:** `trigger/`

- Event triggers
- Task automation tools

---

## 🏗️ Architecture Pattern

**3-Layer System:**

1. **Skills Layer** - Bundled capabilities (SKILL.md + scripts/)
2. **Orchestration Layer** - Claude makes decisions, routes tasks
3. **Shared Utilities** - Common infrastructure code

**Self-Annealing Loop:**
1. Fix script when errors occur
2. Test the fix
3. Update SKILL.md with learnings
4. System gets stronger

---

## 🚀 How to Use These Skills

### In Claude Code Sessions:

1. **Reference by name:** "Use the scrape-leads skill to get leads for X"
2. **Auto-discovery:** Claude reads SKILL.md and executes scripts automatically
3. **Adapt patterns:** Use these as templates for new client work

### For Client Projects:

**Bartisans Automation:**
- Use: `gmail-inbox`, `instantly-campaigns`, `welcome-email`, `create-proposal`

**QuotaHit Lead Gen:**
- Use: `scrape-leads`, `gmaps-leads`, `classify-leads`, `instantly-campaigns`

**Onsite Sales Intelligence:**
- Use: `classify-leads`, `generate-report`, `gmail-inbox`

**n8n Workflows:**
- Adapt patterns from `modal-deploy`, `add-webhook`, `local-server`

---

## 📝 Configuration Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Main agent instructions (read this first) |
| `AGENTS.md` | Agent-specific instructions |
| `GEMINI.md` | Gemini-specific instructions |
| `package.json` | Node.js dependencies |
| `requirements.txt` | Python dependencies |
| `tsconfig.json` | TypeScript config |
| `trigger.config.ts` | Trigger system config |
| `gmail_accounts.json.example` | Gmail OAuth setup example |

---

## ⚠️ Important Notes

1. **No API Keys in Files** - All sensitive data goes in `.env` (not committed)
2. **Deliverables in Cloud** - Google Sheets, Slides, cloud storage (not local files)
3. **Self-Contained Skills** - Each skill has everything it needs in its folder
4. **Update After Use** - When you learn something new, update the SKILL.md

---

## 🏗️ Engineering Rules (Companion System)

Skills define **what** to automate. Engineering rules define **how** to write code.

**Repo:** `aiagentwithdhruv/ai-coding-rules` (PUBLIC)
**Local:** `cursor-rules/` — 15 rules + 9 doc templates
**Install:** `curl -fsSL https://raw.githubusercontent.com/aiagentwithdhruv/ai-coding-rules/main/install.sh | bash`

| Resource | What it provides |
|----------|-----------------|
| `rules/*.mdc` | 15 Cursor rules (YAML frontmatter, auto-apply) |
| `claude/CLAUDE.md` | All 15 rules combined for Claude Code |
| `claude/compose.sh` | Build custom CLAUDE.md from selected rules |
| `docs/` | 9 templates: PRD, Architecture, API Spec, DB Schema, Deployment, Skills, Agents, Loadout, MCP |

**Key distinction:** `skills` repo = reusable automation capabilities. `ai-coding-rules` repo = engineering standards for any project.

---

## 🔗 Integration with Your Stack

### n8n Workflows
- Skills can be called via n8n HTTP Request nodes
- Use Modal webhooks for event-driven execution
- Google Sheets as deliverables (same pattern as Social Media v3)

### QuotaHit
- Lead gen skills → feed into sales pipeline
- Email automation → onboarding sequences
- Proposal generation → quotation builder

### Angelina AI System
- Research agent → knowledge base
- Gmail inbox → email integration
- Code reviewer → quality assurance

### Bartisans Automation
- Gmail automation → customer inbox
- Instantly campaigns → WhatsApp follow-ups
- Welcome email → new customer onboarding

---

## 🔗 Composition Chains

Pre-defined skill pipelines for common workflows:

| Chain | Skills | Use Case |
|-------|--------|----------|
| **full-client-onboarding** | gmaps-leads → classify-leads → casualize-names → instantly-campaigns → welcome-email | End-to-end client acquisition to onboarding |
| **content-pipeline** | cross-niche-outliers → title-variants → recreate-thumbnails → video-edit | YouTube content research to publication |
| **lead-enrichment** | scrape-leads → classify-leads → casualize-names | Raw leads to email-ready contacts |
| **inbox-management** | gmail-inbox → gmail-label | Full inbox triage and organization |

---

## 📦 GitHub Backup

**Skills repo:** https://github.com/aiagentwithdhruv/Automation (private — `claude-skills/` folder)
**Public skills:** https://github.com/aiagentwithdhruv/skills (38 published to skills.sh)
**Engineering rules:** https://github.com/aiagentwithdhruv/ai-coding-rules (public — 15 rules + 9 docs)
**Branch:** main

All skills backed up with:
- Full scripts and dependencies
- Documentation and examples
- No secrets or API keys

---

## 🎓 Learning Resources

**Main Instructions:** Read `.context/claude-skills/CLAUDE.md` first
**Agent Patterns:** See `.claude/agents/` for subagent examples
**Skill Structure:** Look at any `SKILL.md` to understand the pattern

**Key Principle:**
> Separate probabilistic AI (decision-making) from deterministic code (execution) to maximize reliability.

---

**Last scanned:** 2026-03-06
**Total:** 40 skills + 4 agents (38 published to skills.sh)
**Skills 2.0:** Upgraded — frontmatter, forked contexts, agent hooks, slash commands
**Status:** Ready to use
