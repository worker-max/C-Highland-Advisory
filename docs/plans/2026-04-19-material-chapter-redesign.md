# Material Chapter Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship a full Google/Material-modern redesign of chighlandadvisory.com with a warm-neutral base and six per-division muted-vivid chapter color signatures, replacing the existing Swiss-editorial build.

**Architecture:** Next.js 16 App Router on Vercel. Single-family sans (DM Sans) + JetBrains Mono for tactical moments only. Tailwind 4 `@theme` tokens drive every surface. Six division chapter colors (graphite, deep teal, persimmon, amber, plum, turquoise) wired via a `chapter` field on each Division record and consumed by new `ChapterBand` / `ChapterWash` / `ChapterChip` components and `[data-chapter]` page-level attributes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4 (`@theme` CSS-first config), `next/font/google` for DM Sans + JetBrains Mono, framer-motion for scroll-in reveals, Resend for the brief form.

**Reference:** Full design captured in `docs/plans/2026-04-19-material-chapter-redesign-design.md`. Read it before starting.

**Verification model:** This is pure UI work — "tests" are type-check + dev server render + snapshot/screenshot verification (no Jest/Playwright). Each task ends with: `npx tsc --noEmit` clean, `preview_logs --level=error` empty, and the visible route responding 200.

---

## Phase A — Foundation (8 tasks)

### Task A1: Switch the feature branch to redesign state

**Files:**
- Verify: current branch is `material-chapter-redesign`

**Step 1: Confirm branch**

Run: `git branch --show-current`
Expected: `material-chapter-redesign`

**Step 2: Ensure working tree clean**

Run: `git status --short`
Expected: empty output.

### Task A2: Replace the font loader — Inter → DM Sans

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Edit imports + instance**

Replace:
```ts
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});
```

With:
```ts
import { DM_Sans, JetBrains_Mono } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
```

Update the `<html className=...>` to reference `${dmSans.variable}` instead of `${inter.variable}`.

**Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no output (clean).

**Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "foundation: swap Inter to DM Sans"
```

### Task A3: Rewrite `app/globals.css` with Material Chapter tokens

**Files:**
- Modify: `app/globals.css` (full replacement)

**Step 1: Replace with the token system**

Full file content:

```css
@import "tailwindcss";

/* ═══════════════════════════════════════════════
   C HIGHLAND ADVISORY — Material Chapter tokens
   ═══════════════════════════════════════════════ */

@theme inline {
  /* Neutral base */
  --color-bone:     #f7f5f1;
  --color-paper:    #fafaf7;
  --color-ink:      #0f0f10;
  --color-graphite: #2a2a2c;
  --color-silt:     #6b6b6e;
  --color-mist:     #c4c2be;

  /* Chapter signatures — muted-vivid, non-primary */
  --color-ch-strategy:   #2a2a2c;
  --color-ch-healthcare: #0e6b5d;
  --color-ch-homehealth: #b6482d;
  --color-ch-talent:     #b8862e;
  --color-ch-hr:         #6d2e4e;
  --color-ch-ai:         #1fa79c;

  /* Fonts */
  --font-sans: var(--font-dm), ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, SFMono-Regular, monospace;

  /* Motion */
  --ease-quiet: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-hover: 240ms;
  --dur-reveal: 800ms;
}

@theme {
  --breakpoint-md: 900px;
}

/* Base reset */
* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

html, body {
  background: var(--color-bone);
  color: var(--color-graphite);
  font-family: var(--font-sans);
  font-weight: 400;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body { overflow-x: clip; isolation: isolate; }

::selection { background: var(--color-ink); color: var(--color-bone); }

a { color: inherit; text-decoration: none; }

button {
  font: inherit;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
}

:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
  border-radius: inherit;
}

/* Display + headline utilities */
.display-xl {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(56px, 8vw, 120px);
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: var(--color-ink);
  text-wrap: balance;
}

.display-lg {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(44px, 5.5vw, 84px);
  line-height: 1;
  letter-spacing: -0.028em;
  color: var(--color-ink);
  text-wrap: balance;
}

.display-md {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(32px, 4vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  text-wrap: balance;
}

.display-sm {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(24px, 2.8vw, 34px);
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--color-ink);
}

/* Mono bits — used sparingly */
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-silt);
}

.mono-numeral {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--color-silt);
}

/* Body scales */
.lead {
  font-size: clamp(17px, 1.4vw, 20px);
  line-height: 1.6;
  color: var(--color-graphite);
  font-weight: 400;
  max-width: 58ch;
}

.prose-base {
  font-size: 16px;
  line-height: 1.65;
  color: var(--color-graphite);
  font-weight: 400;
}

/* Card surface + elevation */
.card {
  background: var(--color-paper);
  border-radius: 14px;
  box-shadow:
    0 1px 2px rgba(15, 15, 16, 0.04),
    0 8px 24px -8px rgba(15, 15, 16, 0.06);
  transition:
    transform var(--dur-hover) var(--ease-quiet),
    box-shadow var(--dur-hover) var(--ease-quiet);
}
.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow:
    0 2px 4px rgba(15, 15, 16, 0.05),
    0 16px 32px -12px rgba(15, 15, 16, 0.10);
}

/* Pill — neutral tag used for sectors + meta */
.pill {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  color: var(--color-graphite);
  background: var(--color-paper);
  border: 1px solid var(--color-mist);
  border-radius: 999px;
  padding: 6px 14px;
  transition: border-color var(--dur-hover) var(--ease-quiet);
}
.pill:hover { border-color: var(--color-ink); }

/* CTA — pill buttons (primary / secondary / ghost) */
.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.005em;
  padding: 14px 24px;
  border-radius: 999px;
  transition:
    transform var(--dur-hover) var(--ease-quiet),
    background var(--dur-hover) var(--ease-quiet),
    color var(--dur-hover) var(--ease-quiet),
    box-shadow var(--dur-hover) var(--ease-quiet);
  border: 1px solid transparent;
}
.cta:hover { transform: translateY(-1px); }

.cta-primary { background: var(--color-ink); color: var(--color-bone); }
.cta-primary:hover {
  box-shadow: 0 6px 18px -6px rgba(15, 15, 16, 0.35);
}

