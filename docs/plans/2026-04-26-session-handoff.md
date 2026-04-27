# C Highland Advisory — Session Handoff

**Date:** 2026-04-26
**Author:** Claude (handing off to a fresh session)
**Purpose:** Hand this single document to another Claude session (or a developer) so they can pick up the C Highland Advisory site work cold. Captures project state, architecture, brand rules, what's shipped, and what's open.

> **Read me first.** Skim this whole doc before touching code. Skip to the *Open items / what's next* section for the immediate work queue.

---

## 1. The 5-minute orientation

| | |
| --- | --- |
| **Project** | Marketing site for C Highland Advisory LLC (Charleston, SC) — boutique senior-advisory firm |
| **Repo** | `worker-max/C-Highland-Advisory` |
| **Active branch** | `material-chapter-redesign` |
| **Stack** | Next.js 16.2.1 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion 12 · Lenis 1.0.34 |
| **Fonts** | DM Sans · JetBrains Mono · Source Serif 4 (with `axes: ['opsz']`, no `weight` array — variable axis constraint) |
| **Routes** | 23 total — homepage, 7 division detail pages, 4 engagement tier pages, founder, toolkits, login, engagement hub, practice index, transmissions, plus dynamic API + OG |
| **Build** | `npm run build` — 23 routes, all green at last check |
| **Deploy** | `vercel --yes` from project root → preview URL. `vercel --prod` to promote |
| **Production push status** | Not yet promoted to prod. Latest preview at `https://v0-c-highland-advisory-eb58eli5h-colin-highlands-projects.vercel.app` |
| **Founder** | Colin Highland, PT, DPT, CBA. Operator track at Humana + CenterWell Home Health |
| **Contact email** | `colinhighland@outlook.com` (free Outlook inbox; replace with domain inbox post-revenue) |
| **Founded** | 2023 (advising since); LLC formation date is 2026 but doesn't matter for credibility |

### Critical rules — do not break

1. **Single signal green `#00e676`** is used in exactly six controlled locations: (1) CTA button bg, (2) scroll progress bar, (3) custom dot cursor, (4) the seven nodes in the animated logo, (5) division-card line icons, (6) the lime period accent on hero headlines + the lime tier-number badges on homepage Engagement section. **Do not introduce green anywhere else.**
2. **Logo bar widths `[54, 64, 44, 70, 44, 64, 54]`** in `components/Logo.tsx` are encoded in `BAR_WIDTHS`. They draw the C-silhouette. Never modify these values.
3. **`FIRM.contactEmail`** in `lib/constants.ts` is the single source for every mailto link. Change one constant → the whole site updates. Do not hardcode email addresses.
4. **`LenisProvider` `useEffect([pathname])`** calls `lenis.scrollTo(0, { immediate: true })` on every route change. Without this, the footer-on-navigation bug returns (Lenis hijacks `window.scroll`, Next.js's automatic top-reset doesn't propagate).
5. **`prefers-reduced-motion: reduce`** is respected across all animations (logo intro, division-icon mechanisms, marquee, industries spotlight, scroll progress, custom cursor, preloader). Don't add new animation without a reduced-motion fallback.

---

## 2. Repo layout (orientation)

