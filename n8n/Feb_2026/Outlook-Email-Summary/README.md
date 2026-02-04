# Outlook Daily Email Summary

Automatically summarize all your unread Outlook emails every morning and receive ONE concise briefing email.

## What it does

1. **Triggers daily at 8 AM** - Runs automatically every morning
2. **Fetches unread emails** - Gets up to 50 unread emails from Outlook
3. **AI-powered summary** - Uses OpenAI to create actionable summaries
4. **Sends briefing email** - Delivers a beautifully formatted summary to your inbox

## Setup Instructions

### Step 1: Import the Workflow
1. Open your n8n instance
2. Go to **Workflows** → **Import from File**
3. Select `workflow.json`

### Step 2: Connect Microsoft Outlook
1. Click on **"Get Unread Emails"** node
2. Click **"Create New Credential"**
3. Follow the Microsoft OAuth flow to connect your Outlook account

### Step 3: Connect OpenAI
1. Click on **"AI Summarize"** node
2. Add your OpenAI API key
3. Model used: `gpt-4o-mini` (cost-effective)

### Step 4: Set Your Email
1. Click on **"Send Summary Email"** node
2. Change `your_email@outlook.com` to your actual email address

### Step 5: Activate
1. Toggle the workflow from **Inactive** to **Active**
2. You're done!

## Customization

- **Change time**: Edit "Daily 8 AM" node to adjust schedule
- **More emails**: Increase limit in "Get Unread Emails" node (default: 50)
- **Different AI model**: Change model in "AI Summarize" node

## Sample Output

You'll receive an email like:

> **Morning Briefing: 12 Unread Emails**
>
> **Email 1 - John Smith**
> Subject: Q4 Report Review
> Summary: Requesting review of Q4 financials by Friday
> Action: Reply by Thursday
>
> **Email 2 - Marketing Team**
> Subject: Campaign Launch
> Summary: New campaign launching Monday, need approval
> Action: Urgent - Review today

---

**Created by:** [AIwithDhruv](https://github.com/aiagentwithdhruv)