.cta-secondary {
  background: transparent;
  color: var(--color-ink);
  border-color: var(--color-ink);
}
.cta-secondary:hover { background: var(--color-ink); color: var(--color-bone); }

.cta-ghost {
  background: transparent;
  color: var(--color-ink);
  padding: 8px 0;
  border-radius: 0;
}
.cta-ghost::after {
  content: " →";
  display: inline-block;
  transition: transform var(--dur-hover) var(--ease-quiet);
}
.cta-ghost:hover::after { transform: translateX(4px); }
.cta-ghost:hover { color: var(--color-silt); }

/* Form fields */
.field-label {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-graphite);
  letter-spacing: -0.005em;
}
.field-line {
  width: 100%;
  display: block;
  background: transparent;
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 16px;
  padding: 12px 0;
  border: 0;
  border-bottom: 1px solid var(--color-mist);
  outline: none;
  transition: border-color var(--dur-hover) var(--ease-quiet);
}
.field-line:focus { border-bottom-color: var(--color-ink); }
```

**Step 2: Type-check + dev server sanity**

Run: `npx tsc --noEmit`
Expected: clean.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "foundation: Material Chapter tokens and utilities"
```

### Task A4: Delete scrapped components

**Files:**
- Delete: `components/Masthead.tsx`, `components/FounderQuote.tsx`, `components/DivisionsLedger.tsx`, `components/DivisionRow.tsx`, `components/SectorPills.tsx`

**Step 1: Delete**

Run:
```bash
rm components/Masthead.tsx components/FounderQuote.tsx components/DivisionsLedger.tsx components/DivisionRow.tsx components/SectorPills.tsx
```

**Step 2: Verify deletions**

Run: `ls components/`
Expected: remaining components only — Nav, Footer, CTAButton, Hero, SectionHead, BriefForm, GrainOverlay, Reveal.

**Step 3: Remove broken imports from pages** (temporary — will be rewritten in Phase B/C)

Expected: type-check now fails because pages still import these. That's OK — Phase B/C will fix. Do NOT attempt to fix here; leave pages broken until rewritten.

**Step 4: Commit**

```bash
git add -A
git commit -m "scrap: remove editorial-era components"
```

### Task A5: Add `chapter` field to `content/divisions.ts`

**Files:**
- Modify: `content/divisions.ts`

**Step 1: Add type + update all 6 records**

At top of the `Division` type, add:
```ts
export type ChapterKey =
  | "strategy"
  | "healthcare"
  | "homehealth"
  | "talent"
  | "hr"
  | "ai";
```

Add `chapter: ChapterKey` to the `Division` type.

Then update each division object:
- `strategy-advisory` → `chapter: "strategy"`
- `healthcare-strategy` → `chapter: "healthcare"`
- `home-health-operations` → `chapter: "homehealth"`
- `talent-acquisition` → `chapter: "talent"`
- `operational-hr` → `chapter: "hr"`
- `ai-practice` → `chapter: "ai"`

**Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: pages still fail (imports from deleted components), but the `content/divisions.ts` file itself should type-clean.

**Step 3: Commit**

```bash
git add content/divisions.ts
git commit -m "data: add chapter key to each division"
```

### Task A6: Rewrite `components/GrainOverlay.tsx` (dialed down)

**Files:**
- Modify: `components/GrainOverlay.tsx`

**Step 1: Replace with 3% single-pass multiply**

```tsx
/*
  Material-era grain: one subtle multiply pass at 3% over bone.
  Kept minimal — Material wants crisp surfaces. Remove entirely
  if it reads heavy during validation.
*/
export function GrainOverlay() {
  const tile =
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{
        opacity: 0.03,
        backgroundImage: tile,
        backgroundSize: "180px 180px",
        mixBlendMode: "multiply",
      }}
    />
  );
}
```

**Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: same pre-existing errors (deleted-component imports); no NEW errors.

**Step 3: Commit**

```bash
git add components/GrainOverlay.tsx
git commit -m "grain: single 3% multiply pass"
```

### Task A7: Rewrite `components/Reveal.tsx` (gentler motion)

**Files:**
- Modify: `components/Reveal.tsx`

**Step 1: Replace content**

```tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/*
  Gentler scroll-in than the editorial build:
  24px rise, 800ms, easing [0.16, 1, 0.3, 1].
  Fires once, triggered 80px before element enters view.
*/
export function Reveal({ children, delay = 0, y = 24, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add components/Reveal.tsx
git commit -m "motion: gentler reveal (800ms, softer ease)"
```

### Task A8: Create `components/Container.tsx`

**Files:**
- Create: `components/Container.tsx`

**Step 1: Write**

```tsx
import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
};

/*
  Single source of truth for horizontal rhythm. 24px mobile / 48px desktop
  padding, 1320px max content width. Every section wrapper uses this
  so we stop repeating the same px-6 md:px-12 incantation across files.
*/
export function Container({ children, className, as: Tag = "div" }: Props) {
  return (
    <Tag className={clsx("mx-auto w-full max-w-[1320px] px-6 md:px-12", className)}>
      {children}
    </Tag>
  );
}
```

**Step 2: Commit**

```bash
git add components/Container.tsx
git commit -m "primitive: Container component for grid discipline"
```

---

## Phase B — Primitives (11 tasks)

### Task B1: `components/ChapterChip.tsx`

**Files:**
- Create: `components/ChapterChip.tsx`

**Step 1: Write**

```tsx
import type { ChapterKey } from "@/content/divisions";
import clsx from "clsx";

type Props = {
  chapter: ChapterKey;
  variant?: "edge" | "dot";
  className?: string;
};

const CHAPTER_VAR: Record<ChapterKey, string> = {
  strategy: "var(--color-ch-strategy)",
  healthcare: "var(--color-ch-healthcare)",
  homehealth: "var(--color-ch-homehealth)",
  talent: "var(--color-ch-talent)",
  hr: "var(--color-ch-hr)",
  ai: "var(--color-ch-ai)",
};

/*
  "edge" = 4px left-edge bar (used on cards).
  "dot"  = small inline 10px dot (used inline near text).
  Consumers position and size the wrapper; this component only renders the mark.
*/
export function ChapterChip({ chapter, variant = "edge", className }: Props) {
  const color = CHAPTER_VAR[chapter];
  if (variant === "dot") {
    return (
      <span
        aria-hidden="true"
        className={clsx("inline-block h-[10px] w-[10px] rounded-full", className)}
        style={{ background: color }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={clsx("absolute left-0 top-0 h-full w-[4px] rounded-l-[14px]", className)}
      style={{ background: color }}
    />
  );
}

export function chapterColor(chapter: ChapterKey) {
  return CHAPTER_VAR[chapter];
}
```