```
c-highland-advisory/
├── app/
│   ├── layout.tsx                # Wraps everything in <ChromeRoot>; loads fonts
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # All design tokens + section CSS (single file by intention)
│   ├── not-found.tsx             # 404
│   ├── opengraph-image.tsx       # Dynamic OG image generator
│   ├── robots.ts, sitemap.ts     # Static
│   ├── api/
│   │   ├── brief/route.ts        # Existing (unused at present)
│   │   └── subscribe/route.ts    # Existing (unused at present)
│   ├── practice/
│   │   ├── page.tsx              # /practice — flat ledger of 7 divisions
│   │   └── [slug]/page.tsx       # /practice/[slug] — 7 SSG pages from DIVISIONS
│   ├── engagement/
│   │   ├── page.tsx              # /engagement — tier hub showing all 4
│   │   └── [slug]/page.tsx       # /engagement/[slug] — 4 SSG pages from TIERS
│   ├── founder/page.tsx          # Founder bio (operator-first framing)
│   ├── toolkits/page.tsx         # Pre-fab programs/tools catalogue + partner-login CTA
│   ├── login/page.tsx            # Partner portal stub (mailto-routed form)
│   └── transmissions/page.tsx    # Field notes — stub, "inaugural dispatch forthcoming"
├── components/
│   ├── Logo.tsx                  # Animated 7-bar mark — DO NOT modify BAR_WIDTHS
│   ├── DivisionIcon.tsx          # 7 line-glyph patterns with intrinsic CSS animations
│   ├── InquireForm.tsx           # Reusable mailto-routed form (used on tier pages)
│   ├── chrome/
│   │   ├── ChromeRoot.tsx        # Single client island wrapping all chrome primitives
│   │   ├── LenisProvider.tsx     # Smooth-scroll + route-change reset
│   │   ├── Preloader.tsx         # First-session ink-black overlay
│   │   ├── CustomCursor.tsx      # 28px outer / 6px inner dot cursor
│   │   ├── ScrollProgress.tsx    # 2px lime hairline at viewport bottom
│   │   └── PillNav.tsx           # Floating pill nav with 5 links + login + CTA
│   ├── sections/
│   │   ├── Hero.tsx              # 220vh sticky 2-panel slide-in
│   │   ├── Approach.tsx          # Homepage Engagement = primary visual (4 tiers, 2x2)
│   │   ├── Divisions.tsx         # 700vh sticky horizontal scroll w/ 7 division cards + black-hole CTA
│   │   ├── Operator.tsx          # 2-card window-pane (Humana + CenterWell)
│   │   ├── Clients.tsx           # Names-only marquee + 9-sector window-pane
│   │   ├── FounderExcerpt.tsx    # Pull quote on paper bg
│   │   ├── SiteFooter.tsx        # Dark footer with email pill + 4-col grid
│   │   ├── DivisionMethod.tsx    # Section C of every /practice/[slug] page
│   │   ├── DivisionBench.tsx     # Section D — SMEs ($100-$250/hr)
│   │   └── DivisionEngagement.tsx # Section E — 4 tier cards + Begin engagement CTA
│   └── (legacy/dead — Container, CTAButton, Reveal, BriefForm, etc.)
├── lib/
│   ├── constants.ts              # FIRM constant — single source for name, email, founded, siteUrl
│   ├── chapters.ts               # Legacy chapter color helpers (not currently consumed)
│   └── content/
│       ├── divisions.ts          # 7 DIVISIONS data + PROGRAM_COPY map + helpers
│       ├── clients.ts            # CLIENTS (12 names, no logos) + SECTORS (9)
│       ├── industries.ts         # INDUSTRIES (9 — for the hero panel-2 spotlight)
│       └── engagement.ts         # 4 TIERS data — feeds homepage section + hub + sub-pages + discipline-page Engagement section
├── content/
│   └── (legacy duplicates — divisions.ts, clients.ts; not currently imported, but exist on disk)
├── public/
│   ├── favicon.svg, logo-black.svg
│   └── clients/                  # Local client logos (legacy, not currently used since names-only)
├── docs/plans/
│   ├── 2026-04-19-material-chapter-redesign-design.md  # Earlier iteration design doc
│   ├── 2026-04-19-material-chapter-redesign.md         # Earlier impl plan
│   ├── 2026-04-25-foundation-brief.md                  # Brief written for handoff to v0/Claude/designer
│   ├── 2026-04-26-review-notes.md                      # Per-page review notes (all DONE)
│   └── 2026-04-26-session-handoff.md                   # ← this file
├── DESIGN_HANDOFF.md             # The 4,157-line design spec the rebuild followed
├── LOGO_INTEGRATION_BRIEF.md     # The animated logo brief
├── package.json
└── tsconfig.json
```

