# Claude Skills Library - Master Index

**Last updated:** 2026-02-23
**Location:** `.context/claude-skills/`
**Purpose:** Reusable automation skills and agent patterns for Claude Code
**Schemas:** All 28 skills + 4 agents have typed schemas (inputs/outputs/credentials/composability)

---

## 🎯 Quick Reference

| Category | Count | When to Use |
|----------|-------|-------------|
| **Agents** | 4 | Code review, research, testing, email classification |
| **Lead Generation** | 8 | Scraping leads, enrichment, proposals, client onboarding |
| **Email & Campaigns** | 4 | Gmail automation, cold email, auto-reply |
| **Content & Video** | 6 | Video editing, thumbnails, YouTube research |
| **Community & Research** | 3 | Skool monitoring, academic research, RAG |
| **Infrastructure** | 4 | Webhooks, deployment, local server |
| **Notifications** | 1 | Send messages to Telegram |
| **Euron Bootcamp** | 1 | Euri API doubts, MCP setup, model selection |
| **TOTAL SKILLS** | **28** | |

---

## 🤖 Agents (4)

Located in `.claude/agents/`

| Agent | File | Use When |
|-------|------|----------|
| **Code Reviewer** | `code-reviewer.md` | Unbiased code review with zero context. Returns issues by severity with PASS/FAIL verdict. |
| **Email Classifier** | `email-classifier.md` | Classifies Gmail emails into Action Required, Waiting On, Reference. |
| **QA** | `qa.md` | Generates tests for code, runs them, reports pass/fail results. |
| **Research** | `research.md` | Deep research via web search, file reads, codebase exploration. Returns concise sourced findings. |

**Pattern:** Agents are read-only reporters. All code changes happen in parent agent.

---

## ⚡ Skills (26)

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

### Email & Campaigns (4 skills)

| Skill | Use When |
|-------|----------|
| **gmail-inbox** | Manage emails across multiple Gmail accounts |
| **gmail-label** | Auto-label and organize Gmail inbox |
| **instantly-campaigns** | Create cold email campaigns in Instantly.ai |
| **instantly-autoreply** | Auto-reply to incoming emails with AI |
| **welcome-email** | Send welcome sequence to new clients |

**Relevant for:** Bartisans WhatsApp + email automation, Waalaxy follow-ups, QuotaHit onboarding emails

---

### Content & Video (6 skills)

| Skill | Use When |
|-------|----------|
| **video-edit** | Remove silences, add 3D transitions to videos |
| **pan-3d-transition** | Create 3D swivel effects for video content |
| **recreate-thumbnails** | Face-swap YouTube thumbnails |
| **cross-niche-outliers** | Find viral videos from adjacent niches |
| **youtube-outliers** | Monitor your niche for viral content |
| **title-variants** | Generate YouTube title variations |

**Relevant for:** AiwithDhruv YouTube content, LinkedIn video posts, demo video editing

---

### Community & Research (3 skills)

| Skill | Use When |
|-------|----------|
| **skool-monitor** | Monitor and interact with Skool communities |
| **skool-rag** | Query Skool community content via RAG pipeline |
| **literature-research** | Search academic databases for research papers |

**Relevant for:** Research tasks, community engagement, knowledge base building

---

### Infrastructure (4 skills)

| Skill | Use When |
|-------|----------|
| **add-webhook** | Add new Modal webhooks for event-driven execution |
| **modal-deploy** | Deploy to Modal cloud infrastructure |
| **local-server** | Run orchestrator locally for testing |
| **design-website** | Website design and development workflows |

**Relevant for:** Deploying QuotaHit features, Angelina infrastructure, Onsite system deployment

### Euron Bootcamp (1 skill)

| Skill | Use When |
|-------|----------|
| **euron-qa** | Answer Euron Gen AI Bootcamp doubts — Euri API setup, models, MCP servers, errors, all frameworks |

**Relevant for:** Euron Gen AI Certification Bootcamp 2.0, helping students, community support

### Notifications (1 skill)

| Skill | Use When |
|-------|----------|
| **send-telegram** | Send any message/note/reminder to Dhruv's Telegram via n8n |

**Relevant for:** Quick notifications, sending summaries, reminders, interview prep notes to phone

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

## 📦 GitHub Backup

**Repo:** https://github.com/aiagentwithdhruv/Automation
**Location:** Will be pushed to `claude-skills/` folder
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

**Last scanned:** 2026-02-15
**Total files:** 26 skills + 4 agents + infrastructure
**Status:** ✅ Ready to use