**Step 2: Type-check**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add components/ChapterChip.tsx
git commit -m "primitive: ChapterChip (edge + dot variants)"
```

### Task B2: `components/ChapterBand.tsx`

**Files:**
- Create: `components/ChapterBand.tsx`

**Step 1: Write**

```tsx
/*
  Homepage hero background: horizontal gradient across all 6 chapter hues
  at ~18% opacity. Sits behind the hero content.
*/
export function ChapterBand() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "linear-gradient(90deg, var(--color-ch-strategy) 0%, var(--color-ch-healthcare) 18%, var(--color-ch-homehealth) 36%, var(--color-ch-talent) 54%, var(--color-ch-hr) 72%, var(--color-ch-ai) 90%)",
        opacity: 0.18,
        filter: "blur(40px)",
      }}
    />
  );
}
```

**Step 2: Commit**

```bash
git add components/ChapterBand.tsx
git commit -m "primitive: ChapterBand gradient for homepage hero"
```

### Task B3: `components/ChapterWash.tsx`

**Files:**
- Create: `components/ChapterWash.tsx`

**Step 1: Write**

```tsx
import type { ChapterKey } from "@/content/divisions";
import { chapterColor } from "./ChapterChip";

type Props = {
  chapter: ChapterKey;
  intensity?: number;
};

/*
  Radial wash used on division detail page heroes.
  Washes the top ~40% of the section in the chapter color at low opacity.
*/
export function ChapterWash({ chapter, intensity = 0.22 }: Props) {
  const color = chapterColor(chapter);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] -z-10"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${color} 0%, transparent 65%)`,
        opacity: intensity,
      }}
    />
  );
}
```

**Step 2: Commit**

```bash
git add components/ChapterWash.tsx
git commit -m "primitive: ChapterWash radial gradient for division heroes"
```

### Task B4: Rewrite `components/CTAButton.tsx` (pill)

**Files:**
- Modify: `components/CTAButton.tsx`

**Step 1: Full replacement**

```tsx
import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkProps = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
  ariaBusy?: never;
};

type ButtonProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaBusy?: boolean;
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "cta cta-primary",
  secondary: "cta cta-secondary",
  ghost: "cta cta-ghost",
};

export function CTAButton(props: LinkProps | ButtonProps) {
  const { children, variant = "primary", className } = props;
  const classes = clsx(VARIANT_CLASS[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }
  const btn = props as ButtonProps;
  return (
    <button
      type={btn.type ?? "button"}
      onClick={btn.onClick}
      disabled={btn.disabled}
      aria-busy={btn.ariaBusy}
      className={classes}
      style={btn.disabled ? { opacity: 0.55, cursor: "not-allowed" } : undefined}
    >
      {children}
    </button>
  );
}
```

**Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add components/CTAButton.tsx
git commit -m "primitive: rewrite CTAButton as pill (primary/secondary/ghost)"
```

### Task B5: Rewrite `components/Nav.tsx` (no masthead)

**Files:**
- Modify: `components/Nav.tsx`

**Step 1: Full replacement**

```tsx
import Link from "next/link";
import { FIRM } from "@/lib/constants";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";

const LINKS = [
  { href: "/practice", label: "Practice" },
  { href: "/founder", label: "Founder" },
  { href: "/transmissions", label: "Transmissions" },
  { href: "/engagement", label: "Engagement" },
];

export function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--color-mist)] bg-[color:var(--color-bone)]/80 backdrop-blur"
    >
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 text-[color:var(--color-ink)]">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-ink)] font-sans text-[11px] font-medium"
          >
            CH
          </span>
          <span className="text-[17px] font-medium tracking-tight">{FIRM.name}</span>
        </Link>

        <ul className="hidden items-center gap-8 text-[14px] md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[color:var(--color-graphite)] transition-colors hover:text-[color:var(--color-ink)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <CTAButton href="/engagement" variant="primary">
          Begin engagement
        </CTAButton>
      </Container>
    </nav>
  );
}
```

**Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add components/Nav.tsx
git commit -m "primitive: rewrite Nav (no masthead, pill CTA)"
```

### Task B6: Rewrite `components/Footer.tsx`

**Files:**
- Modify: `components/Footer.tsx`

**Step 1: Full replacement**

```tsx
import { FIRM } from "@/lib/constants";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-mist)] py-12">
      <Container className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
        <div className="text-[15px] font-medium text-[color:var(--color-ink)]">
          {FIRM.legalName}
        </div>
        <div className="text-[13px] text-[color:var(--color-silt)] md:justify-self-center">
          {FIRM.location} · Est. {FIRM.founded}
        </div>
        <a
          href={FIRM.portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-[color:var(--color-silt)] transition-colors hover:text-[color:var(--color-ink)] md:justify-self-end"
        >
          colinhighland.com ↗
        </a>
      </Container>
    </footer>
  );
}
```

**Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add components/Footer.tsx
git commit -m "primitive: rewrite Footer (3-col, neutral)"
```

### Task B7: Rewrite `components/SectionHead.tsx`

**Files:**
- Modify: `components/SectionHead.tsx`

**Step 1: Full replacement**

```tsx
import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "start",
  className,
}: Props) {
  return (
    <div className={clsx("mb-12 md:mb-16", align === "center" && "text-center", className)}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="display-md">{title}</h2>
      {lead && (
        <p className={clsx("lead mt-6", align === "center" && "mx-auto")}>
          {lead}
        </p>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
npx tsc --noEmit
git add components/SectionHead.tsx
git commit -m "primitive: rewrite SectionHead (Material eyebrow + display)"
```

### Task B8: Rewrite `components/Hero.tsx` (two modes)

**Files:**
- Modify: `components/Hero.tsx`

**Step 1: Full replacement**

