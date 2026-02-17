---
name: lead-gen-sales
description: Generate, scrape, classify, and enrich business leads for sales outreach. Use when asked to find leads, scrape businesses, build prospect lists, classify leads by industry, enrich emails, or create proposals.
---

# Lead Generation & Sales

## Goal
Scrape, classify, enrich, and manage business leads using Apify, LLM classification, and Google Sheets.

## Workflow

### 1. Test Scrape (25 leads)
```bash
python3 scripts/scrape_apify.py \
  --query "INDUSTRY" --location "LOCATION" --max_items 25 \
  --no-email-filter --output .tmp/test_leads.json
```

### 2. Verify Quality
- Check if 80%+ leads match target industry
- Pass → continue. Fail → refine keywords.

### 3. Full Scrape
```bash
# Small (<1000 leads)
python3 scripts/scrape_apify.py \
  --query "INDUSTRY" --location "LOCATION" --max_items COUNT \
  --no-email-filter --output .tmp/leads.json

# Large (1000+ leads) — parallel with geographic partitioning
python3 scripts/scrape_apify_parallel.py \
  --query "INDUSTRY" --total_count 4000 --location "United States" \
  --strategy regions --no-email-filter
```

### 4. Classify (optional)
```bash
python3 scripts/classify_leads_llm.py \
  .tmp/leads.json --classification_type product_saas --output .tmp/classified.json
```

### 5. Upload to Google Sheet
```bash
python3 scripts/update_sheet.py .tmp/leads.json --title "Leads - INDUSTRY"
```

### 6. Enrich Emails
```bash
python3 scripts/enrich_emails.py SHEET_URL
```

## Output
**The ONLY deliverable is the Google Sheet URL.** Local files in `.tmp/` are temporary.

## Environment Variables Required
```
APIFY_API_TOKEN
GOOGLE_APPLICATION_CREDENTIALS
ANTHROPIC_API_KEY
ANYMAILFINDER_API_KEY
```
