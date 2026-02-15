# Upwork Job Scraper + Proposal Generator Pipeline

Build an end-to-end pipeline that scrapes Upwork jobs matching AI/automation keywords, generates personalized cover letters and proposals using Opus 4.5, creates Google Docs for each proposal, and outputs everything to a Google Sheet with one-click apply links.

## Architecture

Follow the 3-layer DOE pattern:
1. **Directive** (`directives/upwork_scrape_apply.md`): SOP documenting inputs, execution tools, output format, edge cases, learnings
2. **Execution scripts** (`execution/`): Deterministic Python scripts that do the actual work
3. **Orchestration**: You read directives, call scripts, handle errors, update directives with learnings

## Pipeline Components

### 1. Upwork Scraper (`execution/upwork_apify_scraper.py`)

Use the `upwork-vibe~upwork-job-scraper` Apify actor (free tier, $0/event).

**Key constraints discovered:**
- Free tier only supports `limit`, `fromDate`, `toDate` filters
- All other filtering (budget, experience, verified payment, client spend) must be post-scrape
- Job URL format: `https://www.upwork.com/jobs/~{id}`
- Apply URL format: `https://www.upwork.com/nx/proposals/job/~{id}/apply/`

**CLI interface:**
```bash
python execution/upwork_apify_scraper.py \
  --limit 50 --days 1 --verified-payment \
  --min-spent 1000 --experience intermediate,expert \
  -o .tmp/upwork_jobs.json
```

### 2. Proposal Generator (`execution/upwork_proposal_generator.py`)

**LLM Strategy:**
- Use Opus 4.5 (`claude-opus-4-5-20251101`) with extended thinking
- Thinking budget: 8000 tokens for proposals, 5000 for cover letters
- Parallelize LLM calls with `ThreadPoolExecutor` (default 5 workers)

**Google Docs Strategy:**
- Serialize Doc creation with `threading.Semaphore(1)` - parallel creates cause SSL errors
- Retry with exponential backoff (1.5s, 3s, 6s, 12s) on failures
- Fall back to embedding proposal text in sheet if Doc creation fails after retries

**Cover Letter Format (must stay above the fold, ~35 words):**
```
Hi. I work with [2-4 word paraphrase] daily & just built a [2-5 word thing]. Free walkthrough: [DOC_LINK]
```

**Proposal Format (first-person, conversational, ~300 words):**
```
Hey [name if available].

I spent ~15 minutes putting this together for you. In short, it's how I would create your [2-4 word paraphrase] end to end.

I've worked with $MM companies like Anthropic (yes—that Anthropic) and I have a lot of experience designing/building similar workflows.

Here's a step-by-step, along with my reasoning at every point:

My proposed approach

[4-6 numbered steps with WHY for each, mention specific tools: n8n, Claude API, Zapier, Make, etc.]

What you'll get

[2-3 concrete deliverables]

Timeline

[Realistic estimate, conversational]
```

**CLI interface:**
```bash
python execution/upwork_proposal_generator.py \
  --input .tmp/upwork_jobs.json \
  --workers 5 \
  -o .tmp/upwork_proposals.json
```
- Omit `--sheet-id` to auto-create new Google Sheet
- Use `--sheet-id ID` to append to existing sheet

### 3. Google Sheet Output

Columns: Title, URL, Budget, Experience, Skills, Category, Client Country, Client Spent, Client Hires, Connects, Apply Link, Cover Letter, Proposal Doc

## Technical Requirements

**Dependencies:**
- `anthropic` - Opus 4.5 API
- `google-auth`, `google-auth-oauthlib`, `google-api-python-client` - Google APIs
- `requests` - Apify API calls
- `python-dotenv` - Environment variables

**Environment:**
- `ANTHROPIC_API_KEY` in `.env`
- `APIFY_API_TOKEN` in `.env`
- `token.json` with Google OAuth credentials (scopes: spreadsheets, drive, documents)
- `credentials.json` for OAuth flow

**Google OAuth Scopes:**
```python
SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/documents'
]
```

## Autonomous Building Loop

**CRITICAL: Build, test, iterate independently until done.**

1. **Build first version** of each script with basic functionality
2. **Test immediately** with real data (small batch: 5-10 jobs)
3. **Observe failures** - API errors, rate limits, format issues
4. **Fix and enhance** - add retry logic, parallelization, fallbacks
5. **Test again** - verify fixes work
6. **Update directive** with learnings (edge cases, timing, constraints)
7. **Repeat** until pipeline runs end-to-end without intervention

**Error handling patterns discovered:**
- Apify: Poll status every 3s, timeout after 5 min
- Anthropic: Parallelize with ThreadPoolExecutor, reduce workers if rate limited
- Google Docs: Serialize with semaphore + exponential backoff retry
- Always have fallback (embed proposal in sheet if Doc fails)

**Performance benchmarks:**
- 10 jobs with 5 workers: ~2 min (vs ~20 min sequential)
- Opus 4.5 with 8000 thinking tokens: 30-60s per call
- Google Doc creation: 2-5s each (serialized)

## Deliverables

1. `directives/upwork_scrape_apply.md` - Complete SOP
2. `execution/upwork_apify_scraper.py` - Scraper with post-filtering
3. `execution/upwork_proposal_generator.py` - Parallel proposal generator
4. Working Google Sheet with proposals and one-click apply links

## Success Criteria

- Pipeline runs end-to-end without manual intervention
- All Google Docs created successfully (retry handles transient failures)
- Cover letters are under 35 words and include Doc links
- Proposals follow the conversational first-person format
- Sheet has all columns populated
- Directive documents all edge cases and learnings
