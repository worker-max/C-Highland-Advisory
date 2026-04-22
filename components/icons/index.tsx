/*
  The icon family — 20 circuit marks.
  Grammar: 64×32 viewBox, 1.5 stroke, round caps/joins, fill none.
  Every icon is composed from four stroke/fill roles:
    data-role="base"     — graphite infrastructure line
    data-role="draft"    — dashed baseline (via globals.css)
    data-role="accent"   — the chapter-colored "signal" trace (stroke-draws on hover)
    data-role="dot"      — pulsing node (filled, opacity cycle in globals.css)
    data-role="dot-ring" — hollow pulsing node (for timeline/current-state marks)
  Hand-drafted tell: each icon has one coordinate sitting 0.5px off the strict grid.
  CSS animation + color scoping lives in app/globals.css — keep behaviour here stateless.
*/

import type { SVGProps } from "react";
import clsx from "clsx";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string;
};

function Base({ size = 64, title, className, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 32"
      width={size}
      height={(size * 32) / 64}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      className={clsx("ico", className)}
      {...rest}
    >
      {children}
    </svg>
  );
}

/* 01 — CH monogram (used in nav). Dashed draft C + solid accent C; H + forward-pin trace. */
export function CHMonogram(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "C Highland Advisory"}>
      <path data-role="draft" d="M 20 8 A 8 8 0 0 0 20 24" />
      <path data-role="accent" d="M 20 8 A 8 8 0 0 0 20 24" />
      <line data-role="base" x1="32" y1="8" x2="32" y2="24" />
      <line data-role="base" x1="44" y1="8" x2="44" y2="24" />
      <line data-role="base" x1="32" y1="16" x2="44" y2="16" />
      <line data-role="draft" x1="26" y1="16" x2="32" y2="16" />
      <line data-role="accent" x1="44" y1="16" x2="58" y2="16" />
      <polyline data-role="accent" points="54,12 58,16 54,20" />
      <circle data-role="dot" cx="28.5" cy="16" r="1.75" />
    </Base>
  );
}

/* 02 — Practice: vertical trunk with six outgoing stubs. Middle stub pulses. */
export function PracticeIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Practice"}>
      <line data-role="base" x1="12" y1="4" x2="12" y2="28" />
      {[6, 11, 16, 18, 22, 26].map((y, i) => (
        <line
          key={i}
          data-role={i === 2 ? "accent" : "base"}
          x1="12"
          y1={y}
          x2={i === 2 ? 50 : 22 + i * 3}
          y2={y}
        />
      ))}
      <circle data-role="dot" cx="50" cy="16.5" r="1.75" />
    </Base>
  );
}

/* 03 — Founder: three converging traces meeting at a single pulsing node. */
export function FounderIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Founder"}>
      <line data-role="base" x1="6"  y1="6"  x2="30" y2="16" />
      <line data-role="base" x1="6"  y1="16" x2="30" y2="16" />
      <line data-role="base" x1="6"  y1="26" x2="30" y2="16" />
      <line data-role="accent" x1="30" y1="16" x2="58" y2="16" />
      <circle data-role="dot" cx="30.5" cy="16" r="2" />
    </Base>
  );
}

/* 04 — Transmissions: pen-nib triangle + dashed ink trail + escape pulse. */
export function TransmissionsIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Transmissions"}>
      <polyline data-role="base" points="4,28 14,18 10,28 4,28" />
      <line data-role="base" x1="14" y1="18" x2="20" y2="12" />
      <line data-role="draft" x1="22" y1="12" x2="42" y2="12" />
      <line data-role="accent" x1="44" y1="12" x2="58" y2="6" />
      <circle data-role="dot" cx="58" cy="6" r="1.75" />
    </Base>
  );
}

