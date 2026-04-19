# C Highland Advisory — Material Chapter Redesign (Design Doc)

**Date:** 2026-04-19
**Branch:** `material-chapter-redesign`
**Status:** Design approved. Implementation pending.

## Context

The site launched in a Swiss-editorial direction (Fraunces → Inter, dossier masthead, editorial ledger). Colin reviewed the deployed build and asked for a full redesign with a fresh-eyes Apple/Google perspective. Through brainstorming we locked:

- **Direction:** Google/Material-modern (not Apple product-marketing, not Stripe/B2B).
- **Scope:** Change it all — content/copy survives, every visual and structural decision is rebuilt.
- **Palette constraint:** "Neutrals with smart use of color. No primary hues. Like turquoise, interesting oranges — vivid but off the primary wheel."
- **Approach:** A — "Material Chapter." Warm neutral base + per-division muted-vivid chapter signatures. Color becomes information (each of the 6 divisions carries its own non-primary hue).

## §1 — Visual language

### Typography
- **Display + body:** DM Sans (via `next/font/google`). Weights 400 / 500 / 700. Geometric, modern, warmer than Inter — carries the Google/Material feel without being Google Sans proper.
- **Tactical:** JetBrains Mono, used sparingly (engagement model chips, meta rows, numerals) — not everywhere.
- **Scale shift:** away from 200/300 editorial thinness, toward confident 500/700 display.

### Color tokens
```css
/* Neutral base */
--bone:     #F7F5F1;  /* warm off-white canvas */
--paper:    #FAFAF7;  /* cooler surface for cards */
--ink:      #0F0F10;  /* near-black */
--graphite: #2A2A2C;  /* body text */
--silt:     #6B6B6E;  /* muted label gray */
--mist:     #C4C2BE;  /* hairline rule */

/* Chapter signatures — muted-vivid, non-primary */
--ch-strategy:   #2A2A2C;  /* graphite (anchor) */
--ch-healthcare: #0E6B5D;  /* deep teal */
--ch-homehealth: #B6482D;  /* persimmon */
--ch-talent:     #B8862E;  /* amber */
--ch-hr:         #6D2E4E;  /* plum */
--ch-ai:         #1FA79C;  /* turquoise */
```

Chapter color appears as: division card left-edge chip (4px), division-page hero radial wash (~30% saturation on top 40% viewport band), accent on interactive state in chapter-scoped sections, anchor-word underline.

### Spatial model
- **Grid:** 12-col desktop, 4-col mobile. Max content width **1320px** centered.
- **Cards:** 14px radius. Elevation: `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.06)`. One step up on hover.
- **Rhythm:** 4 / 8 / 16 / 24 / 48 / 80 / 120. No arbitrary 36/60.
- **Section padding:** 96px desktop / 64px mobile.

### Motion
- `Reveal` wrapper: opacity 0→1, y 24→0, **0.8s**, ease `[0.16, 1, 0.3, 1]` (longer, softer than prior build).
- Hover: cards `translateY(-2px)` + shadow bump. Buttons same. No accent-color page floods.
- No parallax, no scroll-jacking, no cursor followers, no auto-carousels.

### Signature moves (not-generic-Material)
1. **Homepage hero chapter band** — six hues as a horizontal gradient, desaturated to ~18%.
2. **Division card chips** — 4px left-edge in chapter hue.
3. **Division page hero wash** — radial gradient of chapter hue over top 40% viewport at low opacity.
4. **Mono-in-moments** — JetBrains Mono reserved for engagement model chips + numerals, not section labels.

## §2 — Page architecture

### Homepage `/`
6 sections, scroll-anchored:
1. **Hero** — full-viewport. Chapter-band gradient. DM Sans 500 headline ~120px: *"Strategy, operations, and applied AI — from someone who's actually done all three."* Lead + two CTAs.
2. **Proof strip** — thin band of sectors served (9 pills) with a one-line lead.
3. **The Practice — 6 division cards** in a 3×2 grid. Chapter chip, number, name, positioning, "Learn more →".
4. **The Founder** — split-column. Left: oversized italic pull-quote. Right: 3 discipline cards (Clinician / Operator / AI Builder).
5. **How engagements work** — horizontal 3-step flow.
6. **CTA footer block** — full-width bone panel with display statement + single CTA.

### Practice overview `/practice`
Hero + larger 2-col division cards + closing pull-line + CTA.

### Division detail `/practice/[slug]`
- Hero washes top 40% in chapter hue. Display headline = division name, subhead = positioning in darker tone.
- Services grid (2-col).
- Sectors pill row.
- Engagement model cards (active/inactive states).
- Thesis pull-quote in chapter hue.
- CTA.

