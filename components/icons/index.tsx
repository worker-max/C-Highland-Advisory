/*
  The icon family — 20 operational-schematic marks.

  Grammar (shared with Emblem.tsx):
   * 64x32 viewBox, 1.5 stroke, round caps/joins, fill none
   * Every icon is composed from four stroke/fill roles:
       data-role="base"     — graphite infrastructure line (pipes, bodies)
       data-role="draft"    — dashed baseline (intake / planned path)
       data-role="accent"   — chapter-colored signal / outcome trace (stroke-draws on hover)
       data-role="dot"      — pulsing flow-node (filled, opacity cycle via globals.css)
       data-role="dot-ring" — hollow pulsing node (open / "current state")
   * Hand-drafted tell: one coordinate per icon sits 0.5px off the strict grid.
   * CSS animation + chapter color scoping live in app/globals.css.

  Motif family — "operations engineering schematics":
   Valves · gates · junctions · pipes · flow-arrows · manifolds · handles · gauges.
   NOT circuits (that's niallhighland.com's vocabulary — deliberate sibling distinction).
   NOT clinical literalism (would narrow audience). Pure process-flow diagrammatic.
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

/* ════ Nav + section glyphs ════ */

/* 01 — CH monogram as a gate-valve banner. */
export function CHMonogram(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "C Highland Advisory"}>
      {/* intake pipe */}
      <line data-role="draft" x1="2" y1="16" x2="14" y2="16" />
      {/* C: valve-seat arc */}
      <path data-role="base" d="M 18 8 A 8 8 0 0 0 18 24" />
      {/* H: twin pipes + shutoff crossbar + handle */}
      <line data-role="base" x1="28" y1="8" x2="28" y2="24" />
      <line data-role="base" x1="40" y1="8" x2="40" y2="24" />
      <line data-role="base" x1="28" y1="16" x2="40" y2="16" />
      <line data-role="base" x1="34" y1="12" x2="34" y2="20" />
      <circle data-role="base" cx="34" cy="10" r="1.5" />
      {/* accent outflow */}
      <line data-role="accent" x1="40" y1="16" x2="58" y2="16" />
      <polyline data-role="accent" points="54,12 58,16 54,20" />
      {/* pulsing flow-node at junction */}
      <circle data-role="dot" cx="28.5" cy="16" r="1.75" />
    </Base>
  );
}

/* 02 — Practice: manifold trunk feeding six outlet valves. */
export function PracticeIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Practice"}>
      {/* trunk */}
      <line data-role="base" x1="12" y1="4" x2="12" y2="28" />
      {/* six outlets with valve-handle caps */}
      {[5, 10, 15, 19, 23, 28].map((y, i) => {
        const isActive = i === 2;
        const x2 = isActive ? 52 : 22 + i * 2;
        return (
          <g key={i}>
            <line
              data-role={isActive ? "accent" : "base"}
              x1="12"
              y1={y}
              x2={x2}
              y2={y}
            />
            {/* each outlet ends with a small valve-cap circle */}
            <circle
              data-role={isActive ? "dot" : "base"}
              cx={x2}
              cy={isActive ? y + 0.5 : y}
              r={isActive ? 1.75 : 0.8}
            />
          </g>
        );
      })}
    </Base>
  );
}

/* 03 — Founder: three convergent intake pipes meeting at a shared outflow valve. */
export function FounderIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Founder"}>
      {/* three intake lines */}
      <line data-role="base" x1="4" y1="6" x2="28" y2="16" />
      <line data-role="base" x1="4" y1="16" x2="28" y2="16" />
      <line data-role="base" x1="4" y1="26" x2="28" y2="16" />
      {/* junction valve body */}
      <circle data-role="base" cx="30" cy="16" r="3" />
      {/* outflow */}
      <line data-role="accent" x1="33" y1="16" x2="58" y2="16" />
      {/* pulsing flow-node inside valve */}
      <circle data-role="dot" cx="30.5" cy="16" r="1.5" />
    </Base>
  );
}