```tsx
import type { ReactNode } from "react";
import clsx from "clsx";
import type { ChapterKey } from "@/content/divisions";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";
import { ChapterBand } from "./ChapterBand";
import { ChapterWash } from "./ChapterWash";
import { Reveal } from "./Reveal";

type CtaSpec = { label: string; href: string };

type Props = {
  mode?: "homepage" | "page";
  chapter?: ChapterKey;
  eyebrow?: string;
  headline: ReactNode;
  lead?: ReactNode;
  primaryCta?: CtaSpec;
  secondaryCta?: CtaSpec;
  className?: string;
};

export function Hero({
  mode = "page",
  chapter,
  eyebrow,
  headline,
  lead,
  primaryCta,
  secondaryCta,
  className,
}: Props) {
  return (
    <section
      className={clsx(
        "relative overflow-hidden pt-[140px] pb-[96px] md:pt-[180px] md:pb-[120px]",
        className,
      )}
    >
      {mode === "homepage" && <ChapterBand />}
      {mode === "page" && chapter && <ChapterWash chapter={chapter} />}
      <Container>
        <Reveal delay={0.05}>
          {eyebrow && <div className="eyebrow mb-6">{eyebrow}</div>}
          <h1 className={mode === "homepage" ? "display-xl" : "display-lg"}>
            {headline}
          </h1>
          {lead && <p className="lead mt-8">{lead}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-wrap gap-4">
              {primaryCta && (
                <CTAButton href={primaryCta.href} variant="primary">
                  {primaryCta.label}
                </CTAButton>
              )}
              {secondaryCta && (
                <CTAButton href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </CTAButton>
              )}
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
```

**Step 2: Commit**

```bash
npx tsc --noEmit
git add components/Hero.tsx
git commit -m "primitive: rewrite Hero (homepage + page modes)"
```

### Task B9: Create `components/DivisionCard.tsx`

**Files:**
- Create: `components/DivisionCard.tsx`

**Step 1: Write**

```tsx
import Link from "next/link";
import type { Division } from "@/content/divisions";
import { ChapterChip } from "./ChapterChip";

type Props = {
  division: Division;
  totalCount: number;
};

export function DivisionCard({ division, totalCount }: Props) {
  const numLabel = `${division.number} / ${String(totalCount).padStart(2, "0")}`;
  return (
    <Link
      href={`/practice/${division.slug}`}
      className="card card-interactive group relative block overflow-hidden p-6 md:p-8"
    >
      <ChapterChip chapter={division.chapter} variant="edge" />
      <div className="mono-numeral mb-6">{numLabel}</div>
      <h3 className="display-sm mb-3">{division.name}</h3>
      <p className="prose-base mb-6 max-w-[48ch] text-[color:var(--color-silt)]">
        {division.positioning}
      </p>
      <span className="cta cta-ghost">Learn more</span>
    </Link>
  );
}
```

**Step 2: Commit**

```bash
npx tsc --noEmit
git add components/DivisionCard.tsx
git commit -m "primitive: DivisionCard with chapter chip + hover lift"
```

### Task B10: Create `StepFlow`, `PillRow`, `PullQuote`, `ServiceGrid`, `EngagementModelCard` in one commit

**Files:**
- Create: `components/StepFlow.tsx`
- Create: `components/PillRow.tsx`
- Create: `components/PullQuote.tsx`
- Create: `components/ServiceGrid.tsx`
- Create: `components/EngagementModelCard.tsx`

**Step 1: Write `components/StepFlow.tsx`**

```tsx
import { Reveal } from "./Reveal";

type Step = { n: string; label: string; dek: string };

type Props = {
  steps: Step[];
};

export function StepFlow({ steps }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      {steps.map((step, i) => (
        <Reveal key={step.n} delay={i * 0.1}>
          <div className="card p-6 md:p-8">
            <div className="mono-numeral mb-4">{step.n}</div>
            <div className="display-sm mb-3">{step.label}</div>
            <p className="prose-base text-[color:var(--color-silt)]">{step.dek}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
```

**Step 2: Write `components/PillRow.tsx`**

```tsx
type Props = {
  items: readonly string[] | string[];
  label?: string;
};

export function PillRow({ items, label }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
      {label && <div className="eyebrow shrink-0">{label}</div>}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="pill">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
```

**Step 3: Write `components/PullQuote.tsx`**

```tsx
import type { ChapterKey } from "@/content/divisions";
import { chapterColor } from "./ChapterChip";

type Props = {
  quote: string;
  attribution?: string;
  chapter?: ChapterKey;
};

export function PullQuote({ quote, attribution, chapter }: Props) {
  const color = chapter ? chapterColor(chapter) : "var(--color-ink)";
  return (
    <figure>
      <blockquote
        className="display-md italic"
        style={{ color, fontWeight: 400 }}
      >
        {`\u201C${quote}\u201D`}
      </blockquote>
      {attribution && (
        <figcaption className="eyebrow mt-6">{attribution}</figcaption>
      )}
    </figure>
  );
}
```

**Step 4: Write `components/ServiceGrid.tsx`**

```tsx
import { Reveal } from "./Reveal";

type Props = {
  services: readonly string[] | string[];
};

export function ServiceGrid({ services }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {services.map((service, i) => (
        <Reveal key={service} delay={i * 0.04}>
          <div className="card p-5 md:p-6">
            <div className="mono-numeral mb-3">
              {String(i + 1).padStart(2, "0")}
            </div>
            <p className="text-[17px] font-medium leading-snug text-[color:var(--color-ink)]">
              {service}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
```

**Step 5: Write `components/EngagementModelCard.tsx`**

```tsx
import clsx from "clsx";
import type { EngagementModel } from "@/content/divisions";

type Props = {
  model: EngagementModel | string;
  description: string;
  active?: boolean;
};

export function EngagementModelCard({ model, description, active = true }: Props) {
  return (
    <div
      className={clsx(
        "card p-6 md:p-7",
        !active && "opacity-50 grayscale",
      )}
    >
      <div className="eyebrow mb-3">Model</div>
      <div className="display-sm mb-3">{model}</div>
      <p className="prose-base text-[color:var(--color-silt)]">{description}</p>
    </div>
  );
}
```

**Step 6: Type-check + commit**

```bash
npx tsc --noEmit
git add components/StepFlow.tsx components/PillRow.tsx components/PullQuote.tsx components/ServiceGrid.tsx components/EngagementModelCard.tsx
git commit -m "primitives: StepFlow, PillRow, PullQuote, ServiceGrid, EngagementModelCard"
```

