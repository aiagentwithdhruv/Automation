# Prompt: Build Google Maps Lead Generation Pipeline

Use this prompt to have an AI build the complete GMaps lead scraping + contact enrichment pipeline from scratch.

---

## The Prompt

```
Build me an end-to-end Google Maps lead generation pipeline with the following specifications:

## Goal
Scrape businesses from Google Maps, enrich each with deep contact extraction from their websites, and save to a Google Sheet that grows over time.

## Architecture Requirements

### Layer 1: Google Maps Scraping
- Use Apify's `compass/crawler-google-places` actor (I have APIFY_API_TOKEN in .env)
- Accept dynamic search queries (e.g., "plumbers in Austin TX")
- Accept a --limit parameter for number of results
- Return structured business data: name, address, phone, website, rating, reviews, place_id, google_maps_url

### Layer 2: Website Contact Extraction
For each business with a website:
1. HTTP fetch the main page (use httpx, not requests)
2. Convert HTML to markdown (use html2text library)
3. Find and fetch up to 5 additional pages matching contact patterns:
   - Priority order: /contact, /about, /team, /contact-us, /about-us, /our-team, /staff, /people, /meet-the-team, /leadership, /management, /founders, /who-we-are, /company, /meet-us, /our-story, /the-team, /employees, /directory, /locations, /offices
4. Search DuckDuckGo for `"{business name}" owner email contact` and include snippets + first relevant result page
5. Combine all content and send to Claude 3.5 Haiku for structured extraction

### Layer 3: Claude Extraction Schema
Have Claude extract this JSON structure:
```json
{
  "emails": ["all email addresses found"],
  "phone_numbers": ["all phone numbers found"],
  "addresses": ["physical addresses found"],
  "social_media": {
    "facebook": "url or null",
    "twitter": "url or null",
    "linkedin": "url or null",
    "instagram": "url or null",
    "youtube": "url or null",
    "tiktok": "url or null"
  },
  "owner_info": {
    "name": "owner/founder name",
    "title": "their position",
    "email": "direct email if found",
    "phone": "direct phone if found",
    "linkedin": "personal linkedin"
  },
  "team_members": [{"name", "title", "email", "phone", "linkedin"}],
  "business_hours": "operating hours",
  "additional_contacts": ["other contact methods like WhatsApp, Calendly, etc."]
}
```

### Layer 4: Google Sheets Integration
- Use gspread with OAuth credentials (credentials.json exists)
- Create sheet with headers on first run, or append to existing sheet via --sheet-url
- Implement deduplication using lead_id (MD5 hash of name|address)
- Track metadata: scraped_at, search_query, pages_scraped, search_enriched, enrichment_status

## Technical Requirements

### Error Handling
- ~10-15% of sites return 403/503 - handle gracefully, still save lead with GMaps data
- Facebook URLs always return 400 - skip them in web search results
- Some sites have broken DNS - catch and mark as error
- Claude sometimes returns dicts instead of strings for fields like business_hours - use a stringify_value() helper

### Performance
- Use ThreadPoolExecutor for parallel website enrichment (default 3 workers)
- Limit contact pages to 5 max per site
- Truncate content to 50K chars before sending to Claude
- DuckDuckGo HTML search (html.duckduckgo.com/html/) is free and doesn't block

### Output Schema (36 columns)
lead_id, scraped_at, search_query, business_name, category, address, city, state, zip_code, country, phone, website, google_maps_url, place_id, rating, review_count, price_level, emails, additional_phones, business_hours, facebook, twitter, linkedin, instagram, youtube, tiktok, owner_name, owner_title, owner_email, owner_phone, owner_linkedin, team_contacts, additional_contact_methods, pages_scraped, search_enriched, enrichment_status

## File Structure
Create these files:
- `execution/scrape_google_maps.py` - Standalone GMaps scraper
- `execution/extract_website_contacts.py` - Standalone website contact extractor
- `execution/gmaps_lead_pipeline.py` - Main orchestration script
- `directives/gmaps_lead_generation.md` - Documentation

## CLI Interface
```bash
# Basic usage
python3 execution/gmaps_lead_pipeline.py --search "plumbers in Austin TX" --limit 10

# Append to existing sheet
python3 execution/gmaps_lead_pipeline.py --search "roofers in Austin TX" --limit 50 \
  --sheet-url "https://docs.google.com/spreadsheets/d/..."
```

## Autonomous Building Loop

IMPORTANT: Build this iteratively with real testing:

1. Build the Google Maps scraper first, test with --limit 3
2. Build the website contact extractor, test on a single URL
3. Build the orchestration pipeline, test end-to-end with --limit 5
4. Fix any bugs that appear (there will be edge cases)
5. Run a full test with --limit 10 to verify everything works
6. Update the directive with learnings

Do NOT just write code and stop. Actually run it, observe errors, fix them, and iterate until you have a working pipeline that successfully:
- Scrapes businesses from Google Maps
- Enriches them with website + search data
- Extracts structured contacts via Claude
- Saves to Google Sheet with deduplication

Test with the same search query multiple times to verify deduplication works.

## Cost Targets
- Apify: ~$0.01-0.02 per business
- Claude Haiku: ~$0.002 per extraction
- Everything else: Free
- Total: ~$0.015-0.025 per lead

## Success Criteria
The pipeline is complete when:
1. `python3 execution/gmaps_lead_pipeline.py --search "test query" --limit 10` runs without errors
2. 10 leads appear in the Google Sheet with populated contact fields
3. Running the same command again shows "No new leads to add (all duplicates)"
4. The directive documents all learnings and edge cases discovered

Now build it.
```

---

## Notes for Users

This prompt encodes all the learnings from building the pipeline:
- The 22 contact page URL patterns (priority ordered)
- DuckDuckGo HTML as free search fallback
- The stringify_value() helper for Claude's inconsistent output
- 403/503 error rates and handling
- Deduplication via MD5 hash
- Parallel enrichment with ThreadPoolExecutor
- The exact output schema that works with Google Sheets

The "autonomous building loop" instruction is critical - it forces the model to actually test and iterate rather than just writing code and stopping.