/* 04 — Transmissions: pressure-gauge dial + dispatched signal trace. */
export function TransmissionsIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Transmissions"}>
      {/* gauge body */}
      <circle data-role="base" cx="14" cy="16" r="8" />
      {/* needle */}
      <line data-role="base" x1="14" y1="16" x2="19" y2="11" />
      <circle data-role="base" cx="14" cy="16" r="1" />
      {/* tick marks */}
      <line data-role="base" x1="14" y1="10" x2="14" y2="11.5" />
      <line data-role="base" x1="20" y1="16" x2="18.5" y2="16" />
      {/* dispatched signal — dashed draft then solid accent */}
      <line data-role="draft" x1="22" y1="16" x2="36" y2="16" />
      <line data-role="accent" x1="38" y1="16" x2="58" y2="8" />
      <circle data-role="dot" cx="58" cy="8" r="1.75" />
    </Base>
  );
}

/* 05 — Engagement: intake → scope-splitter → four terminal valves. */
export function EngagementIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Engagement"}>
      <line data-role="base" x1="4" y1="16" x2="20" y2="16" />
      <circle data-role="base" cx="22" cy="16" r="2" />
      <line data-role="base" x1="24" y1="16" x2="38" y2="6" />
      <line data-role="base" x1="24" y1="16" x2="38" y2="13" />
      <line data-role="base" x1="24" y1="16" x2="38" y2="19" />
      <line data-role="accent" x1="24" y1="16" x2="38" y2="26" />
      {/* terminal valve heads */}
      <circle data-role="base" cx="40" cy="6" r="1.25" />
      <circle data-role="base" cx="40" cy="13" r="1.25" />
      <circle data-role="base" cx="40" cy="19" r="1.25" />
      <circle data-role="dot" cx="40" cy="26.5" r="1.75" />
      {/* outlet pipes */}
      <line data-role="base" x1="41" y1="6" x2="58" y2="6" />
      <line data-role="base" x1="41" y1="13" x2="58" y2="13" />
      <line data-role="base" x1="41" y1="19" x2="58" y2="19" />
      <line data-role="accent" x1="41" y1="26" x2="58" y2="26" />
    </Base>
  );
}

/* 06 — Contact: pneumatic-tube envelope + sent pulse. */
export function ContactIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Contact"}>
      <rect data-role="base" x="6" y="10" width="30" height="14" rx="1" />
      <polyline data-role="base" points="6,10 21,20 36,10" />
      {/* send pipe out the top-right */}
      <line data-role="accent" x1="36" y1="10" x2="58" y2="4" />
      <circle data-role="dot" cx="58" cy="4" r="1.75" />
    </Base>
  );
}

/* ════ Six chapter marks — one per division ════ */

/* 07 — Strategy & Advisory: connective manifold trunk + outlets. */
export function StrategyMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Strategy & Advisory"}>
      <line data-role="base" x1="6" y1="16" x2="58" y2="16" />
      {/* handle-caps along the trunk */}
      {[14, 24, 34, 44].map((x, i) => (
        <g key={x}>
          <line
            data-role="base"
            x1={x}
            y1={i % 2 === 0 ? 8 : 24}
            x2={x}
            y2={16}
          />
          <circle
            data-role="base"
            cx={x}
            cy={i % 2 === 0 ? 8 : 24}
            r="1.25"
          />
        </g>
      ))}
      {/* overlay solid accent across the trunk */}
      <line data-role="accent" x1="6" y1="16" x2="58" y2="16" />
      <circle data-role="dot" cx="32.5" cy="16" r="1.75" />
    </Base>
  );
}

/* 08 — Healthcare Strategy: clinical pressure-gauge feeding operational pipe. */
export function HealthcareMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Healthcare Strategy"}>
      {/* gauge dial */}
      <circle data-role="base" cx="14" cy="16" r="8" />
      <line data-role="base" x1="14" y1="10" x2="14" y2="12" />
      <line data-role="base" x1="14" y1="20" x2="14" y2="22" />
      <line data-role="base" x1="8" y1="16" x2="10" y2="16" />
      <line data-role="base" x1="18" y1="16" x2="20" y2="16" />
      {/* needle angled past the green zone */}
      <line data-role="accent" x1="14" y1="16" x2="18.5" y2="11.5" />
      <circle data-role="dot" cx="14" cy="16" r="1.5" />
      {/* outflow */}
      <line data-role="draft" x1="22" y1="16" x2="36" y2="16" />
      <line data-role="accent" x1="38" y1="16" x2="58" y2="16" />
    </Base>
  );
}

