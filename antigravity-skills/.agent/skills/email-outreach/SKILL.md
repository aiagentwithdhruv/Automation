---
name: email-outreach
description: Manage Gmail inboxes, create cold email campaigns, set up auto-replies, and send welcome email sequences. Use when asked to check email, send outreach, create campaigns, manage Gmail, label emails, or set up drip sequences.
---

# Email & Outreach Automation

## Goal
Manage multi-account Gmail, run cold email campaigns via Instantly, and automate email sequences.

## Gmail Management

### Check Unread Across All Accounts
```bash
python3 scripts/gmail_unified.py --query "is:unread" --limit 50
```

### Check Specific Account
```bash
python3 scripts/gmail_unified.py --query "is:unread" --account yourcompany
```

### Label and Archive
```bash
python3 scripts/gmail_unified.py \
  --query "from:notifications@" --label "Notifications" --archive
```

### Dry Run (Preview)
```bash
python3 scripts/gmail_unified.py \
  --query "subject:invoice" --label "Invoices" --dry-run
```

## Cold Email Campaigns

Key steps:
1. Prepare lead list (use `lead-gen-sales` skill first)
2. Casualize names for personalization
3. Create campaign in Instantly with templates
4. Set up auto-reply triggers

## Welcome Email Sequences

For onboarding new clients with automated welcome flows.

## Required Gmail Scopes
- `gmail.modify` — Read/write emails
- `gmail.labels` — Create/manage labels
- `gmail.settings.basic` — Manage settings

## Environment Variables
```
INSTANTLY_API_KEY
GOOGLE_APPLICATION_CREDENTIALS
```