### Task B11: Rewrite `components/BriefForm.tsx`

**Files:**
- Modify: `components/BriefForm.tsx`

**Step 1: Full replacement** — keep the state machine + honeypot + Resend path; swap styling to new token classes and CTAButton pill; use `.field-line` + `.field-label` from globals.

```tsx
"use client";

import { useState } from "react";
import { CTAButton } from "./CTAButton";
import { DIVISIONS } from "@/content/divisions";

type Status = "idle" | "submitting" | "success" | "error";

const TIMELINES = ["Exploring", "Within 60 days", "Actively planning", "Urgent"] as const;

export function BriefForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = event.currentTarget;
    const fd = new FormData(form);

    if (fd.get("website")) {
      setStatus("success");
      return;
    }

    const payload = {
      name: fd.get("name"),
      organization: fd.get("organization"),
      role: fd.get("role"),
      email: fd.get("email"),
      division: fd.get("division"),
      timeline: fd.get("timeline"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Submission failed.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8">
        <div className="eyebrow mb-4">Received</div>
        <div className="display-sm mb-4">Your brief is received.</div>
        <p className="prose-base max-w-[56ch] text-[color:var(--color-silt)]">
          We respond to every submission within three business days. If
          there&apos;s a fit, we&apos;ll send a proposed scope within the week.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Organization" name="organization" required />
        <Field label="Role" name="role" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectField
          label="Division of interest"
          name="division"
          required
          options={[
            { value: "", label: "— choose a division" },
            ...DIVISIONS.map((d) => ({ value: d.slug, label: d.name })),
            { value: "not-sure", label: "Not sure yet" },
          ]}
        />
        <SelectField
          label="How soon"
          name="timeline"
          required
          options={[
            { value: "", label: "— choose a horizon" },
            ...TIMELINES.map((t) => ({ value: t, label: t })),
          ]}
        />
      </div>

      <div>
        <label className="block">
          <span className="field-label">
            What are you trying to decide, build, or fix?
          </span>
          <textarea
            name="message"
            required
            rows={6}
            className="field-line mt-3 resize-y leading-[1.55]"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <CTAButton
          variant="primary"
          type="submit"
          disabled={status === "submitting"}
          ariaBusy={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send brief →"}
        </CTAButton>
        {status === "error" && (
          <p className="text-[14px] text-[color:var(--color-ch-homehealth)]">{errorMsg}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}{required ? " *" : ""}</span>
      <input type={type} name={name} required={required} className="field-line mt-2" />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}{required ? " *" : ""}</span>
      <select name={name} required={required} defaultValue="" className="field-line mt-2">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
```

**Step 2: Commit**

```bash
npx tsc --noEmit
git add components/BriefForm.tsx
git commit -m "primitive: BriefForm rebuilt with pill CTA + field-line tokens"
```

---

## Phase C — Pages (8 tasks)

### Task C1: Rewrite `app/layout.tsx` — remove Masthead reference

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Remove `<Masthead />` from the `<body>`**

Find and delete the `<Masthead />` element. The layout should now render: `<GrainOverlay />`, `<Nav />`, `<main>{children}</main>`, `<Footer />`.

Also remove the `import { Masthead } from "@/components/Masthead";` line.

**Step 2: Verify type-check is now clean**

Run: `npx tsc --noEmit`
Expected: may still fail because pages import deleted components. That's expected until C2–C8.

**Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "layout: remove Masthead (no running editorial strip)"
```

### Task C2: Rewrite `app/page.tsx` (homepage)

**Files:**
- Modify: `app/page.tsx`

**Step 1: Full replacement**

```tsx
import { DIVISIONS } from "@/content/divisions";
import { FIRM, SECTORS } from "@/lib/constants";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHead } from "@/components/SectionHead";
import { DivisionCard } from "@/components/DivisionCard";
import { PillRow } from "@/components/PillRow";
import { PullQuote } from "@/components/PullQuote";
import { StepFlow } from "@/components/StepFlow";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";

const ENGAGEMENT_STEPS = [
  {
    n: "01",
    label: "You submit a brief",
    dek: "A short, structured conversation. No deck required.",
  },
  {
    n: "02",
    label: "We respond within three days",
    dek: "If there is a fit, we schedule a thirty-minute call.",
  },
  {
    n: "03",
    label: "We send a proposed scope",
    dek: "Within a week of the call, you have a scope in hand.",
  },
];

const POSITIONS = [
  {
    n: "01",
    role: "Clinician",
    text: "Doctor of Physical Therapy with frontline clinical experience.",
  },
  {
    n: "02",
    role: "Operator",
    text: "Certified Business Architect with multi-site leadership across home health and workforce systems.",
  },
  {
    n: "03",
    role: "AI Builder",
    text: "Production deployments across healthcare, government, hospitality, and home services.",
  },
];

