"use client";

import { useId } from "react";
import type { IconKind } from "@/lib/content/divisions";

/*
  DivisionIcon — line glyphs in signal green, each running its own
  intrinsic "mechanism" animation that narrates the discipline.

  Each icon uses the same 56×56 viewBox + signal-green stroke language
  but adds SMIL <animate> / <animateMotion> to specific elements.
  The container stays still — it's the geometry that comes alive.

  Per-discipline metaphors:
    circuit  (Strategy)        — three sound-board sliders being adjusted
    vital    (Healthcare)      — heart-rate blip traveling along the trace
    branch   (Home Health)     — pulses radiating from root to branches
    pipeline (Talent)          — items flowing through the pipes (counter-flow)
    knit     (Operational HR)  — interweaving curves (CSS, see globals.css)
    wave     (AI Practice)     — waveform passing through bars (CSS)
    merge    (Human + AI)      — data converging into a pulsing core node

  prefers-reduced-motion: all SMIL animations get begin="indefinite" so
  they never start; CSS animations are disabled in globals.css.
*/

type Props = {
  kind: IconKind;
  /** Retained for interface compat; ignored — animation is intrinsic now. */
  scrollProgress?: number;
};

export function DivisionIcon({ kind }: Props) {
  // Stable per-instance ID so multiple icons on the page don't collide
  // on internal SVG fragment IDs (mpath references etc.).
  const id = useId().replace(/:/g, "_");

  const stroke = "var(--color-signal)";
  const sw = 1.4;
  const common = {
    fill: "none" as const,
    stroke,
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (kind) {
    /* ─────────── circuit (Strategy & Advisory) ───────────
       Three horizontal slider tracks with dots that slide between
       endpoints at staggered timings, like someone adjusting faders. */
    case "circuit":
      return (
        <svg
          className="icon-pattern"
          viewBox="0 0 56 56"
          aria-hidden="true"
          style={{ overflow: "visible" }}
        >
          <line x1="8" y1="14" x2="48" y2="14" {...common} />
          <line x1="8" y1="28" x2="48" y2="28" {...common} />
          <line x1="8" y1="42" x2="48" y2="42" {...common} />

          <circle cy="14" r="3" fill={stroke}>
            <animate
              attributeName="cx"
              values="14;48;14"
              keyTimes="0;0.5;1"
              dur="3.6s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            />
          </circle>
          <circle cy="28" r="3" fill={stroke}>
            <animate
              attributeName="cx"
              values="38;14;38"
              keyTimes="0;0.5;1"
              dur="2.8s"
              begin="-0.6s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            />
          </circle>
          <circle cy="42" r="3" fill={stroke}>
            <animate
              attributeName="cx"
              values="22;48;22"
              keyTimes="0;0.5;1"
              dur="4.2s"
              begin="-1.4s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            />
          </circle>
        </svg>
      );

    /* ─────────── vital (Healthcare Strategy) ───────────
       EKG trace with a bright blip racing along the path — heart monitor. */
    case "vital": {
      const pathId = `vital-path-${id}`;
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          <path
            id={pathId}
            d="M4 28 L14 28 L18 18 L24 38 L28 28 L52 28"
            {...common}
          />
          <circle r="2.5" fill={stroke}>
            <animateMotion
              dur="2.4s"
              repeatCount="indefinite"
              rotate="auto"
              calcMode="linear"
            >
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        </svg>
      );
    }

    /* ─────────── branch (Home Health Operations) ───────────
       A trunk with two lateral branches; signal pulses radiate from
       the trunk midpoint outward to each endpoint, then restart. */
    case "branch":
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          <line x1="28" y1="6" x2="28" y2="48" {...common} />
          <line x1="28" y1="22" x2="12" y2="36" {...common} />
          <line x1="28" y1="22" x2="44" y2="36" {...common} />
          <circle cx="28" cy="6" r="2.5" fill={stroke} />
          <circle cx="12" cy="36" r="2.5" fill={stroke} />
          <circle cx="44" cy="36" r="2.5" fill={stroke} />

          {/* Pulse climbing the trunk */}
          <circle r="2" fill={stroke} className="ico-pulse-soft">
            <animate
              attributeName="cx"
              values="28;28"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="22;6;22"
              keyTimes="0;0.5;1"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Pulse to left branch */}
          <circle r="2" fill={stroke}>
            <animate
              attributeName="cx"
              values="28;12;28"
              keyTimes="0;0.5;1"
              dur="2.4s"
              begin="-0.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="22;36;22"
              keyTimes="0;0.5;1"
              dur="2.4s"
              begin="-0.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="2.4s"
              begin="-0.8s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Pulse to right branch */}
          <circle r="2" fill={stroke}>
            <animate
              attributeName="cx"
              values="28;44;28"
              keyTimes="0;0.5;1"
              dur="2.4s"
              begin="-1.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="22;36;22"
              keyTimes="0;0.5;1"
              dur="2.4s"
              begin="-1.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="2.4s"
              begin="-1.6s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      );

    /* ─────────── pipeline (Talent Acquisition) ───────────
       Two parallel pipes with items flowing in opposite directions
       — a pipeline at work. */
    case "pipeline":
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          <line x1="6" y1="20" x2="50" y2="20" {...common} />
          <line x1="6" y1="36" x2="50" y2="36" {...common} />

          {/* Top pipe: left → right */}
          <circle cy="20" r="3" fill={stroke}>
            <animate
              attributeName="cx"
              values="6;50"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cy="20" r="2" fill={stroke} opacity="0.5">
            <animate
              attributeName="cx"
              values="6;50"
              dur="3s"
              begin="-1.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Bottom pipe: right → left */}
          <circle cy="36" r="3" fill={stroke}>
            <animate
              attributeName="cx"
              values="50;6"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cy="36" r="2" fill={stroke} opacity="0.5">
            <animate
              attributeName="cx"
              values="50;6"
              dur="3s"
              begin="-1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      );

    /* ─────────── knit (Operational HR) ───────────
       Two interweaving sine curves — fabric being woven.
       Animation: warp & weft translate counter-phase via CSS. */
    case "knit":
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          <path
            className="ico-knit-warp"
            d="M4 22 Q 14 8, 28 22 T 52 22"
            {...common}
          />
          <path
            className="ico-knit-weft"
            d="M4 34 Q 14 48, 28 34 T 52 34"
            {...common}
          />
        </svg>
      );

    /* ─────────── wave (AI Practice) ───────────
       Six bars oscillating with phase offset — a waveform actually
       traveling through the icon. CSS keyframes (see globals.css). */
    case "wave":
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              className="ico-wave-bar"
              x={6 + i * 8}
              y={16}
              width="3"
              height="24"
              fill={stroke}
              rx="1.5"
            />
          ))}
        </svg>
      );

    /* ─────────── merge (Human + AI) ───────────
       Two arcs converging into a central node. Data points flow
       inward along each arc; the core pulses to indicate the
       integrated system is "live". */
    case "merge": {
      const topId = `merge-top-${id}`;
      const botId = `merge-bot-${id}`;
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          <path
            id={topId}
            d="M6 12 Q 22 12, 28 28"
            {...common}
          />
          <path
            id={botId}
            d="M6 44 Q 22 44, 28 28"
            {...common}
          />
          <path d="M28 28 L50 28" {...common} />

          {/* Top stream flowing inward */}
          <circle r="2" fill={stroke}>
            <animateMotion
              dur="2.6s"
              repeatCount="indefinite"
              calcMode="linear"
            >
              <mpath href={`#${topId}`} />
            </animateMotion>
          </circle>
          {/* Bottom stream flowing inward */}
          <circle r="2" fill={stroke}>
            <animateMotion
              dur="2.6s"
              begin="-1.3s"
              repeatCount="indefinite"
              calcMode="linear"
            >
              <mpath href={`#${botId}`} />
            </animateMotion>
          </circle>

          {/* Pulsing integration core */}
          <circle
            cx="28"
            cy="28"
            r="3.5"
            fill={stroke}
            className="ico-merge-core"
          />
        </svg>
      );
    }

    default:
      return null;
  }
}
