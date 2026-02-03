# Lead Generation & Email Outreach

> End-to-end n8n automation: Google Sheets → LinkedIn search → Apollo.io enrichment → Gmail outreach + follow-ups

**Author:** AiwithDhruv Team  
**Version:** 1.0  
**Last Updated:** February 2026

---

## Connect With Us

- **YouTube:** https://www.youtube.com/@aiwithdhruv
- **LinkedIn:** https://www.linkedin.com/in/aiwithdhruv/

*Turning AI into Outcomes*

---

## Overview

This n8n workflow automates the full lead generation and email outreach process as per the assignment specification:

1. **Read** rows from Google Sheet (Input List)
2. **Search** people on LinkedIn by keyword (e.g. Marketing Manager)
3. **Enrich** contact details via Apollo.io API (email, phone)
4. **Write** leads to Lead Contact Form sheet
5. **Mark** input rows as Completed
6. **Send** first outreach email via Gmail
7. **Detect** responses and mark Response = Yes
8. **Send** follow-up emails 2 & 3 if no response

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    LEAD GENERATION & EMAIL OUTREACH                               │
│                         n8n Workflow (All-in-One)                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════════════════════════════╗
║  WORKFLOW 1: Main Lead Generation (Steps 1–9)                                     ║
╚═══════════════════════════════════════════════════════════════════════════════════╝

    ┌──────────────────┐
    │  Manual Trigger  │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐     ┌─────────────────────┐
    │ 1. Read Input    │────►│ Filter Pending      │
    │    List (Sheets)  │     │ (Status ≠ Completed)│
    └──────────────────┘     └──────────┬──────────┘
                                        │
                                        ▼
    ┌──────────────────────────────────────────────────────────────────┐
    │ 2. Process One by One (Split In Batches)                         │
    │    ┌─────────────────────────────────────────────────────────┐   │
    │    │  For each row:                                           │   │
    │    │  3. Build LinkedIn Search URL (keyword + company)        │   │
    │    │  4. LinkedIn People Search (RapidAPI)                   │   │
    │    │  5. Parse First Profile                                 │   │
    │    │  6. Apollo.io Contact Enrichment                        │   │
    │    │  7. Extract Contact Details                             │   │
    │    │  8. Add to Lead Contact Sheet                           │   │
    │    │  9. Mark Input Row Completed                            │   │
    │    │  10. Send First Email (if email found)                  │   │
    │    │  11. Mark Email Sent                                     │   │
    │    │  ──► Loop back to next row                              │   │
    │    └─────────────────────────────────────────────────────────┘   │
    └──────────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════════════════════════════╗
║  WORKFLOW 2: Email Follow-up Handler (Step 10 – Response Detection)                ║
╚═══════════════════════════════════════════════════════════════════════════════════╝

    ┌──────────────────────┐
    │ Gmail: New Email     │
    │ Received (Trigger)   │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐     ┌─────────────────────┐
    │ Read Lead Contact    │────►│ Find Lead by Email   │
    │ Sheet                │     │ (match sender)       │
    └──────────────────────┘     └──────────┬──────────┘
                                            │
                                            ▼
                               ┌────────────────────────┐
                               │ Is Lead Response?      │
                               │ YES → Mark Response=Yes│
                               └────────────────────────┘

╔═══════════════════════════════════════════════════════════════════════════════════╗
║  WORKFLOW 3: Follow-up Email Sender (Steps 10–11 – Email 2 & 3)                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝

    ┌──────────────────────┐
    │ Daily Check (9 AM)    │
    │ Schedule Trigger     │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐     ┌─────────────────────────────┐
    │ Read Lead Sheet      │────►│ Filter: No Response &       │
    │                        │     Email Sent                   │
    └──────────────────────┘     └──────────┬──────────────────┘
                                            │
                                            ▼
                               ┌────────────────────────┐
                               │ Check Follow-up Status  │
                               │ Route by Action        │
                               └──────────┬─────────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
           ┌────────────────┐   ┌────────────────┐   ┌────────────────┐
           │ Send Email 2   │   │ Send Email 3   │   │ Skip           │
           │ Mark Email 2   │   │ Mark Email 3   │   │ (all sent)     │
           │ Sent           │   │ Sent           │   │                │
           └────────────────┘   └────────────────┘   └────────────────┘
```

---

## Google Sheets Structure

### Input List
| Keyword | Company | Location | Status |
|---------|---------|----------|--------|
| Marketing Manager | Acme Inc | New York | |
| Sales Director | | | |

### Lead Contact Form
| Name | Company | Designation | Email Id | Phone Number | LinkedIn | Email Sent | Response |
|------|---------|-------------|----------|--------------|----------|------------|----------|

---

## Setup Instructions

### 1. Import Workflow
- Copy `workflow.json`
- In n8n: **Workflows** → **Import from File** (or drag JSON)

### 2. Replace Placeholders
In the workflow nodes, replace:
- `YOUR_INPUT_SHEET_ID` – From Input List sheet URL
- `YOUR_LEAD_SHEET_ID` – From Lead Contact Form sheet URL

**Get Sheet ID:** `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

### 3. Configure Credentials
| Credential | Used For |
|------------|----------|
| Google Sheets OAuth2 | Read/write both sheets |
| Gmail OAuth2 | Send emails, Gmail trigger |
| RapidAPI Header Auth | Header: `X-RapidAPI-Key` (LinkedIn People Search API) |
| Apollo.io Header Auth | Header: `Authorization`, Value: `Bearer YOUR_APOLLO_KEY` |

### 4. Activate Workflows
- **Main workflow:** Run manually or add Schedule Trigger
- **Gmail Trigger:** Activate to detect responses
- **Follow-up Sender:** Activate for daily 9 AM follow-ups

---

## Email Sent Values (Follow-up Logic)

| Value | Meaning |
|-------|---------|
| (empty) | No email sent yet |
| Completed | First email sent |
| Email 2 Sent | Follow-up 2 sent |
| Email 3 Sent | All 3 emails sent, no response |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| LinkedIn API fails | Check RapidAPI subscription; verify response has `data`/`results`/`profiles` |
| Apollo returns no email | Lead still added; Has Email? skips sending – correct |
| Sheets update fails | Ensure Status, Email Id, Email Sent, Response columns exist |
| Gmail trigger not firing | Activate workflow; check OAuth2 has read access |

---

## License

MIT License – Free to use and modify.

---

**Built with Dhruv and his AI Team**

*Turning AI into Outcomes*