/* 09 — Home Health Operations: dwelling + intake valve + outcome pipe. */
export function HomeHealthMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Home Health Operations"}>
      <line data-role="draft" x1="2" y1="24" x2="16" y2="24" />
      {/* intake valve head */}
      <circle data-role="base" cx="18" cy="24" r="1.5" />
      {/* dwelling */}
      <path data-role="base" d="M 20 16 L 32 6 L 44 16" />
      <line data-role="base" x1="20" y1="16" x2="20" y2="28" />
      <line data-role="base" x1="44" y1="16" x2="44" y2="28" />
      <line data-role="base" x1="20" y1="28" x2="44" y2="28" />
      {/* interior node — slightly off-grid hand-drafted tell */}
      <circle data-role="base" cx="32.5" cy="22" r="1" />
      {/* outcome pipe bending up-right */}
      <polyline data-role="accent" points="44,20 56,20 62,10" />
      <circle data-role="dot" cx="62" cy="10" r="1.75" />
    </Base>
  );
}

/* 10 — Talent Acquisition: funnel of four gates, one active/pulsing. */
export function TalentMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Talent Acquisition"}>
      <line data-role="draft" x1="4" y1="16" x2="10" y2="16" />
      {/* stage 1 gate */}
      <line data-role="base" x1="12" y1="10" x2="12" y2="22" />
      <circle data-role="dot-ring" cx="12" cy="16" r="1.25" data-delay="1" />
      {/* pipe */}
      <line data-role="base" x1="12" y1="16" x2="22" y2="16" />
      {/* stage 2 gate — narrowing */}
      <line data-role="base" x1="22" y1="12" x2="22" y2="20" />
      <circle data-role="dot-ring" cx="22" cy="16" r="1.25" data-delay="2" />
      <line data-role="base" x1="22" y1="16" x2="32" y2="16" />
      {/* stage 3 */}
      <line data-role="base" x1="32" y1="13" x2="32" y2="19" />
      <line data-role="base" x1="32" y1="16" x2="42" y2="16" />
      {/* stage 4 — active, pulsing + handle on top */}
      <line data-role="accent" x1="42" y1="9" x2="42" y2="23" />
      <line data-role="base" x1="42" y1="8" x2="42" y2="7" />
      <circle data-role="base" cx="42" cy="6" r="1.25" />
      <circle data-role="dot" cx="42" cy="16.5" r="2" />
      {/* outflow */}
      <line data-role="accent" x1="42" y1="16" x2="54" y2="16" />
      <polyline data-role="accent" points="50,12 54,16 50,20" />
    </Base>
  );
}

/* 11 — Operational HR: concentric pressure-rhythm manifold, centre pulses. */
export function OpHRMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Operational HR"}>
      {/* outer pressure ring */}
      <path data-role="draft" d="M 42 16 A 10 10 0 0 1 22 16" />
      <path data-role="base" d="M 40 16 A 8 8 0 0 1 24 16" />
      <path data-role="base" d="M 38 16 A 6 6 0 0 1 26 16" />
      <path data-role="accent" d="M 36 16 A 4 4 0 0 1 28 16" />
      <circle data-role="dot" cx="32" cy="16.5" r="1.75" />
      {/* outflow pipe */}
      <line data-role="base" x1="46" y1="16" x2="58" y2="16" />
      <line data-role="draft" x1="6" y1="16" x2="18" y2="16" />
      {/* small valve handle on top of outer arc */}
      <line data-role="base" x1="32" y1="5" x2="32" y2="8" />
      <circle data-role="base" cx="32" cy="4" r="1.25" />
    </Base>
  );
}

