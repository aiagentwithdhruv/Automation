# Prompt: Instantly Campaign Creator Workflow

Use this prompt to recreate the Instantly campaign creation workflow from scratch.

---

## The Prompt

Build a complete workflow that creates cold email campaigns in Instantly based on a client description and offers.

### Requirements

**Inputs:**
- Client name and description
- Target audience
- Social proof/credentials
- 3 offers (or auto-generate if not provided)

**Output:**
- 3 campaigns in Instantly (one per offer)
- Each campaign: 3 email steps
- First step: 2 A/B variants (meaningfully different approaches)
- Steps 2-3: 1 variant each (follow-up and breakup)

**Email structure (per the examples in `.tmp/instantly_campaign_examples/campaigns.md`):**
- Personalization hook (use `{{icebreaker}}` or custom opener)
- Social proof (credentials, results, experience)
- Offer (clear value prop, low barrier)
- Soft CTA

**Available variables:** `{{firstName}}`, `{{lastName}}`, `{{email}}`, `{{companyName}}`, `{{casualCompanyName}}`, `{{icebreaker}}`, `{{sendingAccountFirstName}}`

### Technical Constraints (Critical - Learned from API)

1. **Instantly API v2** - Use `POST https://api.instantly.ai/api/v2/campaigns` with Bearer token auth
2. **HTML formatting required** - Instantly strips ALL plain text outside HTML tags. Must wrap paragraphs in `<p>` tags, use `<br>` for line breaks within paragraphs
3. **Schedule requires `name` field** - Each schedule object needs a `name` property
4. **Timezone enum is restrictive** - Use `America/Chicago` (not `America/New_York` - it fails)
5. **Sequences array** - Only first element is used, add all steps to that one sequence
6. **Step type** - Must be `"email"` always

### Autonomous Building Loop

**You must build → test → iterate independently until complete. Do not stop at the first error.**

1. **Research first**: Check existing code in `execution/` and examples in `.tmp/`. Look up Instantly API v2 docs if needed.

2. **Create directive**: Write `directives/instantly_create_campaigns.md` with:
   - Clear inputs/outputs
   - Step-by-step process
   - Environment requirements
   - Example usage
   - Edge cases

3. **Create execution script**: Write `execution/instantly_create_campaigns.py` that:
   - Uses Claude (Opus 4.5 with thinking) to generate campaigns from examples
   - Converts plain text to HTML (wrap paragraphs in `<p>` tags)
   - Creates campaigns via Instantly API v2
   - Handles errors gracefully
   - Supports `--dry_run` flag for testing

4. **Test with dry run**: Run with `--dry_run` first to verify generation works

5. **Test live creation**: Run without dry run, verify campaigns appear in Instantly

6. **Self-anneal on errors**: When something breaks:
   - Read the error message carefully
   - Fix the script
   - Test again
   - Update directive with learning
   - Continue until fully working

7. **Verify end-to-end**: Check that created campaigns in Instantly have:
   - Correct email bodies (not empty, not stripped)
   - Proper formatting (line breaks render correctly)
   - All 3 steps with correct variants

### Expected API Payload Structure

```json
{
  "name": "ClientName | Offer 1 - Description",
  "sequences": [{
    "steps": [
      {
        "type": "email",
        "delay": 0,
        "variants": [
          {"subject": "...", "body": "<p>...</p><p>...</p>"},
          {"subject": "...", "body": "<p>...</p><p>...</p>"}
        ]
      },
      {
        "type": "email",
        "delay": 3,
        "variants": [{"subject": "Re: ...", "body": "<p>...</p>"}]
      },
      {
        "type": "email",
        "delay": 4,
        "variants": [{"subject": "Re: ...", "body": "<p>...</p>"}]
      }
    ]
  }],
  "campaign_schedule": {
    "start_date": "YYYY-MM-DD",
    "end_date": "YYYY-MM-DD",
    "schedules": [{
      "name": "Weekday Schedule",
      "days": {"monday": true, "tuesday": true, "wednesday": true, "thursday": true, "friday": true},
      "timing": {"from": "09:00", "to": "17:00"},
      "timezone": "America/Chicago"
    }]
  },
  "email_gap": 10,
  "daily_limit": 50,
  "stop_on_reply": true,
  "stop_on_auto_reply": true,
  "link_tracking": true,
  "open_tracking": true
}
```

### Environment

Requires in `.env`:
```
INSTANTLY_API_KEY=your_api_v2_key
ANTHROPIC_API_KEY=your_anthropic_key
```

### Success Criteria

The workflow is complete when:
1. `--dry_run` generates 3 valid campaigns with proper HTML formatting
2. Live run creates 3 campaigns in Instantly
3. Campaigns display correctly in Instantly UI (text visible, line breaks work)
4. Directive documents all learnings and edge cases
5. Script handles missing API key gracefully (exits early, doesn't waste Claude tokens)

**Do not notify me until all success criteria are met. Build, test, and iterate autonomously.**