---

## 3. Design tokens (in `app/globals.css`)

```css
/* Neutrals */
--color-bone:     #eeeee7   /* page bg */
--color-paper:    #f5f3ec   /* cards, hero panel 2 */
--color-ink:      #0f0f10
--color-graphite: #2a2a2c
--color-silt:     #6b6b6e
--color-mist:     #c9c6bd   /* hairlines, 1px gap fills */
--color-white:    #ffffff

/* Single signal green — six controlled locations only */
--color-signal:      #00e676

/* Chapter colors — used ONLY inside their division detail page +
   homepage division-card stripe. Do not bleed elsewhere. */
--ch-01-strategy:    #2a2a2c   /* graphite */
--ch-02-healthcare:  #0e6b5d   /* deep teal */
--ch-03-home-health: #b6482d   /* persimmon */
--ch-04-talent:      #b8862e   /* amber */
--ch-05-hr:          #6d2e4e   /* plum */
--ch-06-ai:          #1fa79c   /* turquoise */
--ch-07-human-ai:    #4a5278   /* slate-indigo */

/* Type */
--font-sans:  DM Sans
--font-mono:  JetBrains Mono
--font-serif: Source Serif 4   /* axes: ['opsz'] */

/* Layout */
--pill-height: 56px;
--gutter: clamp(20px, 4vw, 48px);
```

### The window-pane recipe (used everywhere)

For multi-cell card grids: parent is `display: grid; gap: 1px; background: var(--color-mist); border-radius: 16px; overflow: hidden`. Children are `background: var(--color-paper)` (or white). The 1px gaps reveal the mist below as hairline grid lines. Reused in: Approach (4 tiers), Operator (2 cards), Sectors (9 cells), Division-page meta-strip + programs grid + bench + method, Toolkits catalogue, Tier-page inclusions.

---

## 4. The seven divisions

`lib/content/divisions.ts` is the single source. Each `Division` carries:

- `num`, `slug`, `name`, `color` (chapter color)
- `lede` — homepage card body
- `blurb` — division-page A. Discipline subhead
- `programs[]` — named programs (per-program copy in `PROGRAM_COPY` map)
- `icon` — `IconKind` driving `DivisionIcon` component (7 patterns)
- `metrics[]` — 4 cells in division-page meta strip
- `longCopy[]` — 1-2 paragraphs for division-page A. Discipline body
- `bench[]` — SMEs displayed on division-page D. The Bench section

| # | Slug | Name | Icon |
| --- | --- | --- | --- |
| 01 | strategy-advisory | Strategy & Advisory | circuit |
| 02 | healthcare-strategy | Healthcare Strategy | vital |
| 03 | home-health-operations | Home Health Operations | branch |
| 04 | talent-acquisition | Talent Acquisition & Workforce Strategy | pipeline |
| 05 | operational-hr | Operational HR & Associate Engagement | knit |
| 06 | ai-practice | AI Practice — Tools, Agents & Automation | wave |
| 07 | human-ai-workforce | Human + AI Workforce Programs | merge |

### Division detail page anatomy (`/practice/[slug]`)

Every page renders these sections in order:
1. `division-hero` — crumbs, stripe row, h1 (with italic split on em-dash), lede, 4-cell meta strip
2. `A. Discipline` — eyebrow + `blurb` + `longCopy` paragraphs
3. `B. Named programs` — eyebrow + 2-col window-pane grid of programs (uses `PROGRAM_COPY`)
4. `C. Method` (`<DivisionMethod>`) — paper-bg section, 4 cards: Process & governance · Custom AI integration · HIPAA + SOC 2 compliance · Software delivery (cross-cutting; same on every division page)
5. `D. The Bench` (`<DivisionBench>`) — SMEs from `division.bench[]` with "On call" pill tags + lede mentioning $100-$250/hr independent rate
6. `E. Engagement` (`<DivisionEngagement>`) — paper-bg, "Any tier. Same discipline. / Scope is the pliable derivative." headline + 4 tier cards linking to `/engagement/[slug]` + Begin engagement mailto CTA
7. `next-division` — anchor to next division
8. `<SiteFooter>`