/* 05 — Engagement: one input branches into four model terminals. */
export function EngagementIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Engagement"}>
      <line data-role="base" x1="4" y1="16" x2="20" y2="16" />
      <line data-role="base" x1="20" y1="16" x2="38" y2="6" />
      <line data-role="base" x1="20" y1="16" x2="38" y2="13" />
      <line data-role="base" x1="20" y1="16" x2="38" y2="19" />
      <line data-role="accent" x1="20" y1="16" x2="38" y2="26" />
      <circle data-role="dot" cx="38" cy="6"  r="1.25" data-delay="1" />
      <circle data-role="dot" cx="38" cy="13" r="1.25" data-delay="2" />
      <circle data-role="dot" cx="38" cy="19" r="1.25" data-delay="3" />
      <circle data-role="dot" cx="38" cy="26.5" r="1.75" />
      <line data-role="base" x1="38" y1="6"  x2="58" y2="6" />
      <line data-role="base" x1="38" y1="13" x2="58" y2="13" />
      <line data-role="base" x1="38" y1="19" x2="58" y2="19" />
      <line data-role="accent" x1="38" y1="26" x2="58" y2="26" />
    </Base>
  );
}

/* 06 — Contact: envelope built from traces, pulse escapes upper-right. */
export function ContactIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Contact"}>
      <rect data-role="base" x="6" y="8" width="36" height="18" rx="1" />
      <polyline data-role="base" points="6,8 24,20 42,8" />
      <line data-role="accent" x1="42" y1="8" x2="58" y2="4" />
      <circle data-role="dot" cx="58" cy="4" r="1.75" />
    </Base>
  );
}

/* 07 — Strategy mark: connective trunk with six stubs (the connective-tissue thesis). */
export function StrategyMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Strategy & Advisory"}>
      <line data-role="base" x1="6" y1="16" x2="58" y2="16" />
      {[12, 22, 32, 42, 52].map((x, i) => (
        <line
          key={i}
          data-role="base"
          x1={x}
          y1={i % 2 === 0 ? 8 : 24}
          x2={x}
          y2={16}
        />
      ))}
      <line data-role="accent" x1="6" y1="16" x2="58" y2="16" />
      <circle data-role="dot" cx="32.5" cy="16" r="1.75" />
    </Base>
  );
}

/* 08 — Healthcare: stepped ECG line crossing into an operational trace. */
export function HealthcareMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Healthcare Strategy"}>
      <line data-role="draft" x1="4" y1="20" x2="16" y2="20" />
      <polyline data-role="base" points="16,20 20,20 22,12 26,28 30,20 58,20" />
      <line data-role="accent" x1="22" y1="4" x2="22" y2="28" />
      <circle data-role="dot" cx="22" cy="12.5" r="1.75" />
    </Base>
  );
}

/* 09 — Home Health Operations: dwelling + intake (dashed) + outcome (accent) escape. */
export function HomeHealthMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Home Health Operations"}>
      <line data-role="draft" x1="2" y1="24" x2="18" y2="24" />
      <path data-role="base" d="M 20 16 L 32 6 L 44 16" />
      <line data-role="base" x1="20" y1="16" x2="20" y2="28" />
      <line data-role="base" x1="44" y1="16" x2="44" y2="28" />
      <line data-role="base" x1="20" y1="28" x2="44" y2="28" />
      <circle data-role="base" cx="32.5" cy="22" r="1" />
      <polyline data-role="accent" points="44,20 56,20 62,10" />
      <circle data-role="dot" cx="62" cy="10" r="1.75" />
    </Base>
  );
}

/* 10 — Talent Acquisition: four pipeline stages, one active/pulsing. */
export function TalentMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Talent Acquisition"}>
      <line data-role="draft" x1="4" y1="16" x2="12" y2="16" />
      <line data-role="base" x1="12" y1="12" x2="12" y2="20" />
      <line data-role="base" x1="12" y1="16" x2="24" y2="16" />
      <line data-role="base" x1="24" y1="14" x2="24" y2="18" />
      <line data-role="base" x1="24" y1="16" x2="36" y2="16" />
      <line data-role="accent" x1="36" y1="10" x2="36" y2="22" />
      <line data-role="accent" x1="36" y1="16" x2="54" y2="16" />
      <circle data-role="dot-ring" cx="12" cy="16" r="1.5" data-delay="1" />
      <circle data-role="dot-ring" cx="24" cy="16" r="1.5" data-delay="2" />
      <circle data-role="dot" cx="36" cy="16.5" r="2" />
      <polyline data-role="accent" points="50,12 54,16 50,20" />
    </Base>
  );
}