### Founder `/founder`
Hero + three alternating "chapters" (Clinician / Operator / AI Builder) with image placeholders + Colophon (Credentials, Based, Also at, Speaking, Publications) in 2-col Material cards + closing link.

### Engagement `/engagement`
Hero + 4 engagement model cards + editorial split (copy + inline form) + "What happens next" 3-step.

### Transmissions `/transmissions`
Simpler. Hero + empty-state card + optional subscribe. No Issue 00 TOC.

### 404
Single panel, display headline, two CTAs.

### Nav
Sticky, backdrop-blur, logo + links + primary CTA. No masthead strip. No dossier numbering.

## §3 — Component system

### Scrapped
`Masthead.tsx`, `FounderQuote.tsx`, `DivisionsLedger.tsx`, `DivisionRow.tsx`, `SectorPills.tsx`.

### Rewritten (same path, new interior)
`GrainOverlay.tsx` (dialed to 3% multiply only, may be removed entirely in validation if it fights the aesthetic), `Nav.tsx`, `Footer.tsx`, `CTAButton.tsx` (pill shape, 28px radius, primary/secondary/ghost), `Hero.tsx` (homepage vs page mode, takes `chapter?` prop), `SectionHead.tsx`, `BriefForm.tsx`, `Reveal.tsx` (ease/duration tweak).

### New
- `DivisionCard.tsx` — homepage + practice grid card
- `StepFlow.tsx` — horizontal 3-step flow
- `ServiceGrid.tsx` — division detail "what we do" grid
- `EngagementModelCard.tsx` — model card with active/inactive states
- `PullQuote.tsx` — large italic display quote with `chapter?` prop
- `PillRow.tsx` — neutral pill wrap (sectors, meta)
- `ChapterBand.tsx` — 6-hue horizontal gradient (homepage hero)
- `ChapterWash.tsx` — radial gradient for division hero backgrounds
- `ChapterChip.tsx` — 4px edge or inline chapter-color chip
- `Container.tsx` — shared max-w-[1320px] + horizontal padding

### Data model change
`content/divisions.ts` gets one field per division:
```ts
chapter: 'strategy' | 'healthcare' | 'homehealth' | 'talent' | 'hr' | 'ai'
```
Consumed by `DivisionCard`, `ChapterWash`, `ChapterChip`, and `[data-chapter]` attributes at page level.

## §4 — Delivery loop

1. **Design doc** (this file) → commit to branch.
2. **Implementation pass 1** in phases:
   - **A. Foundation** — swap Inter → DM Sans; rewrite `globals.css`; delete scrapped components.
   - **B. Primitives** — build Container, CTAButton, Hero, Chapter*, DivisionCard, StepFlow, ServiceGrid, EngagementModelCard, PullQuote, PillRow, rewritten Nav/Footer/SectionHead/BriefForm.
   - **C. Pages** — homepage, practice, division detail, founder, engagement, transmissions, 404.
   - **D. Data** — add `chapter` field to `content/divisions.ts`.
   - **E. Validate** — type-check clean, dev server up, all routes 200, no console errors.
3. **Panel review** (5 agents: typography, layout, color/chapter coherence, motion, editorial craft).
4. **Synthesis master** consolidates into single prioritized plan.
5. **Implement synthesis → push → Vercel auto-deploy → user preview.**
6. **Loop** until panel + user both produce zero change requests. Only then merge to main.

### Guardrails (carried from prior pass)
- No implementation before design doc is committed.
- All `<style>` blocks live in `globals.css` — no component-level inline `<style>`.
- Every component uses token utilities — no inline `style={{ color: "#abc" }}` cowboy CSS.
- Every page screenshot-verified at 1440px + 375px before claiming pass done.
- Type-check clean + zero console errors is table stakes.

## Explicit non-goals for this redesign

- No dark-mode toggle.
- No CMS/blog system (Transmissions stays placeholder).
- No case studies or testimonials (client will add later).
- No analytics beyond Vercel Analytics.
- No per-division illustrated icons in pass 1 (image-placeholder surfaces instead).
- No pricing page.
- No live chat.
- No real subscribe endpoint (stub returns 200).

## Out-of-scope for this redesign (noted for v2)

- Custom illustrated iconography per division.
- Real MDX posts on `/transmissions`.
- Contact-form emails wired to CRM instead of Resend stub.
- Dark cinematic theme variant (Material is light-first here; dark pass could follow).