---

## 5. The four engagement tiers

`lib/content/engagement.ts` is the single source. Same data feeds: homepage Approach section · `/engagement` hub · `/engagement/[slug]` sub-pages · discipline-page DivisionEngagement section.

| Num | Slug | Name | One-liner |
| --- | --- | --- | --- |
| T1 | program | Embedded Program | Diagnose, design, run — embedded operator engagement |
| T2 | symposium | Charleston Symposium | 2- or 5-day in-person working symposium with AI concierge + boat day |
| T3 | virtual | Virtual Advisory | Fully remote, any scope, any length |
| T4 | co-op | Small Business Co-op | Free consultation + AI Tool Co-op + innovation partner network |

Each tier page renders: hero (crumbs, stripe in `--color-signal`, h1, lede, meta strip) → A. Format (long copy) → B. Inclusions (window-pane bullet grid) → C. Pricing (note + `<InquireForm>`) → next-tier anchor → footer.

---

## 6. Animations (and the rules around them)

| Surface | Mechanism | File |
| --- | --- | --- |
| Logo intro | bars draw L→R 380ms cascade + nodes pop + ring scales (~1400ms total). sessionStorage gate `ch-logo-intro-v1` | `Logo.tsx` |
| Logo hover | 7 nodes pulse 60ms-staggered cascade | `Logo.tsx` + `globals.css` |
| Logo bottom-node continuous pulse | only on `pulseBottom={true}` (homepage hero). Ring stays static. | `globals.css` `.logo-pulse-bottom` |
| Hero panel 2 slide-in | `translateX(100vw → 0)` driven by section scroll progress | `Hero.tsx` |
| Divisions horizontal scroll | sticky 100vh outer in 700vh tall section; track `translateX` driven by scroll progress | `Divisions.tsx` |
| Division icon mechanisms | SMIL `<animate>` + `<animateMotion>` — sliders, EKG blip, branch pulses, pipeline flow, knit weave, wave bars, merge core | `DivisionIcon.tsx` |
| Industries spotlight | CSS keyframes (`industry-flash-text` + `industry-flash-dot`) with per-`nth-child` delays. 12.6s cycle, 9 items × 1.4s offset | `globals.css` |
| Marquee | 60s linear infinite, hover-pauses | `globals.css` `.marquee-track` |
| Scroll progress | 2px lime hairline, `scaleX` from `scrollY/scrollHeight` | `ScrollProgress.tsx` |
| Custom cursor | 28px outer (lerp 0.18) + 6px inner (lerp 0.7), hover-expand | `CustomCursor.tsx` |
| Preloader | first-session-only black overlay, two decks slide outward at 1300ms | `Preloader.tsx` |

**All have `prefers-reduced-motion: reduce` fallbacks.**

---

## 7. Conventions

- **Sections** live in `components/sections/`. Each is exported and imported into `app/page.tsx` or a route page. Keep section components flat (no over-nested wrappers) — the homepage is intentionally simple to read.
- **Chrome** (preloader, cursor, scroll progress, pill nav, smooth scroll) lives in `components/chrome/` and is bundled into `<ChromeRoot>` so the whole app imports a single client island.
- **Content data** lives in `lib/content/` as TypeScript modules (no MDX, no headless CMS — by intention; Colin owns copy directly).
- **Fonts** use `next/font/google`. Source Serif 4 requires `axes: ['opsz']` *without* a `weight` array (variable-font constraint).
- **Mailto links** route through `FIRM.contactEmail` — never hardcode the email.
- **Founded year** uses `FIRM.founded` — never hardcode.
- **Tone**: operator-grade pragmatism. Quiet authority. Not academic, not consultancy-glossy. Italic clauses are the rhetorical pause; reserve for 2nd clauses in headlines + pull-quotes.
- **Italic + lime**: italic clauses always paired with `color: var(--color-silt)`. Lime periods (`<span className="hl-dot">.</span>`) reserved for headline punctuation only — used in hero panel 1, /toolkits hero, /engagement hero, /login h1, Approach h2.

