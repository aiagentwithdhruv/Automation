# Antigravity Skills - Universal AI Agent Context

> Works with **Google Antigravity**, **Claude Code**, **Gemini CLI**, and any AI agent that supports the SKILL.md format.

## What is this?

A portable `.agent/` directory that gives any AI coding agent full context about your projects, tools, credentials, and workflows. Drop it into your workspace and your agent becomes 10x smarter.

**Works across:**
- Google Antigravity (`.agent/skills/`)
- Claude Code (`.claude/skills/`)
- Gemini CLI (`~/.gemini/skills/`)
- Any AI agent with SKILL.md support

## Directory Structure

```
.agent/
├── rules/
│   └── master-context.md          # Auto-loaded every request (your brain)
├── skills/
│   ├── n8n-automation/SKILL.md    # n8n workflow patterns & credentials
│   ├── lead-gen-sales/SKILL.md    # Lead scraping, classification, proposals
│   ├── email-outreach/SKILL.md    # Gmail, cold email, welcome sequences
│   ├── content-social/SKILL.md    # Social media, video editing, YouTube
│   ├── deploy-infra/SKILL.md      # Cloud deployment, webhooks, hosting
│   ├── product-saas/SKILL.md      # SaaS product strategy & selling
│   └── ai-chat-app/SKILL.md       # Multi-provider AI chat architecture
└── workflows/
    ├── check-context.md            # /check-context → review project state
    └── distribution-check.md       # /distribution → money-first accountability
```

## How It Works

### Rules (Always Loaded)
Files in `.agent/rules/` are **auto-loaded for every request**. Put your identity, active projects, key credentials, and operating principles here.

### Skills (On-Demand)
Files in `.agent/skills/` are loaded **only when relevant** based on the YAML `description` field. This keeps the agent's context clean and focused.

### Workflows (Slash Commands)
Files in `.agent/workflows/` are triggered with `/command-name`. Use for repeatable processes like context review or accountability checks.

## Setup

### For Google Antigravity
```bash
# Copy to your workspace root
cp -r .agent/ /path/to/your/project/.agent/
```

### For Claude Code
```bash
# The SKILL.md format is compatible - copy skills to .claude/skills/
cp -r .agent/skills/* /path/to/your/project/.claude/skills/
```

### For Global Access (all projects)
```bash
# Antigravity global
cp -r .agent/skills/* ~/.gemini/antigravity/skills/

# Claude Code global
cp -r .agent/skills/* ~/.claude/skills/
```

## Customizing for Your Setup

1. **Edit `rules/master-context.md`** — Replace with your identity, projects, and credentials
2. **Edit skill descriptions** — Tune the YAML `description` field for your use cases
3. **Add scripts** — Put Python/Bash scripts in `skills/<name>/scripts/` for deterministic execution
4. **Reference shared context** — Point skills to your own context files (`.context/`, `memory/`, etc.)

## SKILL.md Format

```yaml
---
name: skill-name
description: When to activate this skill. Be specific for accurate routing.
---

# Skill Title

## Goal
What this skill does.

## Instructions
Step-by-step process.

## Examples
Input/output examples for the agent.
```

## Architecture

```
┌─────────────────────────────────────┐
│         AI Agent (Claude/Antigravity)│
├─────────────────────────────────────┤
│  Rules Layer (always loaded)         │
│  - Identity, projects, credentials   │
├─────────────────────────────────────┤
│  Skills Layer (on-demand)            │
│  - Activated by description match    │
│  - SKILL.md + optional scripts/      │
├─────────────────────────────────────┤
│  Shared Context (referenced)         │
│  - .context/ files                   │
│  - memory/ files                     │
│  - Single source of truth            │
└─────────────────────────────────────┘
```

## Related

- [Claude Skills Library](../claude-skills/) — 26 granular skills + 4 agents for Claude Code
- [Antigravity Skills Codelab](https://codelabs.developers.google.com/getting-started-with-antigravity-skills)

## Author

**Dhruv Tomar** — [LinkedIn](https://www.linkedin.com/in/aiwithdhruv/) | [GitHub](https://github.com/aiagentwithdhruv)