/* 11 — Operational HR & Engagement: concentric cadence arcs, centre pulses. */
export function OpHRMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Operational HR"}>
      <path data-role="draft" d="M 42 16 A 10 10 0 0 1 22 16" />
      <path data-role="base"  d="M 40 16 A 8 8 0 0 1 24 16" />
      <path data-role="base"  d="M 38 16 A 6 6 0 0 1 26 16" />
      <path data-role="accent" d="M 36 16 A 4 4 0 0 1 28 16" />
      <circle data-role="dot" cx="32" cy="16.5" r="1.75" />
      <line data-role="base" x1="46" y1="16" x2="58" y2="16" />
      <line data-role="draft" x1="6" y1="16" x2="18" y2="16" />
    </Base>
  );
}

/* 12 — AI Practice: branching recursion — output loops back as input. */
export function AIPracticeMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "AI Practice"}>
      <line data-role="base" x1="6" y1="16" x2="26" y2="16" />
      <circle data-role="dot-ring" cx="28" cy="16.5" r="2" />
      <line data-role="base" x1="30" y1="16" x2="44" y2="16" />
      <path data-role="accent" d="M 44 16 L 54 16 L 54 6 L 16 6 L 16 14" />
      <polyline data-role="accent" points="13,11 16,14 19,11" />
      <circle data-role="dot" cx="44" cy="16" r="1.25" data-delay="1" />
    </Base>
  );
}

/* 13 — Contingent Workforce: roster stack — dashed bench + solid active. */
export function ContingentWorkforceIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Contingent Workforce"}>
      <line data-role="draft" x1="6" y1="8"  x2="58" y2="8" />
      <line data-role="base"  x1="6" y1="14" x2="58" y2="14" />
      <line data-role="accent" x1="6" y1="20" x2="58" y2="20" />
      <line data-role="draft" x1="6" y1="26" x2="58" y2="26" />
      <circle data-role="dot-ring" cx="18" cy="8"  r="1.5" data-delay="1" />
      <circle data-role="dot"      cx="32" cy="14" r="1.75" />
      <circle data-role="dot"      cx="46" cy="20.5" r="1.75" data-delay="2" />
      <circle data-role="dot-ring" cx="24" cy="26" r="1.5" data-delay="3" />
    </Base>
  );
}

/* 14 — Human + AI Teammate: two parallel tracks merging into a shared signal node. */
export function HumanAITeammateIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Human + AI Teammate"}>
      <line data-role="base"   x1="4" y1="10" x2="34" y2="10" />
      <line data-role="accent" x1="4" y1="22" x2="34" y2="22" />
      <path data-role="base"   d="M 34 10 Q 42 10 44 16" />
      <path data-role="accent" d="M 34 22 Q 42 22 44 16" />
      <line data-role="accent" x1="44" y1="16" x2="58" y2="16" />
      <circle data-role="dot-ring" cx="4"  cy="10" r="1.5" data-delay="1" />
      <circle data-role="dot-ring" cx="4"  cy="22" r="1.5" data-delay="2" />
      <circle data-role="dot" cx="44" cy="16.5" r="2" />
    </Base>
  );
}

/* 15 — Adoption: quarterly timeline with pulses that stagger — "still running" at Q4. */
export function AdoptionIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Adoption"}>
      <line data-role="base" x1="4" y1="20" x2="60" y2="20" />
      {[8, 22, 36, 50].map((x) => (
        <line key={x} data-role="base" x1={x} y1="22" x2={x} y2="26" />
      ))}
      <line data-role="accent" x1="4" y1="20" x2="60" y2="20" />
      <circle data-role="dot-ring" cx="8"  cy="20" r="1.5" data-delay="1" />
      <circle data-role="dot"      cx="22" cy="20" r="1.5" data-delay="2" />
      <circle data-role="dot"      cx="36" cy="20" r="1.5" data-delay="3" />
      <circle data-role="dot"      cx="50.5" cy="20" r="2" />
      <polyline data-role="accent" points="54,16 58,20 54,24" />
    </Base>
  );
}