---

## 8. Build / deploy

```bash
# Dev
npm run dev

# Build (Turbopack)
npm run build

# Lint
npm run lint

# Deploy preview to Vercel
vercel --yes

# Promote latest preview to production
vercel --prod
```

Vercel project: `colin-highlands-projects/v0-c-highland-advisory`.
GitHub auto-deploys preview on every push to `material-chapter-redesign`.

---

## 9. Open items / what's next

### Production push
- [ ] Promote latest preview to prod with `vercel --prod` once Colin gives the word.
- [ ] Verify domain `chighlandadvisory.com` is configured to point at the Vercel project (should already be set up).

### Cleanup (post-launch)
- [ ] Delete dead components: `components/Container.tsx`, `components/CTAButton.tsx`, `components/Reveal.tsx`, `components/BriefForm.tsx`, `components/ChapterBand.tsx`, `components/ChapterDot.tsx`, `components/ChapterEdge.tsx`, `components/ChapterWash.tsx`, `components/Footer.tsx` (old), `components/Hero.tsx` (old; see `components/sections/Hero.tsx` for the live one), `components/Nav.tsx` (old; see `chrome/PillNav.tsx`), `components/ScrollProgress.tsx` (old; see `chrome/ScrollProgress.tsx`), `components/ClientsStrip.tsx`, `components/PracticeScroller.tsx`, `components/PullQuote.tsx`, `components/ServiceGrid.tsx`, `components/StepFlow.tsx`, `components/EngagementModelCard.tsx`, `components/PillRow.tsx`, `components/SectionHead.tsx`, `components/Emblem.tsx`, `components/GrainOverlay.tsx`, `components/DivisionCard.tsx`, `components/DivisionSection.tsx`, `components/DotIcon.tsx`, `components/icons/*`. None are imported; they don't break the build, but they bloat the repo.
- [ ] Delete `content/` directory (legacy duplicate of `lib/content/`).
- [ ] Audit `lib/chapters.ts` — only consumed by dead code; can probably delete.

### Real backend (when Colin has revenue)
- [ ] Wire a real email backend (Resend or SendGrid) for the `<InquireForm>` and tier-inquire forms instead of `mailto:`. Currently `action="mailto:..."` opens the user's email client; works but loses analytics + leaks the address to scrapers.
- [ ] Set up a domain inbox (e.g., `engage@chighlandadvisory.com`); update `FIRM.contactEmail` (one-line change, all routes update).
- [ ] Wire Auth.js v5 on `/login` — the form currently mailto-routes "request access." Pattern from `workforcewave` repo will port directly. Once auth is live, build `/partners/*` routes for gated toolkit content.

### Future content (this week per Colin)
- [ ] Build out the four `/engagement/[slug]` tier pages with deeper packaging copy. They currently render with light shells (light-content mandate to ship today).
- [ ] Dream up tools for the AI Tool Co-op — both ready-to-deploy and "imagined" tools per discipline. Add to `/toolkits` catalogue or a new `/toolkits/[slug]` route.
- [ ] Real founder portrait — drop a headshot at `public/founder.jpg` and swap the placeholder div in `app/founder/page.tsx` for a `<next/image>`.