/* 12 — AI Practice: feedback-loop valve — output pipes back to input. */
export function AIPracticeMark(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "AI Practice"}>
      {/* input pipe */}
      <line data-role="base" x1="6" y1="16" x2="24" y2="16" />
      {/* valve body */}
      <circle data-role="dot-ring" cx="28" cy="16.5" r="2.5" />
      <line data-role="base" x1="28" y1="13" x2="28" y2="19" />
      {/* outflow */}
      <line data-role="base" x1="30" y1="16" x2="44" y2="16" />
      {/* recursion loop back up to input */}
      <path data-role="accent" d="M 44 16 L 54 16 L 54 6 L 14 6 L 14 14" />
      <polyline data-role="accent" points="11,11 14,14 17,11" />
      <circle data-role="dot" cx="44.5" cy="16" r="1.25" data-delay="1" />
    </Base>
  );
}

/* ════ Signature-skill marks (8) ════ */

/* 13 — Contingent workforce: stacked pipes, dashed bench + solid active. */
export function ContingentWorkforceIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Contingent Workforce"}>
      <line data-role="draft" x1="6" y1="8" x2="58" y2="8" />
      <line data-role="base" x1="6" y1="14" x2="58" y2="14" />
      <line data-role="accent" x1="6" y1="20" x2="58" y2="20" />
      <line data-role="draft" x1="6" y1="26" x2="58" y2="26" />
      {/* valve indicators on each line */}
      <circle data-role="dot-ring" cx="18" cy="8" r="1.5" data-delay="1" />
      <circle data-role="dot" cx="32" cy="14" r="1.75" />
      <circle data-role="dot" cx="46" cy="20.5" r="1.75" data-delay="2" />
      <circle data-role="dot-ring" cx="24" cy="26" r="1.5" data-delay="3" />
    </Base>
  );
}

/* 14 — Human + AI teammate: two intake pipes merging at a shared outflow valve. */
export function HumanAITeammateIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Human + AI Teammate"}>
      <line data-role="base" x1="4" y1="10" x2="34" y2="10" />
      <line data-role="accent" x1="4" y1="22" x2="34" y2="22" />
      <path data-role="base" d="M 34 10 Q 42 10 44 16" />
      <path data-role="accent" d="M 34 22 Q 42 22 44 16" />
      {/* merged outflow valve */}
      <circle data-role="base" cx="46" cy="16" r="2" />
      <line data-role="accent" x1="48" y1="16" x2="58" y2="16" />
      <circle data-role="dot-ring" cx="4" cy="10" r="1.5" data-delay="1" />
      <circle data-role="dot-ring" cx="4" cy="22" r="1.5" data-delay="2" />
      <circle data-role="dot" cx="46.5" cy="16" r="1.5" />
    </Base>
  );
}

/* 15 — Adoption: timeline of valves that pulse in sequence → holds at Q4. */
export function AdoptionIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Adoption"}>
      <line data-role="base" x1="4" y1="20" x2="60" y2="20" />
      {[8, 22, 36, 50].map((x, i) => (
        <g key={x}>
          <line data-role="base" x1={x} y1="22" x2={x} y2="26" />
          {/* small valve-handle caps */}
          <line data-role="base" x1={x} y1="20" x2={x} y2="16" />
          <circle data-role="base" cx={x} cy="15" r="1" />
        </g>
      ))}
      <line data-role="accent" x1="4" y1="20" x2="60" y2="20" />
      <circle data-role="dot-ring" cx="8" cy="20" r="1.5" data-delay="1" />
      <circle data-role="dot" cx="22" cy="20" r="1.5" data-delay="2" />
      <circle data-role="dot" cx="36" cy="20" r="1.5" data-delay="3" />
      <circle data-role="dot" cx="50.5" cy="20" r="2" />
      <polyline data-role="accent" points="54,16 58,20 54,24" />
    </Base>
  );
}

/* 16 — Cross-industry: three sector bands with a vertical pipe traversing all. */
export function CrossIndustryIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Cross-Industry"}>
      <line data-role="base" x1="6" y1="8" x2="58" y2="8" />
      <line data-role="base" x1="6" y1="16" x2="58" y2="16" />
      <line data-role="base" x1="6" y1="24" x2="58" y2="24" />
      <line data-role="accent" x1="32" y1="4" x2="32" y2="28" />
      {/* valve body at center crossing */}
      <circle data-role="base" cx="32" cy="16" r="2.5" />
      <circle data-role="dot" cx="32.5" cy="16" r="1.25" />
      <circle data-role="dot-ring" cx="32" cy="8" r="1.25" data-delay="1" />
      <circle data-role="dot-ring" cx="32" cy="24" r="1.25" data-delay="2" />
    </Base>
  );
}