/* 16 — Cross-Industry: three sector bands with a vertical trace crossing all. */
export function CrossIndustryIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Cross-Industry"}>
      <line data-role="base" x1="6" y1="8"  x2="58" y2="8" />
      <line data-role="base" x1="6" y1="16" x2="58" y2="16" />
      <line data-role="base" x1="6" y1="24" x2="58" y2="24" />
      <line data-role="accent" x1="32" y1="4" x2="32" y2="28" />
      <circle data-role="dot" cx="32.5" cy="16" r="2" />
      <circle data-role="dot-ring" cx="32" cy="8"  r="1.25" data-delay="1" />
      <circle data-role="dot-ring" cx="32" cy="24" r="1.25" data-delay="2" />
    </Base>
  );
}

/* 17 — Diagnostic: circular scope + center pulse + signal trail. */
export function DiagnosticIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Diagnostic"}>
      <circle data-role="base" cx="22" cy="16" r="10" />
      <line data-role="base" x1="22" y1="8"  x2="22" y2="24" />
      <line data-role="base" x1="12" y1="16" x2="32" y2="16" />
      <line data-role="accent" x1="32" y1="16" x2="58" y2="16" />
      <circle data-role="dot" cx="22.5" cy="16" r="2" />
      <circle data-role="dot-ring" cx="58" cy="16" r="1.5" />
    </Base>
  );
}

/* 18 — Audit: ruled ledger lines with one entry circled + pulsed. */
export function AuditIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Audit"}>
      <line data-role="base" x1="6" y1="8"  x2="58" y2="8" />
      <line data-role="base" x1="6" y1="16" x2="58" y2="16" />
      <line data-role="draft" x1="6" y1="24" x2="58" y2="24" />
      <circle data-role="accent" cx="38" cy="16" r="4" />
      <circle data-role="dot" cx="38.5" cy="16" r="1.5" />
      <line data-role="accent" x1="44" y1="16" x2="58" y2="16" />
    </Base>
  );
}

/* 19 — Thesis: opening quote stylized as a pull-out signal. */
export function ThesisIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Thesis"}>
      <path data-role="base" d="M 10 8 Q 6 8 6 12 L 6 18 L 14 18 L 14 12 Q 14 8 10 8" />
      <path data-role="base" d="M 22 8 Q 18 8 18 12 L 18 18 L 26 18 L 26 12 Q 26 8 22 8" />
      <line data-role="accent" x1="28" y1="14" x2="58" y2="14" />
      <circle data-role="dot" cx="58" cy="14.5" r="1.75" />
    </Base>
  );
}

/* 20 — Timeline: horizontal trace, six nodes, one hollow-pulsing ("current"). */
export function TimelineIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Timeline"}>
      <line data-role="base" x1="4" y1="16" x2="60" y2="16" />
      {[8, 18, 28, 38, 48, 58].map((x, i) => (
        <circle
          key={x}
          data-role={i === 4 ? "dot-ring" : "base"}
          cx={i === 4 ? x : x}
          cy={i === 4 ? 16.5 : 16}
          r={i === 4 ? 2.5 : 1.25}
          fill={i === 4 ? undefined : "currentColor"}
          stroke={i === 4 ? undefined : "none"}
        />
      ))}
    </Base>
  );
}

/* Lookup table keyed by ChapterKey for convenient consumption from DivisionCard etc. */
import type { ChapterKey } from "@/content/divisions";

export const CHAPTER_ICONS: Record<ChapterKey, (p: IconProps) => React.JSX.Element> = {
  strategy: StrategyMark,
  healthcare: HealthcareMark,
  homehealth: HomeHealthMark,
  talent: TalentMark,
  hr: OpHRMark,
  ai: AIPracticeMark,
};
