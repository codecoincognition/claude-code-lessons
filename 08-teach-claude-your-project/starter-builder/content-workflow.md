# Content Workflow — Briefing Document

## Company Context
Meridian Analytics is a B2B SaaS company selling a data analytics dashboard to mid-market finance teams. 45 paying customers, $1.8M ARR, 12-person team (4 engineering, 3 sales, 2 marketing, 1 product, 1 design, 1 ops).

## Content Strategy
Meridian publishes three types of content:
1. **Blog posts** — 800–1,200 words, published weekly on the company blog. Topic: data-driven decision making for finance teams.
2. **Case studies** — 1,500–2,000 words, published monthly. Template: Challenge → Solution → Results with quantified metrics.
3. **LinkedIn posts** — 150–250 words, published 3x/week. Voice: authoritative but approachable. Never salesy.

## Brand Voice Guidelines
- **Tone:** Expert peer, not vendor. Write as if advising a colleague, not selling to a prospect.
- **Jargon policy:** Use finance terms freely (ARR, CAC, LTV, churn). Avoid marketing buzzwords (synergy, leverage, paradigm).
- **Numbers rule:** Every claim must have a supporting metric. "Reduced report time" is banned. "Reduced report generation from 4 hours to 12 minutes" is required.
- **Forbidden phrases:** "cutting-edge," "next-generation," "game-changer," "disruptive," "best-in-class," "unlock the power of."
- **Attribution:** Always cite data sources. Internal data uses format: "Meridian internal data, Q2 2025, n=42 customers."

## Content Workflow
1. Writer drafts in Google Docs using the blog post template
2. Editor reviews for voice compliance and fact-checks metrics
3. Designer adds header image (brand colors: navy #1B2A4A, gold #C9A961, white)
4. Published via Webflow CMS
5. LinkedIn excerpt posted same day

## File Organization
```
content/
├── blog/
│   ├── drafts/          # Work in progress
│   ├── published/       # Final versions
│   └── templates/       # Blog post template, case study template
├── social/
│   ├── linkedin/        # LinkedIn post drafts
│   └── twitter/         # Twitter/X drafts (on hold)
├── case-studies/
│   ├── drafts/
│   └── published/
└── assets/
    ├── images/          # Header images, charts
    └── brand/           # Logo files, color palette, font files
```

## Current Pain Points
1. Every time we use Claude to draft content, we re-explain the brand voice. "Do not use jargon" is not specific enough — Claude uses "leverage" and "synergy" unless we list every banned word.
2. Case studies never follow the template on the first try. Claude invents its own structure instead of using Challenge → Solution → Results.
3. Blog posts are inconsistent — some use first person ("we built"), some use third person ("Meridian built"). We want third person for blog, first person for LinkedIn.
4. Content reviewers spend 30 minutes per draft fixing voice issues that should have been caught at generation time.

## What Success Looks Like
Claude should be able to draft a blog post that passes editorial review on the first try — correct tone, correct structure, correct metrics format, no banned phrases, third person voice.
