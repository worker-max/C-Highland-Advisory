import type { SVGProps } from "react";
import clsx from "clsx";

type Props = SVGProps<SVGSVGElement> & {
  /** Rendered width in px. Height matches (square). */
  size?: number;
  /** Accessible label. Omit for decorative use. */
  title?: string;
};

/*
  The Seal — C Highland Advisory signature emblem.

  Grammar:
   * 120×120 circular mark with type-on-a-path wrapping the outer ring
   * Inner monogram: clean CH letterforms at the center — arc + twin verticals
     with a crossbar. Reads as letters first.
   * The only motion is the outer ring rotating at ~60s per revolution
     (tightens to 24s on hover). The type-on-path drifts with the ring.
   * No pulsing node — the mark is intentionally quieter than the icon family,
     which carries the pulsing flow-node signal in its own vocabulary.

  This is the ambient brand signal. Same geometry at Nav 40px, Footer 48px,
  hero 200–240px, favicon 64px.
*/

const WRAP_TEXT =
  "C·HIGHLAND·ADVISORY · EST · 2025 · OPERATIONAL · PROGRAMS · DESIGNED · TO · LAST · ";

export function Emblem({ size = 120, title, className, ...rest }: Props) {
  // Unique ID per render so multiple emblems on one page don't collide.
  const pathId = `ring-${Math.random().toString(36).slice(2, 10)}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      className={clsx("emblem", className)}
      {...rest}
    >
      <defs>
        <path
          id={pathId}
          d="M 60 60 m -48 0 a 48 48 0 1 1 96 0 a 48 48 0 1 1 -96 0"
        />
      </defs>

      {/* Outer ring + type-on-path — the only moving element. */}
      <g className="emblem-ring">
        <circle cx="60" cy="60" r="52" opacity="0.25" />
        <circle cx="60" cy="60" r="48" />
        <text
          fontFamily="var(--font-mono, ui-monospace, monospace)"
          fontSize="6"
          letterSpacing="0.28em"
          fill="currentColor"
          stroke="none"
        >
          <textPath href={`#${pathId}`} startOffset="0">
            {WRAP_TEXT + WRAP_TEXT}
          </textPath>
        </text>
      </g>

      {/* Inner monogram — clean CH letterforms, reads as letters first. */}
      {/* C: simple arc opening to the right */}
      <path d="M 52 48 A 12 12 0 1 0 52 72" />
      {/* H: two vertical strokes + crossbar */}
      <line x1="60" y1="48" x2="60" y2="72" />
      <line x1="74" y1="48" x2="74" y2="72" />
      <line x1="60" y1="60" x2="74" y2="60" />
    </svg>
  );
}
