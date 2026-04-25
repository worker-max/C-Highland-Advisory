"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

/*
  DotIcon — lime-green geometric dot-pattern marker.

  Replaces the per-division circuit/valve SVG icons on the homepage scroller.
  Same atom (a dot, in lime) is rearranged into a different pattern per
  division, so all seven icons read as one visual system. Dots fade-in
  staggered when the icon enters view.

  Each pattern is defined as (x, y) coords on a 100x100 canvas; r defaults
  to 8 (good at 120-160px rendered size). The component handles
  size/scale + the entrance animation + an idle pulse on the focal dot.
*/

export type Dot = {
  x: number;
  y: number;
  r?: number;
  /** if true, this dot is the focal/pulsing one */
  focal?: boolean;
};

type Props = {
  dots: Dot[];
  size?: number;
  className?: string;
  color?: string;
  /** when true, use a softer/dimmer rendering (e.g. on dark backgrounds) */
  dim?: boolean;
};

export function DotIcon({
  dots,
  size = 140,
  className,
  color = "var(--color-lime)",
  dim = false,
}: Props) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      }}
      aria-hidden="true"
    >
      {dots.map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={dot.r ?? 7}
          fill={color}
          opacity={dim ? 0.55 : 1}
          variants={{
            hidden: { scale: 0.2, opacity: 0 },
            visible: {
              scale: 1,
              opacity: dim ? 0.55 : 1,
              transition: {
                type: "spring",
                stiffness: 240,
                damping: 18,
              },
            },
          }}
          style={
            dot.focal
              ? {
                  transformOrigin: "center",
                  transformBox: "fill-box",
                  animation: dim
                    ? undefined
                    : "ico-pulse 2.4s var(--ease-quiet) infinite 1s",
                }
              : undefined
          }
        />
      ))}
    </motion.svg>
  );
}

/*
  Per-division dot patterns. Each is a unique geometric arrangement —
  Von Lyncker style — but the *language* is one (same dot atom, same
  green). Patterns intentionally read as abstract glyphs, not literal
  diagrams.
*/

import type { ChapterKey } from "@/content/divisions";

export const DIVISION_DOT_PATTERNS: Record<ChapterKey, Dot[]> = {
  // 01 Strategy & Advisory — 5-dot plus (connective trunk + four spokes)
  strategy: [
    { x: 50, y: 22 },
    { x: 22, y: 50 },
    { x: 50, y: 50, focal: true },
    { x: 78, y: 50 },
    { x: 50, y: 78 },
  ],
  // 02 Healthcare Strategy — 3-dot vertical (heartbeat-adjacent without being literal)
  healthcare: [
    { x: 50, y: 22 },
    { x: 50, y: 50, focal: true },
    { x: 50, y: 78 },
    { x: 28, y: 50 },
    { x: 72, y: 50 },
  ],
  // 03 Home Health Operations — 4-dot square (corners of a dwelling) + interior focal
  homehealth: [
    { x: 28, y: 28 },
    { x: 72, y: 28 },
    { x: 28, y: 72 },
    { x: 72, y: 72 },
    { x: 50, y: 50, focal: true, r: 5 },
  ],
  // 04 Talent Acquisition — 5-dot vertical pipeline, top to bottom
  talent: [
    { x: 50, y: 16 },
    { x: 50, y: 32 },
    { x: 50, y: 50 },
    { x: 50, y: 68 },
    { x: 50, y: 84, focal: true },
  ],
  // 05 Operational HR — 8-dot ring (cadence/rhythm) + center
  hr: [
    { x: 50, y: 18 },
    { x: 73, y: 27 },
    { x: 82, y: 50 },
    { x: 73, y: 73 },
    { x: 50, y: 82 },
    { x: 27, y: 73 },
    { x: 18, y: 50 },
    { x: 27, y: 27 },
    { x: 50, y: 50, focal: true, r: 5 },
  ],
  // 06 AI Practice — 4-dot diamond + center (feedback loop)
  ai: [
    { x: 50, y: 20 },
    { x: 80, y: 50 },
    { x: 50, y: 80 },
    { x: 20, y: 50 },
    { x: 50, y: 50, focal: true },
  ],
  // 07 Human + AI Workforce — two 3-dot clusters merging
  humanai: [
    // human cluster (left)
    { x: 22, y: 32 },
    { x: 22, y: 50 },
    { x: 22, y: 68 },
    // shared signal node (focal)
    { x: 50, y: 50, focal: true },
    // AI cluster (right)
    { x: 78, y: 32 },
    { x: 78, y: 50 },
    { x: 78, y: 68 },
  ],
};
