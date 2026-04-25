# C Highland Advisory — Foundation Brief

**Date:** 2026-04-25
**Author of brief:** Colin Highland (compiled by Claude after losing the thread on minimalism + foundation alignment)
**Purpose:** Hand this single document to a fresh tool/designer (Claude.ai web, v0.dev, Lovable, or a human designer) for a clean rebuild grounded in the reference site below. Captures everything Colin has asked for plus the technical breakdown of vonlyncker.com he provided.

---

## 1. Firm context

| Field | Value |
| --- | --- |
| **Legal entity** | C Highland Advisory LLC (South Carolina) |
| **Discipline** | Senior advisory — strategy, operations, applied AI |
| **Location** | Charleston, SC |
| **Founded** | 2026 |
| **Founder** | Colin Highland, PT, DPT, CBA |
| **Tone** | Boutique. Quiet authority. Operator-grade pragmatism. Not academic, not consultancy-glossy. |
| **Tagline** | *Seven divisions. One operating discipline.* |
| **Founder note (hero sentence)** | "I design operational programs across healthcare, talent acquisition, contingent workforce, and applied AI — and I build them to last." |

**Sectors served:** Healthcare systems · Medical & dental clinics · Home health & hospice · Government agencies · Municipalities · National home-service brands · Hospitality groups · Youth sports organizations · Political operations.