### Known issues / things that may bite
- `ChromeRoot` is a server component that imports client components — works because each client component has `"use client"` at the top, but a future Next.js update could shift the balance. Keep an eye on this.
- The Lenis route-change reset works for client-side `<Link>` navigation. Hard reloads + back-button behavior may differ; verify in real testing.
- `prefers-reduced-motion` is respected, but the *initial* hero panel 2 will still slide in on first scroll because we don't gate the JS scroll handler. If a reduced-motion user complains, gate the `panel2Ref.style.transform` update behind the same media query.
- `ChromeRoot` mounts `<ScrollProgress>` and `<PillNav>` at z-50 and z-101 respectively. If you add a modal/dialog later, push it to z-200+ to clear them.

---

## 10. Recent commit history (reverse chrono)

```
cf592ae practice: every division across all 4 tiers, scope flexes
2ebc928 ai practice: broaden capabilities; fix Lenis scroll-reset on route change
6a97b30 batch: apply all pending review-notes items
1a2c706 homepage: Four Ways to Engage as primary visual + bio fix
2493537 practice pages: Method + Bench + Engagement sections; tier sub-pages added
2051dda review-notes: capture Approach section feedback (4 tiers + sub-pages)
7a25948 logo: keep integration ring static, only the node pulses
ee92ab2 homepage micro-polish + Toolkits nav + Partner login portal
ba85c2d divisions: fix head/card overlap + mechanism animations per discipline
bf0055b divisions: prominent lime CTA + 5x icons + scroll-responsive motion
f89d4d6 logo: tone (light/dark) + layout (inline/stacked) variants
65c5eed foundation: Von Lyncker pattern — pill nav + window-pane card grid + scroll progress
ffb9ccc clients: drop logos, treat names as editorial typography + clear nav from hero
1deae3e brand: integrate animated 7-bar logo + minimalist strip cleanup + honest Healthcare Strategy positioning
e7fad9d fix(layout): drop weight array on Newsreader (incompatible with axes:['opsz'])
855f268 practice: horizontal scroll-snap with lime dot patterns + black-hole CTA + clients marquee + modernized wordmark
```

For full history: `git log --oneline -50`.

---

## 11. Existing planning docs in this repo

Read in this order if the new session needs full context:

1. **`DESIGN_HANDOFF.md`** (root, 4,157 lines) — the design spec the rebuild followed. Token tables, section behavior, every animation. Authoritative for visual decisions.
2. **`docs/plans/2026-04-25-foundation-brief.md`** — earlier brief written for handoff. Captures the firm context, the Von Lyncker reference, and the chronological list of Colin's asks.
3. **`docs/plans/2026-04-26-review-notes.md`** — the running review-notes from today's per-page pass. All items marked DONE. Useful as evidence of what was decided and why.
4. **`LOGO_INTEGRATION_BRIEF.md`** — the animated logo geometry + animation spec.
5. Earlier `docs/plans/2026-04-19-*` — archeology from a prior iteration; mostly superseded but useful if questions arise about the chapter color system.

---

## 12. How to brief the new session

Paste this into the new session as a starting message:

> I'm continuing work on **C Highland Advisory** (repo: `worker-max/C-Highland-Advisory`, branch `material-chapter-redesign`).
>
> **Read first:** `docs/plans/2026-04-26-session-handoff.md` end-to-end. It has the project orientation, file structure, brand rules, and open work queue.
>
> Key context:
> - Stack: Next.js 16 + React 19 + TS + Tailwind v4 + Framer Motion 12 + `@studio-freight/lenis@1.0.34` + `next/font/google` (DM Sans, JetBrains Mono, Source Serif 4 with `axes: ['opsz']`).
> - Single signal green `#00e676` is the only accent — six controlled locations. Don't add more.
> - Logo C-silhouette bar widths `[54, 64, 44, 70, 44, 64, 54]` are sacred — don't modify.
> - All mailto routes via `FIRM.contactEmail` in `lib/constants.ts`.
> - LenisProvider's pathname-keyed `scrollTo(0, immediate)` on every route change is required — don't remove.
>
> Audit the current state, then ask me what task to start.
> Don't write code yet — show me the plan first.

---

*End of session handoff.*
