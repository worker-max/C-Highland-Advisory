import type { SVGProps } from "react";
import clsx from "clsx";

type Props = SVGProps<SVGSVGElement> & {
  /** Rendered width in px. Height matches (square). */
  size?: number;
  /** Accessible label. Omit for decorative use. */
  title?: string;
};

/*
  The Valve — C Highland Advisory signature emblem.

  Grammar:
   * 120×120 circular mark with type-on-a-path wrapping the outer ring
   * Monogram is a gate-valve schematic:
       C = valve body (dashed-draft arc + solid inner seat arc)
       H = twin flow-pipes with a shutoff handle crossbar + handle-cap
   * Pulsing flow-node sits at the valve-to-pipe junction
   * Outer ring rotates ~60s per revolution (set via CSS, respects reduced-motion)
   * On hover of the parent .emblem element, ring speeds to 24s

  This is the ambient brand signal. It appears in Nav at 40px, Footer at 48px,
  homepage hero at ~240px, and as the favicon at 64px. Same geometry, one source.
*/

const WRAP_TEXT =
  "C·HIGHLAND·ADVISORY · EST · 2025 · OPERATIONAL · PROGRAMS · DESIGNED · TO · LAST · ";

export function Emblem({ size = 120, title, className, ...rest }: Props) {
  // Unique ID per render for the textPath — avoids DOM collisions when
  // multiple emblems render on one page (nav + footer + hero all).
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

      {/* Outer ring — rotates via .emblem-ring CSS rule */}
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

      {/* C: valve body — dashed-draft outer arc + solid inner seat arc */}
      <path
        d="M 54 42 A 14 14 0 0 0 54 78"
        strokeDasharray="2 2"
        opacity="0.55"
      />
      <path d="M 50 46 A 10 10 0 0 0 50 74" />

      {/* Intake pipe (dashed draft) feeding the C */}
      <line
        x1="36"
        y1="60"
        x2="48"
        y2="60"
        strokeDasharray="2 2"
        opacity="0.5"
      />

      {/* H: twin flow-pipes + shutoff crossbar + handle-cap */}
      <line x1="62" y1="42" x2="62" y2="78" />
      <line x1="82" y1="42" x2="82" y2="78" />
      <line x1="62" y1="60" x2="82" y2="60" />
      <line x1="72" y1="56" x2="72" y2="64" />
      <circle cx="72" cy="54" r="2" />

      {/* Pulsing flow-node at the valve/pipe junction */}
      <circle className="emblem-pulse" cx="62" cy="60" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
