"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

/*
  Animated brand mark per logo brief (2026-04-25).

  Composition:
   * 7 horizontal bars forming a topographic "C" (one per practice division)
   * 7 neon-green nodes on the open right edge — node #7 is encircled by a
     thin ring marking the Workforce Integration division as the connective
     layer across the others
   * Variants: "symbol" (no wordmark — for nav, favicons) | "full" (includes
     internal SVG text wordmark — kept off the live nav since we use an
     external Newsreader-italic wordmark, but exposed for static exports)

  Intro animation plays ONCE per browser session via sessionStorage. The
  ch-logo-skip-intro class is applied after the first play so subsequent
  navigations / mounts show the final state instantly. CSS in globals.css.

  prefers-reduced-motion is respected at the CSS layer.
*/

type Variant = "symbol" | "full";

type Props = {
  /** Rendered width in px. Height matches the variant aspect ratio. */
  size?: number;
  /** "symbol" omits the internal SVG wordmark — recommended for header. */
  variant?: Variant;
  className?: string;
  /** Override the accessible label. */
  title?: string;
};

const SESSION_KEY = "ch-logo-intro-v1";

export function Logo({
  size = 60,
  variant = "symbol",
  className,
  title = "C Highland Advisory",
}: Props) {
  // Default to "skipped" for SSR + first paint to avoid hydration mismatch
  // and animation flicker. After mount, decide whether to actually skip.
  const [skipIntro, setSkipIntro] = useState(true);

  useEffect(() => {
    try {
      const played = sessionStorage.getItem(SESSION_KEY) === "1";
      if (played) {
        setSkipIntro(true);
      } else {
        setSkipIntro(false);
        sessionStorage.setItem(SESSION_KEY, "1");
      }
    } catch {
      // sessionStorage may be unavailable (private mode, sandbox) — just play
      setSkipIntro(false);
    }
  }, []);

  const isFull = variant === "full";
  const viewBox = isFull ? "0 0 400 280" : "0 0 240 200";
  const aspect = isFull ? 280 / 400 : 200 / 240;

  // Bar / node positions per the brief's geometry — translated to fit the
  // 240×200 symbol-only viewBox by shifting bars up by 16px so the symbol
  // is vertically centered within the smaller canvas.
  const yOffset = isFull ? 0 : -16;
  const bars: { x: number; y: number; w: number }[] = [
    { x: 60, y: 36 + yOffset, w: 120 },
    { x: 42, y: 56 + yOffset, w: 102 },
    { x: 30, y: 76 + yOffset, w: 82 },
    { x: 26, y: 96 + yOffset, w: 74 },
    { x: 30, y: 116 + yOffset, w: 82 },
    { x: 42, y: 136 + yOffset, w: 102 },
    { x: 60, y: 156 + yOffset, w: 120 },
  ];
  const nodes = bars.map((b) => ({ cx: 210, cy: b.y + 6 }));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={Math.round(size * aspect)}
      role="img"
      aria-label={title}
      className={clsx("ch-logo-svg", skipIntro && "ch-logo-skip-intro", className)}
    >
      <title>{title}</title>

      {bars.map((bar, i) => (
        <rect
          key={`bar-${i}`}
          className="ch-bar"
          x={bar.x}
          y={bar.y}
          width={bar.w}
          height={12}
          rx={1}
        />
      ))}

      {nodes.map((node, i) => (
        <circle
          key={`node-${i}`}
          className="ch-node"
          cx={node.cx}
          cy={node.cy}
          r={4.5}
        />
      ))}

      {/* Integration ring around node #7 */}
      <circle
        className="ch-integration-ring"
        cx={nodes[6].cx}
        cy={nodes[6].cy}
        r={9}
      />

      {isFull && (
        <>
          <text
            x="200"
            y="218"
            textAnchor="middle"
            fontFamily="var(--font-serif), Georgia, serif"
            fontSize="28"
            fontWeight="400"
            fill="var(--color-brand-bar)"
            letterSpacing="1"
          >
            C Highland
          </text>
          <text
            x="200"
            y="246"
            textAnchor="middle"
            fontFamily="var(--font-sans), system-ui, sans-serif"
            fontSize="10"
            fill="var(--color-brand-bar)"
            letterSpacing="3"
            opacity="0.7"
          >
            A D V I S O R Y
          </text>
        </>
      )}
    </svg>
  );
}