/* 17 — Diagnostic: circular scope / pressure gauge with signal exit. */
export function DiagnosticIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Diagnostic"}>
      <circle data-role="base" cx="22" cy="16" r="10" />
      {/* crosshair */}
      <line data-role="base" x1="22" y1="8" x2="22" y2="24" />
      <line data-role="base" x1="12" y1="16" x2="32" y2="16" />
      {/* angled needle */}
      <line data-role="accent" x1="22" y1="16" x2="28.5" y2="9.5" />
      <circle data-role="dot" cx="22.5" cy="16" r="2" />
      {/* outflow */}
      <line data-role="accent" x1="32" y1="16" x2="58" y2="16" />
      <circle data-role="dot-ring" cx="58" cy="16" r="1.5" />
    </Base>
  );
}

/* 18 — Audit: ledger of valves/rows with one entry circled + active. */
export function AuditIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Audit"}>
      <line data-role="base" x1="6" y1="8" x2="58" y2="8" />
      <line data-role="base" x1="6" y1="16" x2="58" y2="16" />
      <line data-role="draft" x1="6" y1="24" x2="58" y2="24" />
      {/* valve-tick marks */}
      {[14, 24, 34, 44].map((x) => (
        <circle key={x} data-role="base" cx={x} cy="8" r="1" />
      ))}
      {/* circled active entry */}
      <circle data-role="accent" cx="38" cy="16" r="4" />
      <circle data-role="dot" cx="38.5" cy="16" r="1.5" />
      <line data-role="accent" x1="44" y1="16" x2="58" y2="16" />
    </Base>
  );
}

/* 19 — Thesis: pull-quote mark as a valve-handle stylized opening. */
export function ThesisIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Thesis"}>
      {/* left valve-handle ("opening" quote mark) */}
      <path data-role="base" d="M 10 10 Q 6 10 6 14 L 6 18 L 14 18 L 14 14 Q 14 10 10 10" />
      <line data-role="base" x1="10" y1="7" x2="10" y2="10" />
      <circle data-role="base" cx="10" cy="6" r="1" />
      {/* right valve-handle */}
      <path data-role="base" d="M 22 10 Q 18 10 18 14 L 18 18 L 26 18 L 26 14 Q 26 22 22 10" />
      {/* outflow pipe */}
      <line data-role="accent" x1="28" y1="14" x2="58" y2="14" />
      <circle data-role="dot" cx="58" cy="14.5" r="1.75" />
    </Base>
  );
}

/* 20 — Timeline: horizontal pipe with six valve-markers, one hollow/pulsing (current). */
export function TimelineIcon(p: IconProps) {
  return (
    <Base {...p} title={p.title ?? "Timeline"}>
      <line data-role="base" x1="4" y1="16" x2="60" y2="16" />
      {[8, 18, 28, 38, 48, 58].map((x, i) => {
        const current = i === 4;
        return current ? (
          <g key={x}>
            <circle data-role="dot-ring" cx={x} cy="16.5" r="2.5" />
            <line data-role="base" x1={x} y1="10" x2={x} y2="14" />
            <circle data-role="base" cx={x} cy="9" r="1" />
          </g>
        ) : (
          <circle
            key={x}
            data-role="base"
            cx={x}
            cy="16"
            r="1.25"
            fill="currentColor"
            stroke="none"
          />
        );
      })}
    </Base>
  );
}

/* Chapter → icon lookup for DivisionCard et al. */
import type { ChapterKey } from "@/content/divisions";

export const CHAPTER_ICONS: Record<ChapterKey, (p: IconProps) => React.JSX.Element> = {
  strategy: StrategyMark,
  healthcare: HealthcareMark,
  homehealth: HomeHealthMark,
  talent: TalentMark,
  hr: OpHRMark,
  ai: AIPracticeMark,
  humanai: HumanAITeammateIcon,
};
