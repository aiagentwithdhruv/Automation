---
name: content-social
description: Create and post social media content, edit videos, research viral content, generate thumbnails, and manage LinkedIn/Twitter posting. Use when asked about social media, LinkedIn posts, Twitter posts, video editing, YouTube research, thumbnails, or content creation.
---

# Content & Social Media

## Goal
Create, schedule, and post content across social platforms. Edit videos. Research viral content patterns.

## Capabilities

| Capability | Description |
|-----------|-------------|
| Video editing | Remove silences, add transitions (FFmpeg + Remotion) |
| 3D transitions | Create swivel/pan effects for video |
| Thumbnails | Face-swap YouTube thumbnails |
| Outlier research | Find viral videos from adjacent niches |
| Niche monitoring | Track your niche for outlier content |
| Title generation | Generate title variations for LinkedIn/YouTube |

## Social Media Workflow Pattern (n8n)

A typical automated content pipeline:
1. **Schedule trigger** (e.g., 9 AM + 6 PM daily)
2. **Content from Google Sheet** (pre-written posts)
3. **Image generation** (AI-generated visuals)
4. **Approval step** (Telegram/Slack notification)
5. **Post to platforms** (LinkedIn + Twitter)

## LinkedIn Content Strategy

- Post DAILY: short screen recordings or insights
- Use strong hooks ("I built an AI that...")
- Tag relevant decision-makers
- Goal: 5 posts/week minimum

## Video Editing

Key capabilities:
- Silence removal (FFmpeg)
- 3D pan transitions (Remotion)
- Thumbnail face-swap
