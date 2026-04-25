"use client";

import type { IconKind } from "@/lib/content/divisions";

/*
  DivisionIcon — line glyphs in signal green.

  Each pattern morphs subtly with the `scrollProgress` 0..1 prop —
  endpoints shift, dots translate, wave amplitudes change. This gives
  the horizontal divisions track a sense of life as the user scrolls.

  Common style: stroke = var(--color-signal), strokeWidth 1.4, fill none,
  round caps + joins.
*/

type Props = {
  kind: IconKind;
  scrollProgress?: number; // 0..1
};

export function DivisionIcon({ kind, scrollProgress = 0 }: Props) {
  const p = Math.max(0, Math.min(1, scrollProgress));
  const stroke = "var(--color-signal)";
  const sw = 1.4;
  const common = {
    fill: "none",
    stroke,
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (kind) {
    case "circuit":
      return (
        <svg
          className="icon-pattern"
          viewBox="0 0 56 56"
          style={{ overflow: "visible" }}
          aria-hidden="true"
        >
          <line x1="8" y1="14" x2="48" y2="14" {...common} />
          <line x1="8" y1="28" x2={28 + 16 * p} y2="28" {...common} />
          <line x1="8" y1="42" x2="48" y2="42" {...common} />
          <circle cx="48" cy="14" r="3" fill={stroke} />
          <circle cx={28 + 16 * p} cy="28" r="3" fill={stroke} />
          <circle cx="48" cy="42" r="3" fill={stroke} />
        </svg>
      );
    case "vital":
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          <path
            d={`M4 28 L14 28 L18 ${20 - 6 * p} L24 ${36 + 4 * p} L28 28 L52 28`}
            {...common}
          />
        </svg>
      );
    case "branch":
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          <line x1="28" y1="6" x2="28" y2={50 - 6 * p} {...common} />
          <line x1="28" y1="22" x2={10 + 4 * p} y2="36" {...common} />
          <line x1="28" y1="22" x2={46 - 4 * p} y2="36" {...common} />
          <circle cx="28" cy="6" r="2.5" fill={stroke} />
          <circle cx={10 + 4 * p} cy="36" r="2.5" fill={stroke} />
          <circle cx={46 - 4 * p} cy="36" r="2.5" fill={stroke} />
          <circle cx="28" cy={50 - 6 * p} r="2.5" fill={stroke} />
        </svg>
      );
    case "pipeline":
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          <line x1="6" y1="20" x2="50" y2="20" {...common} />
          <line x1="6" y1="36" x2="50" y2="36" {...common} />
          <circle cx={10 + 32 * p} cy="20" r="3" fill={stroke} />
          <circle cx={42 - 32 * p} cy="36" r="3" fill={stroke} />
        </svg>
      );
    case "knit":
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          <path
            d={`M4 ${28 - 6 * p} Q 14 ${10 + 4 * p}, 28 28 T 52 ${28 - 6 * p}`}
            {...common}
          />
          <path
            d={`M4 ${28 + 6 * p} Q 14 ${46 - 4 * p}, 28 28 T 52 ${28 + 6 * p}`}
            {...common}
          />
        </svg>
      );
    case "wave":
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const h = 8 + Math.sin((i + p * 6) * 0.9) * 8 + 6;
            return (
              <rect
                key={i}
                x={6 + i * 8}
                y={28 - h / 2}
                width="3"
                height={h}
                fill={stroke}
                rx="1.5"
              />
            );
          })}
        </svg>
      );
    case "merge":
      return (
        <svg className="icon-pattern" viewBox="0 0 56 56" aria-hidden="true">
          <path d={`M6 12 Q ${20 + 8 * p} 12, 28 28 T 50 44`} {...common} />
          <path d={`M6 44 Q ${20 + 8 * p} 44, 28 28 T 50 12`} {...common} />
          <circle cx="28" cy="28" r="3.5" fill={stroke} />
        </svg>
      );
    default:
      return null;
  }
}