**Brother site (sibling brand):** [niallhighland.com](https://niallhighland.com). Highland Brothers family-of-sites pattern — shared craft (SVG logos, pulsing nodes, editorial tone), distinct motifs (circuits vs. operational schematics), distinct palettes/monograms.

---

## 2. The seven divisions

| # | Slug | Name | Chapter color token |
| --- | --- | --- | --- |
| 01 | `strategy-advisory` | Strategy & Advisory | `#2a2a2c` (graphite) |
| 02 | `healthcare-strategy` | Healthcare Strategy | `#0e6b5d` (deep teal) |
| 03 | `home-health-operations` | Home Health Operations | `#b6482d` (persimmon) |
| 04 | `talent-acquisition` | Talent Acquisition & Workforce Strategy | `#b8862e` (amber) |
| 05 | `operational-hr` | Operational HR & Associate Engagement | `#6d2e4e` (plum) |
| 06 | `ai-practice` | AI Practice — Voice & Workflow Automation | `#1fa79c` (turquoise) |
| 07 | `human-ai-workforce` | Human + AI Workforce Programs | `#4a5278` (slate-indigo) |

Inside each division are **named programs** (not separate sections), e.g.:
- **Strategy & Advisory** includes the *Enterprise-Wide Education Program*.
- **Talent Acquisition** includes *Contingent Labor Workforce Program* + *Talent Acquisition Strategies*.
- **Operational HR** includes *Retention Strategy* + *Associate Engagement Programs*.

---

## 3. Tech stack (committed)

- **Framework:** Next.js 16.2.1 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 with `@theme inline` CSS-first tokens
- **Fonts (next/font/google):** DM Sans (sans), JetBrains Mono (mono), Newsreader (serif, axes:['opsz'])
  - **Constraint:** Newsreader requires no `weight` array because it's variable + uses optical-size axis.
- **Motion:** Framer Motion 12.x
- **Deployment:** Vercel preview URLs from GitHub branch `material-chapter-redesign`. Repo: [worker-max/C-Highland-Advisory](https://github.com/worker-max/C-Highland-Advisory).
- **Brand assets:** `public/favicon.svg`, `public/logo-black.svg`, animated 7-bar Logo component (sessionStorage skip-intro after first play).

---

## 4. Color system — committed

```css
/* Neutrals — warmed toward letterhead paper */
--color-bone:     #eeeee7;
--color-paper:    #f5f3ec;
--color-ink:      #0f0f10;
--color-graphite: #2a2a2c;
--color-silt:     #6b6b6e;
--color-mist:     #c9c6bd;

/* Chapter colors — muted-vivid, non-primary (see §2) */

/* Lime — system "live signal" accent (icons, active states, CTAs) */
--color-lime:     #c5e84b;

/* Brand identity — RESERVED FOR LOGO ONLY per logo brief */
--color-brand-bar:    #1b1b1b;
--color-brand-signal: #00e676;  /* logo node green, NOT a UI green */
--color-brand-cream:  #edeae0;
--color-brand-forest: #0f1a14;
```

**Rule:** `--color-brand-signal` (#00e676) is **only** used inside the Logo component. The system "live" accent for the rest of the UI is `--color-lime` (#c5e84b).

---

## 5. Reference site — vonlyncker.com (the foundation Colin wants)

> "Not looking for exact replica, but base foundation."

**vonLyncker.com — Navigation & Scroll System: Technical Specification (provided by Colin verbatim):**

### Overview of Architecture

The page is a single-page site (~26,500px tall) built with a **scroll-driven horizontal slide pattern**. Multiple fullscreen sections are made artificially tall in CSS so that vertical scrolling controls horizontal `translateX` animations via Webflow IX2 (JavaScript scroll triggers). **Lenis** (`@studio-freight/lenis@1.0.34`) is used for smooth scroll inertia.

### 1. Preloader / Intro Animation

A `position: fixed` overlay (z-index 110, 100% × 100vh) covers the screen on page load. Background black; center-shows logo image + "SENIOR ADVISORY" text. Two `preloader-deck` divs animate out (slide up/down), revealing the site beneath. Once finished, preloader hides.

### 2. Navbar

```text
div.navbar            ← fixed wrapper, z-index: 101
  div.webflow-native-navbar.w-nav   ← the pill
    div.navbar-outer
      div.navbar-inner   ← 3-column CSS grid: [left nav] [logo] [right nav]
        ul.nav-menu-left   ← Consulting approach, Consulting areas, References
        a.navbar-logo-div  ← centered logo
        ul.nav-menu-right  ← About Us, Partner Login, Language toggle, CTA button
```

```css
.navbar {
  position: fixed;
  top: 0;
  z-index: 101;
  width: 100%;
  padding: 2rem 3rem 0;     /* 32px top, 48px sides */
  display: block;
}
.webflow-native-navbar {
  z-index: 5;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  background-color: rgba(255, 255, 255, 0.6);   /* #fff9 */
  border: 1px solid rgba(255, 255, 255, 0.15);   /* #ffffff26 */
  border-radius: 16px;
  width: 100%;
  height: 5rem;             /* 80px */
  display: flex;
  justify-content: center;
  align-items: center;
}
.navbar-inner {
  display: grid;
  grid-template-columns: 0.75fr 0.25fr 0.75fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.navbar-outer {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}
```

**Behavior:** Always fully visible (not hidden on scroll). Pill bg starts transparent over dark hero video, becomes visible via backdrop-blur + rgba over light content.

**Active nav state:** A `div.nav-bg` (absolute white pill, `border-radius: 8px`) slides behind the currently-hovered nav item — a separate animated element, not a CSS `:hover`.

**CTA button:** `.btn-outlined-inner` — bg `var(--green)` (`#00ffa2`), `border-radius: 8px`, padding `1rem 1.75rem`.

**Nav links:** `#modell`, `#beratungsfelder`, `#referenzen`, `#team` — anchors to specific scroll positions.

### 3. Scroll Progress Indicator

```css
.indicator {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2.5px;
  background-color: #00ffa2;   /* var(--green) */
  z-index: 109;
  transform-origin: 0% 50%;
  /* scaleX driven from 0 to 1 on scroll */
}
```

Thin green bar pinned to viewport bottom. `scaleX(0)` → `scaleX(1)` as user scrolls top → bottom.

### 4. Custom Cursor

```css
.curser_wrapper {
  position: fixed;
  z-index: 111;
  pointer-events: none;
  width: 100%;
  height: 100vh;
}
.curser-outer-dot {
  width: 28px; height: 28px;
  border-radius: 100%;
  background-color: #00ffa2;
  position: absolute;
  /* follows mouse with lag/lerp */
}
.curser-inner-dot {
  width: 6px; height: 6px;
  border-radius: 100%;
  background-color: #00ffa2;
  /* follows mouse exactly */
}
.scroll {
  width: 1.5rem; height: 1.5rem;
  /* rotated "SCROLL" text, spins as a visual cue on the hero */
}
```

Two circles track the mouse; outer lags via `lerp` in `requestAnimationFrame`.

### 5. Core Scroll-Driven Horizontal Slide Pattern

Used for **5 of 7 sections**. The formula:

- **Outer container:** `position: sticky; top: 0; height: 100vh; overflow: hidden` — pins to viewport.
- **Parent wrapper:** `position: relative; height: N×100vh` — creates scroll room.
- **Inner track:** starts at `translateX(100vw)` (off-screen right), animated to `translateX(0)` by scroll trigger.

```css
.section-name {           /* parent — creates scroll room */
  position: relative;
  height: 800vh;          /* 8× viewport */
  z-index: 100;
  width: 100%;
}
.section-name-outer {     /* sticky viewport panel */
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.section-name-inner {     /* animated track */
  width: 100%;
  height: 100%;
  /* JS: transform: translateX(100vw) → translateX(0) */
}
```

**Section heights and negative margins (the overlap trick):**

| Section | Height | Margin-top |
| --- | --- | --- |
| `.hero` | 800vh | none |
| `.model` | 800vh | -400vh |
| `.values-desktop` | 800vh | -400vh |
| `.services` | 1200vh | -525vh |
| `.portfolio-desktop` | 1000vh | -600vh |
| `.team-desktop` | 600vh | -325vh |
| `.contact-desktop` | 150vh | none |

Stacking with negative margins causes sections to "overlap" in scroll space, creating seamless transitions between sticky panels.

### 6. Hero Section (2 panels)

```text
div.hero (height: 800vh)
  div.hero-outer (sticky, 100vh, overflow:hidden)
    div.hero-inner (100%, overflow:hidden)
      div.hero-section-1 (z-index:1, 100vw × 100vh, position:relative)
        div.hero-section-1-content   ← text bottom-left, body bottom-right
        div.hero-section-1-background  ← background video, absolute fill
      div.hero-section-2 (z-index:2, 100vw × 100vh, position:absolute, inset:0)
        ← starts at translateX(100vw), slides in as hero scrolls
        ← white bg, border-radius:16px, rounded card appearance
        ← contains "You deserve more than just good advice" content
```

**Panel 1:** Full-bleed video bg, large white serif headline bottom-left, body bottom-right.
**Panel 2:** White rounded panel (`border-radius: 16px`, `bg: var(--white)`) slides in from the right.

### 7. Model / Approach Section (2 panels)

```text
div.model (height: 800vh, margin-top: -400vh)
  div.model-outer (sticky, 100vh, overflow:hidden)
    div.model-inner  ← starts at translateX(100vw), slides left on scroll
      div._3x3-grid.desktop  ← 3×3 grid of cards, each 33.3vw × 33.3vh
      div._2x2-grid           ← second panel layout
```

**Grid system:** `grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1px; grid-row-gap: 1px`. Each cell `bg: var(--white); border-radius: 16px`. The 1px gaps reveal the dark bg → "window pane" effect.

### 8. Services Section (7 horizontal cards)

```text
div.services (height: 1200vh, margin-top: -525vh)
  div.services-outer (sticky, 100vh, overflow:hidden)
    div.services-inner (width: 233.1vw, height:100vh, display:flex)
      div.service-item × 7  ← each 33.3vw wide
```

```css
.service-item {
  background-color: var(--white);
  border-radius: 16px;
  width: 33.3vw;
  height: 100%;
  margin-right: 1px;
}
.service-item-inner {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 3rem;
}
```

233.1vw track (7 × 33.3vw) starts at `translateX(100vw)`, scroll drives right → left.

### 9. Portfolio Section (vertical grid)

```text
div.portfolio-desktop (height: 1000vh, margin-top: -600vh)
  div.portfolio-outer (sticky, 100vh, overflow:hidden)
    div.portfolio-inner  ← contains 3× _3x3-grid panels
      div._3x3-grid.mid
      div._3x3-grid.bottom  (margin-top: 1px)
      div._3x3-grid.top     (margin-bottom: 1px)
```

Doesn't slide horizontally — uses 3-column grid where rows reveal vertically through 1000vh of sticky.

### 10. Team Section (horizontal slide)

```text
div.team-desktop (height: 600vh, margin-top: -325vh)
  div.team-outer (sticky, 100vh, overflow:hidden)
    div.team-inner (display:flex, width:100vw)
      div.team-grid  ← starts at translateX(100vw), slides in
```

Label column + 3 team cards (photo + name + Learn more), 4th card off-screen slides in.

### 11. JS implementation (vanilla equivalent)

```javascript
import Lenis from '@studio-freight/lenis';

// 1. Smooth scroll
const lenis = new Lenis({ lerp: 0.1, smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// 2. For each scroll-driven section, calculate progress and apply translateX
function onScroll() {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;

  // Hero panel 2: slides in from translateX(100vw) to 0, then continues to -100vw
  const heroProgress = Math.min(Math.max(scrollY / (8 * vh), 0), 1);
  document.querySelector('.hero-section-2').style.transform =
    `translateX(${(1 - heroProgress) * 100}vw)`;

  // Model inner
  const modelEl = document.querySelector('.model');
  const modelProgress = Math.min(Math.max(
    (scrollY - modelEl.offsetTop) / (modelEl.offsetHeight - vh), 0), 1);
  document.querySelector('.model-inner').style.transform =
    `translateX(${(1 - modelProgress) * 100}vw)`;

  // Services inner: total travel = 233.1vw - 100vw = 133.1vw
  const servicesEl = document.querySelector('.services');
  const servicesProgress = Math.min(Math.max(
    (scrollY - servicesEl.offsetTop) / (servicesEl.offsetHeight - vh), 0), 1);
  document.querySelector('.services-inner').style.transform =
    `translateX(${100 - servicesProgress * 233.1}vw)`;

  // Scroll progress bar
  const totalScroll = document.body.scrollHeight - vh;
  document.querySelector('.indicator').style.transform =
    `scaleX(${scrollY / totalScroll})`;
}
window.addEventListener('scroll', onScroll);
```

### 12. Anchor Navigation

Standard hash anchors:
- `#modell` → `div.model-anchor` at `offsetTop: 5900`
- `#beratungsfelder` → `div.services-anchor` at `offsetTop: 12838`
- `#referenzen` → `div.portfolio-anchor` at `offsetTop: 17656`
- `#team` → `div.team-anchor` at `offsetTop: 21820`

Anchor divs are `height: 0` direct children of `.main-content`.

### 13. Color Variables

```css
:root {
  --green: #00ffa2;    /* accent / CTA / indicator */
  --black: #000000;
  --white: #ffffff;
  --bg: #f0ede8;       /* warm off-white used in sections */
}
```

---

## 6. Mapping vonLyncker → C Highland Advisory

| Von Lyncker | C Highland equivalent |
| --- | --- |
| `--green: #00ffa2` | `--color-lime: #c5e84b` (system live signal) |
| `--bg: #f0ede8` | `--color-bone: #eeeee7` |
| `--white: #ffffff` | `--color-paper: #f5f3ec` (or true white) |
| Services (7 horizontal cards) | The seven Divisions (PracticeScroller pattern) |
| Portfolio (3×3 grid) | Clients & Affiliations (window-pane card grid) |
| Hero panel 2 ("You deserve more...") | Founder note slide-in over hero video/atmosphere |
| Team section | Operator Experience (Humana + CenterWell as 2 cards) |
| Model section | "How engagements work" three-step |

---

## 7. Everything Colin has explicitly asked for (chronological)

### Initial scaffold
1. Build out everything from `C Highland Advisory.zip` seed doc with **6 academic divisions**.
2. Use existing GitHub repo + Vercel project + dedicated repo.

### First aesthetic pivot (April 19)
3. **Full redesign** with the eyes of "a master web designer — Apple or Google modern."
4. **Google / Material modern** direction.
5. **No primary colors.** Muted-vivid hues (turquoise, persimmon, plum, amber, teal).
6. Add **Lime green** (`#c5e84b`) as system live signal.
7. **No scripted/decorative serif fonts** ever — modern sans-serif systems only (DM Sans, Geist, Inter).

### Programs and divisions restructuring
8. Programs Colin has personally developed should be **nested inside existing divisions** as named programs, not separate sections:
   - Contingent Labor Workforce Program
   - Talent Acquisition Strategies
   - Enterprise Wide Education Program
   - Retention Strategy
   - Associate Engagement Programs
9. Add **Division 07: Human + AI Workforce Programs** ("slate-indigo" `#4a5278`) — the workforce-integration discipline.

### Reference site lock-in
10. Model the foundation after **vonlyncker.com** (specifically `#beratungsfelder` services section).
11. **Lime green icons** that change patterns as user scrolls.
12. **Black-hole CTA** at end of horizontal scroll (radial dark panel, free-consultation pill).
13. **Auto-scrolling marquee** for clients & affiliations — slow news-ticker pace, hover-pausable.
14. **Static Operator Experience** strip (Humana + CenterWell Home Health) above the marquee.
15. **"More to see" affordance** must be obvious (peek of next card / edge-fade).

### Logo / wordmark
16. Modernize the wordmark with a designer, modern font that complements vonLyncker's typography.
17. Integrate the **animated 7-bar logo** per `LOGO_INTEGRATION_BRIEF.md`:
    - Bars draw left-to-right; nodes scale in; integration ring on node #7.
    - Intro plays once per session (sessionStorage key `ch-logo-intro-v1`).
    - Hover cascade pulse; `prefers-reduced-motion` respected.
    - `--color-brand-signal: #00e676` reserved for logo only.

### Latest pivots
18. **Extreme minimalism** must be deployed across the whole site.
19. **Logo is covered by header / every page upper content is hidden by upper navigation bar** — recurring complaint, structural fix needed (pill nav, not full-width sticky bar).
20. **Drop logos in the clients section.** Names only.
21. **Italic serif treatment of names** = "ugly, horrible." Reject. Use clean modern sans.
22. **Display clients in an extremely designed, polished, surprising way** — but inside the Von Lyncker foundation (white rounded cards on warm bg with 1px gaps).
23. The **Healthcare Strategy positioning** must NOT be boastful — Colin doesn't have heavy hands-on healthcare-strategy delivery experience but his skills translate. Approved phrasing: *"Operations and workforce strategy translated to healthcare priorities."*

### Process expectations
24. Follow standard build flow: **Review → Plan → Implement → Validate → Document, loop until 100%.**
25. Deploy a team of **specialist subagents** for UI work + a synthesis "master web designer" agent.
26. Honest brand voice on the founder side — not consultancy-glossy.

---

## 8. Current site state (commit `65c5eed` on branch `material-chapter-redesign`)

**What's built:**
- Animated 7-bar Logo component (sessionStorage skip-intro, hover cascade, reduced-motion safe).
- Pill nav (first attempt — needs refinement; Colin's screenshot shows nav links cramped with the logo, "C HIGHLAND" mono caps reading awkwardly next to a 36px symbol).
- Window-pane white-card grid for clients (Von Lyncker pattern, 1px gaps over `--color-mist`).
- Lime scroll progress indicator pinned bottom-fixed via Framer Motion `useScroll` + `useSpring`.
- PracticeScroller — horizontal scroll-snap with seven division cards + black-hole CTA card (8th).
- Hero with 300px Logo + 24-word founder note + byline + single CTA.
- Founder block (PullQuote + 3 positions cards), engagement steps, CTA footer.
- All 7 division detail pages (`/practice/[slug]`).

**What's still wrong (from Colin's latest screenshots):**
- Founder page hero headline is **clipped at the top** by the pill nav. Hero pt is insufficient.
- Pill nav reads as a busy strip — symbol logo + mono "C HIGHLAND" + 4 nav links + "Begin engagement" CTA all crammed into a small pill. Looks more like a toolbar than a brand mark.
- The pill border (`rgba(255,255,255,0.30)`) is essentially invisible against the bone bg.
- The lime indicator dots on the client cards are too prominent.
- Foundation (Lenis smooth scroll, scroll-driven horizontal slide for divisions, custom cursor) is **not yet implemented** — only the pill + window-pane grid + scroll-progress bar are.

---

## 9. Unimplemented Von Lyncker primitives

These are explicitly in Colin's spec but not yet built:

- [ ] **Preloader / intro overlay** (black overlay with logo + "SENIOR ADVISORY", two-deck slide-out)
- [ ] **Lenis smooth scroll** (`@studio-freight/lenis@1.0.34`, `lerp: 0.1`)
- [ ] **Custom dot cursor** (28px outer with lag, 6px inner exact-follow)
- [ ] **Scroll-driven horizontal slide pattern** (sticky outer + tall parent + translateX-on-scroll inner)
- [ ] **3×3 grid panels** with 1px gaps (window-pane) — Practice section could use this for divisions
- [ ] **Active nav state** (animated white pill `nav-bg` sliding behind hovered link, not CSS `:hover`)
- [ ] **Anchor navigation** with offsetTop-based hash anchors (zero-height divs as scroll markers)

---

## 10. Outstanding pain points to flag for the next attempt

1. The pill nav needs to either (a) hide the wordmark inside the pill and rely on a clean centered symbol, or (b) be wider with proper `0.75fr 0.25fr 0.75fr` 3-col grid + adequate breathing room.
2. The Logo at 300px in the hero has competed with every header iteration. May want to commit to a smaller hero Logo (e.g., 120-160px) and let the editorial sentence carry the weight.
3. The founder positions cards on `/founder` use a different card recipe than the homepage clients grid. **Unify to one card system** (16px radius, white on `--color-mist` window-pane base).
4. The lime accent is over-applied. In Von Lyncker, green appears in *only three places*: CTA bg, scroll progress bar, custom cursor. Everywhere else is neutral. Audit the site for excess lime.
5. Mobile experience hasn't been considered seriously. Pill nav needs to either collapse to a hamburger or stay with just symbol + CTA.
6. The animated 7-bar logo's brand-signal green (`#00e676`) sits next to the system lime (`#c5e84b`) — these two greens are too close to each other in hue. May read as a color clash. Worth a deliberate decision: keep both, or pull one.

---

## 11. Recommended places to take this brief

| Tool / venue | When to use it | Realistic limits |
| --- | --- | --- |
| **Claude.ai web app (with Artifacts)** | Component-level prototypes (a single section, hero, nav variant). Iteration on look-and-feel without writing to disk. | Won't ship to a Next.js codebase directly. You'd copy/paste components back into the repo. Best for *exploration*, not production. There isn't a separate product called "Claude Design." |
| **v0.dev (by Vercel)** | Generating production-ready Next.js + Tailwind components from a brief. Excellent at the shadcn/ui + Tailwind 4 + Next.js stack you're already on. Can output directly into the repo. | Aesthetic defaults skew toward standard SaaS look. You'd need to feed it the Von Lyncker spec verbatim and reject generic-feeling outputs. |
| **Lovable.dev / Bolt.new** | Whole-app generation if you want to start from a blank slate and let an AI rebuild from this brief. | Less control over the existing brand assets (animated logo, divisions data). May force you to re-port content. |
| **A human designer (Patrick Bryant @ GoToTeam, or freelance)** | If the issue is *taste* and *foundation* rather than execution speed. A senior designer who has done a Webflow IX2 site before will read your Von Lyncker spec in 10 minutes and produce a higher-fidelity visual direction than any AI tool can. | $$$. Slower turnaround. But if you want this to actually feel like Von Lyncker, a human is the safest bet. |
| **Continue with Claude Code (this session)** | Foundation primitives are mostly in place; what's needed is *taste* and *discipline* on top. If you want to keep iterating here, the path is: pause, agree on the next 3 specific cuts, execute, deploy, review. | Requires me to listen better and avoid over-iterating on details. |

**My honest read:**
- If you want **Von Lyncker–level scroll-driven theatrics** (Lenis, sticky horizontal slides, custom cursor, preloader): hand this brief to a designer who works in Webflow or GSAP. The complexity-per-pixel is high enough that AI tooling will struggle to nail the feel.
- If you want **a polished pill nav + window-pane card system + clean editorial typography** without the full scroll choreography: v0.dev fed this brief is the fastest path. It outputs Next.js + Tailwind, which drops directly into your repo.
- If you want a **hybrid** (designer for the aesthetic frame, me for implementation): get a senior designer to deliver a Figma frame for the homepage hero + nav + one services panel, then I reimplement faithfully in code. That's the path I'd actually take.

---

## 12. Keys / handles for whoever picks this up

- **Repo:** `worker-max/C-Highland-Advisory` (branch `material-chapter-redesign`)
- **Vercel project:** `colin-highlands-projects/v0-c-highland-advisory`
- **Latest preview:** `https://v0-c-highland-advisory-7ehj1bo15-colin-highlands-projects.vercel.app`
- **Last commit:** `65c5eed foundation: Von Lyncker pattern — pill nav + window-pane card grid + scroll progress`
- **Animated logo brief on disk:** `LOGO_INTEGRATION_BRIEF.md` (root)
- **Earlier design docs:** `docs/plans/2026-04-19-material-chapter-redesign-design.md`, `docs/plans/2026-04-19-material-chapter-redesign.md`

---

*End of brief.*