export default function Home() {
  return (
    <>
      <Hero
        mode="homepage"
        eyebrow={`${FIRM.location} · Est. ${FIRM.founded}`}
        headline={
          <>
            Strategy, operations, and applied AI — from someone who has{" "}
            <em>actually done all three.</em>
          </>
        }
        lead="C Highland Advisory partners with leaders across healthcare, government, hospitality, and the industries that run them — translating frontline reality into operational systems and deploying artificial intelligence where it actually creates leverage."
        primaryCta={{ label: "Begin engagement", href: "/engagement" }}
        secondaryCta={{ label: "View practice", href: "/practice" }}
      />

      {/* Proof strip */}
      <section className="border-t border-[color:var(--color-mist)] py-12 md:py-16">
        <Container>
          <PillRow items={SECTORS} label="Working across" />
        </Container>
      </section>

      {/* The Practice */}
      <section className="py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="The Practice"
              title={<>Six disciplines. <em>One operating thesis.</em></>}
              lead="Each division stands alone — but each is informed by the same conviction: that the gap between frontline reality and executive decision-making is where most strategy quietly fails."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIVISIONS.map((division, i) => (
              <Reveal key={division.slug} delay={i * 0.06}>
                <DivisionCard division={division} totalCount={DIVISIONS.length} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The Founder */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="The Founder"
              title={<>A career built at the <em>intersection.</em></>}
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <PullQuote
                quote="The best work doesn't come from another framework. It comes from operators who can sit at the bedside, build the spreadsheet, and ship the AI system — and know which one the moment actually calls for."
                attribution={`— ${FIRM.founderFull} · Founder`}
              />
            </Reveal>
            <div className="space-y-4">
              {POSITIONS.map((p, i) => (
                <Reveal key={p.n} delay={0.1 + i * 0.08}>
                  <div className="card p-6 md:p-7">
                    <div className="mono-numeral mb-3">{p.n}</div>
                    <div className="display-sm mb-2">{p.role}</div>
                    <p className="prose-base text-[color:var(--color-silt)]">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* How engagements work */}
      <section className="py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="How engagements work"
              title={<>Three steps. <em>No deck required.</em></>}
              lead="Engagements begin with a brief — a short, structured conversation. From there, we scope."
            />
          </Reveal>
          <StepFlow steps={ENGAGEMENT_STEPS} />
        </Container>
      </section>

      {/* CTA footer block */}
      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-24 md:py-32">
        <Container className="text-center">
          <Reveal>
            <h2 className="display-lg mx-auto max-w-[22ch]">
              When the next decision has to{" "}
              <em>survive contact with reality.</em>
            </h2>
            <div className="mt-10 flex justify-center">
              <CTAButton href="/engagement" variant="primary">
                Begin engagement
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
```

**Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add app/page.tsx
git commit -m "page: rewrite homepage (6 sections, Material Chapter)"
```

### Task C3: Rewrite `app/practice/page.tsx`

**Files:**
- Modify: `app/practice/page.tsx`

**Step 1: Full replacement**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { DIVISIONS } from "@/content/divisions";
import { SECTORS } from "@/lib/constants";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { DivisionCard } from "@/components/DivisionCard";
import { PillRow } from "@/components/PillRow";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "A single firm. Six disciplines. One operating thesis — each division stands as its own practice area, unified by method rather than sector.",
};

export default function PracticePage() {
  return (
    <>
      <Hero
        headline={
          <>
            Six disciplines. <em>One operating thesis.</em>
          </>
        }
        lead="Each division below stands as its own practice area — with its own clients, engagement models, and deliverables. They are unified not by sector but by method: frontline reality, translated into operational systems, deployed with discipline."
      />

      <section className="pb-20 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {DIVISIONS.map((division, i) => (
              <Reveal key={division.slug} delay={i * 0.06}>
                <DivisionCard division={division} totalCount={DIVISIONS.length} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <PillRow items={SECTORS} label="Sectors served" />
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-24 md:py-28">
        <Container>
          <Reveal>
            <h2 className="display-lg max-w-[24ch]">
              Begin with a brief. From a brief, <em>a scope.</em>
            </h2>
            <div className="mt-10">
              <CTAButton href="/engagement" variant="primary">
                How we work
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
```

**Step 2: Commit**

```bash
npx tsc --noEmit
git add app/practice/page.tsx
git commit -m "page: rewrite practice overview (6 division cards)"
```

### Task C4: Rewrite `app/practice/[slug]/page.tsx`

**Files:**
- Modify: `app/practice/[slug]/page.tsx`

**Step 1: Full replacement**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DIVISIONS, getDivision } from "@/content/divisions";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHead } from "@/components/SectionHead";
import { ServiceGrid } from "@/components/ServiceGrid";
import { PillRow } from "@/components/PillRow";
import { EngagementModelCard } from "@/components/EngagementModelCard";
import { PullQuote } from "@/components/PullQuote";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";

type Params = { slug: string };

const ALL_MODELS = ["Retainer", "Project", "Embedded", "Build", "Advisory"] as const;

const MODEL_EXPLANATIONS: Record<string, string> = {
  Retainer: "Ongoing advisory with a monthly cadence, typically 3–12 months.",
  Project: "Scoped deliverable with a defined end date, typically 4–16 weeks.",
  Embedded: "On-site or near-site operational work, typically for operations-heavy engagements.",
  Build: "Deploy a working system, typically 6–16 weeks to production.",
  Advisory: "As-needed counsel without an ongoing retainer commitment.",
};

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) return {};
  return {
    title: division.name,
    description: division.shortDescription,
  };
}

export default async function DivisionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) notFound();

  return (
    <div data-chapter={division.chapter}>
      <Hero
        mode="page"
        chapter={division.chapter}
        eyebrow={`${division.number} / 06 · The Practice`}
        headline={division.name}
        lead={division.positioning}
      />

      {/* What we do */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="What we do"
              title={<>Services in this <em>practice.</em></>}
            />
          </Reveal>
          <ServiceGrid services={division.services} />
        </Container>
      </section>

      {/* Who we serve */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <PillRow items={division.sectors} label="Who we serve" />
        </Container>
      </section>

      {/* Engagement models */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Engagement models"
              title={<>How we <em>enter.</em></>}
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ALL_MODELS.map((model, i) => (
              <Reveal key={model} delay={i * 0.04}>
                <EngagementModelCard
                  model={model}
                  description={MODEL_EXPLANATIONS[model]}
                  active={(division.engagementModels as readonly string[]).includes(model)}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Thesis */}
      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-24 md:py-28">
        <Container>
          <Reveal>
            <div className="eyebrow mb-6">The thesis</div>
            <PullQuote quote={division.thesis} chapter={division.chapter} />
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="display-md max-w-[22ch]">
              Ready to discuss{" "}
              <em>{division.shortName ?? division.name}</em>?
            </h2>
            <CTAButton href="/engagement" variant="primary">
              Begin engagement
            </CTAButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
```

**Step 2: Commit**

```bash
npx tsc --noEmit
git add app/practice/\[slug\]/page.tsx
git commit -m "page: rewrite division detail with ChapterWash + cards"
```

### Task C5: Rewrite `app/founder/page.tsx`

**Files:**
- Modify: `app/founder/page.tsx`

**Step 1: Full replacement**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { FIRM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Founder",
  description:
    "Colin Highland, PT, DPT, CBA — founder of C Highland Advisory. A career built at the intersection of clinical care, operational leadership, and applied artificial intelligence.",
};

const CHAPTERS = [
  {
    n: "01",
    label: "Clinician",
    chapterKey: "healthcare" as const,
    body: "Doctor of Physical Therapy with frontline clinical experience. The work of bedside care trains a kind of pattern recognition no MBA curriculum replicates — the gap between what the chart records and what actually happened, the systems that exist to protect patients versus the ones that exist to protect the institution.",
  },
  {
    n: "02",
    label: "Operator",
    chapterKey: "homehealth" as const,
    body: "Certified Business Architect with multi-site leadership across home health and workforce systems. Operating teaches what clinical training cannot: the daily reconciliation between margin and mission, intake speed and clinical judgment, growth targets and retention curves.",
  },
  {
    n: "03",
    label: "AI Builder",
    chapterKey: "ai" as const,
    body: "Production deployments across healthcare, government, hospitality, home services, and political operations. Voice AI at scale. Workflow automation inside regulated environments. Modular prompting architectures that survive model upgrades and guardrail shifts.",
  },
];

const COLOPHON = [
  {
    label: "Credentials",
    items: [
      "Doctor of Physical Therapy (DPT)",
      "Certified Business Architect (CBA)",
      "Licensed Physical Therapist (PT)",
    ],
  },
  { label: "Based", items: [FIRM.location] },
  { label: "Also at", items: ["colinhighland.com — writing, portfolio, editorial"] },
  { label: "Speaking", items: ["— forthcoming"], muted: true },
  { label: "Publications", items: ["— forthcoming"], muted: true },
];

export default function FounderPage() {
  return (
    <>
      <Hero
        eyebrow="The Founder"
        headline={
          <>
            A career built at the <em>intersection.</em>
          </>
        }
        lead="Colin Highland is the founder of C Highland Advisory. His work sits where three disciplines meet — bedside clinical care, operational leadership, and applied artificial intelligence — because he has spent his career doing all three."
      />

      {/* Three chapters alternating */}
      {CHAPTERS.map((ch, idx) => (
        <section
          key={ch.n}
          className="border-t border-[color:var(--color-mist)] py-20 md:py-24"
        >
          <Container>
            <div
              className={`grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 ${
                idx % 2 === 1 ? "md:[&>:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div
                  className="card h-full min-h-[280px] overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, var(--color-ch-${ch.chapterKey}) 0%, var(--color-paper) 120%)`,
                    opacity: 0.92,
                  }}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <div>
                  <div className="mono-numeral mb-4">{ch.n}</div>
                  <h2 className="display-md mb-6">{ch.label}</h2>
                  <p className="prose-base max-w-[58ch] text-[color:var(--color-silt)]">
                    {ch.body}
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ))}

      {/* Colophon */}
      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead eyebrow="Colophon" title="The record." />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COLOPHON.map((group) => (
              <div key={group.label} className="card p-6">
                <div className="eyebrow mb-3">{group.label}</div>
                <ul
                  className="space-y-1.5 text-[15px] leading-snug"
                  style={{
                    color: group.muted
                      ? "var(--color-silt)"
                      : "var(--color-graphite)",
                  }}
                >
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href={FIRM.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta cta-ghost"
            >
              For writing, portfolio, and editorial, see colinhighland.com ↗
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
```

**Step 2: Commit**

```bash
npx tsc --noEmit
git add app/founder/page.tsx
git commit -m "page: rewrite founder (three chapters + Material colophon)"
```

### Task C6: Rewrite `app/engagement/page.tsx`

**Files:**
- Modify: `app/engagement/page.tsx`

**Step 1: Full replacement**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHead } from "@/components/SectionHead";
import { StepFlow } from "@/components/StepFlow";
import { EngagementModelCard } from "@/components/EngagementModelCard";
import { BriefForm } from "@/components/BriefForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Engagement",
  description:
    "How we work with C Highland Advisory. Retainer, project, embedded, and build engagements — beginning with a short structured brief.",
};

const MODELS = [
  {
    label: "Retainer",
    body: "Ongoing advisory with a monthly cadence, typically 3–12 months.",
  },
  {
    label: "Project",
    body: "Scoped deliverable with a defined end date, typically 4–16 weeks.",
  },
  {
    label: "Embedded",
    body: "On-site or near-site operational work for operations-heavy engagements.",
  },
  {
    label: "Build",
    body: "Deploy a working system, typically 6–16 weeks to production.",
  },
];

const STEPS = [
  {
    n: "01",
    label: "You submit a brief",
    dek: "A short, structured conversation. No deck required.",
  },
  {
    n: "02",
    label: "We respond within three days",
    dek: "If there is a fit, we schedule a thirty-minute call.",
  },
  {
    n: "03",
    label: "We send a proposed scope",
    dek: "Within a week of the call, you have a scope in hand.",
  },
];

export default function EngagementPage() {
  return (
    <>
      <Hero
        eyebrow="Engagement"
        headline={<>How <em>we work.</em></>}
        lead="Engagements begin with a brief — a short, structured conversation to understand what you are trying to decide, build, or fix. From there, we scope."
      />

      {/* Four models */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Engagement models"
              title={<>Four models. <em>One method.</em></>}
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MODELS.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.06}>
                <EngagementModelCard model={m.label} description={m.body} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The brief + form */}
      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <Reveal>
              <SectionHead
                eyebrow="The brief"
                title={<>Thirty minutes. <em>No deck required.</em></>}
                lead="We will ask what you are trying to decide, what has and has not worked, and what success looks like. We will tell you whether we are the right firm — and if we are not, we will tell you who might be."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <BriefForm />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What happens next */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="What happens next"
              title={<>Three steps. <em>Nothing theatrical.</em></>}
            />
          </Reveal>
          <StepFlow steps={STEPS} />
        </Container>
      </section>
    </>
  );
}
```

**Step 2: Commit**

```bash
npx tsc --noEmit
git add app/engagement/page.tsx
git commit -m "page: rewrite engagement (4-model grid + inline form)"
```

### Task C7: Rewrite `app/transmissions/page.tsx`

**Files:**
- Modify: `app/transmissions/page.tsx`

**Step 1: Full replacement**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";
import { FIRM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Transmissions",
  description:
    "Essays, frameworks, and field notes from across the six disciplines of C Highland Advisory. Inaugural issue forthcoming.",
};

export default function TransmissionsPage() {
  return (
    <>
      <Hero
        eyebrow="Transmissions"
        headline={<>Writing from the <em>practice.</em></>}
        lead="Essays, frameworks, and field notes from across the six divisions. The inaugural dispatch is forthcoming."
      />

      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <div className="card mx-auto max-w-[720px] p-8 md:p-12">
              <div className="eyebrow mb-4">Inaugural dispatch</div>
              <h2 className="display-md mb-6">Forthcoming.</h2>
              <p className="prose-base mb-8 text-[color:var(--color-silt)]">
                Writing from the firm doesn&apos;t aim to publish on a calendar —
                it publishes when there is something operator-grade to say. Until
                then, personal writing lives at colinhighland.com.
              </p>
              <form
                action="/api/subscribe"
                method="post"
                className="flex flex-col gap-4 sm:flex-row"
              >
                <label className="flex-1">
                  <span className="sr-only">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@organization.com"
                    className="field-line"
                  />
                </label>
                <button type="submit" className="cta cta-primary">
                  Add me to the list
                </button>
              </form>
              <div className="mt-8">
                <Link
                  href={FIRM.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta cta-ghost"
                >
                  Visit colinhighland.com
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
```

**Step 2: Commit**

```bash
npx tsc --noEmit
git add app/transmissions/page.tsx
git commit -m "page: rewrite transmissions (single card + subscribe)"
```

### Task C8: Rewrite `app/not-found.tsx`

**Files:**
- Modify: `app/not-found.tsx`

**Step 1: Full replacement**

```tsx
import { Container } from "@/components/Container";
import { CTAButton } from "@/components/CTAButton";

export default function NotFound() {
  return (
    <section className="pt-[160px] pb-[100px] md:pt-[200px] md:pb-[140px]">
      <Container>
        <div className="eyebrow mb-6">Not found</div>
        <h1 className="display-lg max-w-[18ch]">
          This page is not in the <em>ledger.</em>
        </h1>
        <p className="lead mt-8">
          It may have moved, or it may never have existed. The practice is still
          the right next step.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <CTAButton href="/" variant="secondary">
            Home
          </CTAButton>
          <CTAButton href="/practice" variant="primary">
            View practice
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
```

**Step 2: Commit**

```bash
npx tsc --noEmit
git add app/not-found.tsx
git commit -m "page: rewrite 404"
```

---

## Phase D — Data + OpenGraph (2 tasks)

### Task D1: Update `app/opengraph-image.tsx` to new palette

**Files:**
- Modify: `app/opengraph-image.tsx`

**Step 1: Swap Fraunces references + hunter green to Material tokens**

Full replacement:

```tsx
import { ImageResponse } from "next/og";
import { FIRM } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${FIRM.name} — ${FIRM.discipline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F7F5F1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "sans-serif",
          color: "#0F0F10",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 9999,
              border: "2px solid #0F0F10",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            CH
          </div>
          <div style={{ fontSize: 28, fontWeight: 500 }}>{FIRM.name}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 86,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            Strategy, operations, and applied AI — from someone who has actually done all three.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 15,
            color: "#6B6B6E",
          }}
        >
          <span>{FIRM.location} · Est. {FIRM.founded}</span>
          <span>chighlandadvisory.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
```

**Step 2: Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "og: repaint OpenGraph card in Material palette"
```

### Task D2: Full validation pass

**Files:**
- None (verification only)

**Step 1: Type-check clean**

Run: `npx tsc --noEmit`
Expected: zero errors.

**Step 2: Dev server up, all 5 routes 200**

Restart the preview server (it's on port 3005 already — refresh via preview_eval with window.location.href changes for each route, or use fetch in eval).

Expected: `/`, `/practice`, `/practice/ai-practice`, `/founder`, `/engagement`, `/transmissions`, `/not-existing-route` all compile and respond.

**Step 3: Console clean on each page**

Use `preview_console_logs level=error` — expected empty on every route.

**Step 4: Commit any needed fixes + a checkpoint commit**

```bash
git add -A
git commit --allow-empty -m "checkpoint: Phase A–D complete"
```

---

## Phase E — Panel review + synthesis + loop

### Task E1: Dispatch the panel (5 specialist agents in parallel)

Spawn agents in parallel — same 5 axes as the earlier redesign loop:
1. Typography + hierarchy
2. Layout + grid + spacing + card rhythm (12-col discipline, breakpoint 900px, padding values)
3. Color + chapter-system coherence (is the 6-hue system balanced? does chapter wash earn its presence? too-much / too-little accent?)
4. Motion + interaction (card lift, hover shadow bump, scroll-in restraint, reveal staggers)
5. Editorial/precedent — does this read as Google/Material-modern or drift toward generic SaaS template?

Each agent reads:
- `docs/plans/2026-04-19-material-chapter-redesign-design.md`
- all `components/*.tsx` and `app/**/page.tsx`

Each returns a prioritized issue list with file-line citations. Use the same prompt format as the prior redesign loop; adapt the constraints section to reference Material Chapter tokens and the non-primary palette.

### Task E2: Dispatch synthesis master

One consolidated agent reads all 5 specialist reports. Produces a single prioritized implementation plan with root-cause themes, phased fix list (A: tokens/globals, B: components, C: pages, D: motion), explicit skips, and confirmation of elevation move.

### Task E3: Implement synthesis plan

Apply fixes task-by-task. One commit per logical group. After all fixes land: type-check clean, console clean, preview screenshots across `/`, `/practice`, a chapter page like `/practice/ai-practice`, `/founder`, `/engagement`, `/transmissions`.

### Task E4: Push + Vercel preview

```bash
git push -u origin material-chapter-redesign
```

Vercel will auto-deploy a preview of the branch. Share the URL with Colin.

### Task E5: Loop

Repeat E1–E4 until the panel returns STABLE (zero proposed changes) AND Colin approves. Only then:

```bash
git checkout main
git merge --no-ff material-chapter-redesign
git push origin main
```

---

## Guardrails (pinned)

- No inline `<style>` blocks in any component — globals.css owns all shared treatments.
- No cowboy `style={{ color: "#abc" }}` — always reference a token via `var(--color-*)`.
- Every page screenshot-verified at 1440px + 375px before claiming a task complete.
- Type-check clean + zero console errors is table stakes per commit.
- Commit per logical change, not per file dump.
