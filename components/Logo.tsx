"use client";

import { useEffect, useRef, useState } from "react";

/*
  C Highland Advisory — animated 7-bar Logo

  Geometry per DESIGN_HANDOFF:
   • viewBox 104 × 78
   • 7 black bars, all left-aligned at x = 14, height 6, vertical step 10
     (rows at y: 6, 16, 26, 36, 46, 56, 66)
   • Bar widths (top→bottom): [54, 64, 44, 70, 44, 64, 54]
     fans out into a left-aligned "C" silhouette with bar 4 the longest
   • 7 green nodes at x = 92, vertically centered on each bar (y = bar.y + 3)
     r = 3.4, fill var(--color-signal)
   • Integration ring around node #7 only:
     cx = 92, cy = 69, r = 6.2, stroke var(--color-signal), 1.5

  Intro animation (plays once per session, sessionStorage gate):
   1. Bars draw L→R cascading top to bottom (380ms, 90ms stagger)
   2. Nodes pop in 380ms after intro start, 90ms apart
   3. Integration ring scales in 100ms after node #7

  Hover cascade: 7 nodes pulse sequentially with 60ms stagger.

  prefers-reduced-motion: disable both intro and pulse.
*/

const BAR_LEFT = 14;
const BAR_H = 6;
const ROW_STEP = 10;
const ROW_Y0 = 6;
const BAR_WIDTHS = [54, 64, 44, 70, 44, 64, 54] as const;

const BARS = BAR_WIDTHS.map((w, i) => ({
  x: BAR_LEFT,
  y: ROW_Y0 + i * ROW_STEP,
  w,
  h: BAR_H,
}));

const NODE_X = 92;
const NODES = BARS.map((b) => ({
  x: NODE_X,
  y: b.y + b.h / 2,
}));

const VB_W = 104;
const VB_H = 78;

type IntroMode = "auto" | "always" | "never";

type Props = {
  size?: number;
  showWordmark?: boolean;
  wordmarkSize?: number;
  intro?: IntroMode;
  hover?: boolean;
  className?: string;
  title?: string;
  /** "symbol" maintained for backward compat — ignored, behaves as showWordmark=false */
  variant?: "symbol" | "full";
};

export function Logo({
  size = 64,
  showWordmark = false,
  wordmarkSize = 22,
  intro = "auto",
  hover = true,
  className = "",
  title = "C Highland Advisory",
  variant,
}: Props) {
  const [phase, setPhase] = useState<"pre" | "drawing" | "done">("pre");
  const ref = useRef<HTMLSpanElement>(null);
  const wordmark = variant === "full" || showWordmark;

  useEffect(() => {
    let shouldPlay = true;
    if (intro === "never") shouldPlay = false;
    if (intro === "auto") {
      try {
        if (sessionStorage.getItem("ch-logo-intro-v1") === "played") {
          shouldPlay = false;
        }
      } catch {
        /* sessionStorage unavailable; play once */
      }
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      shouldPlay = false;
    }
    if (!shouldPlay) {
      setPhase("done");
      return;
    }
    setPhase("drawing");
    const total = 1400;
    const t = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("ch-logo-intro-v1", "played");
      } catch {
        /* sessionStorage unavailable */
      }
    }, total);
    return () => clearTimeout(t);
  }, [intro]);

  const playing = phase === "drawing";

  const barStep = 90;
  const nodeBase = 380;
  const nodeStep = 90;

  const handleHover = () => {
    if (!hover) return;
    if (!ref.current) return;
    ref.current.classList.remove("logo-pulsing");
    void ref.current.offsetWidth; // force reflow to restart animation
    ref.current.classList.add("logo-pulsing");
  };

  const aspect = VB_W / VB_H;
  const w = size * aspect;

  return (
    <span
      className={`logo ${className}`}
      ref={ref}
      onMouseEnter={handleHover}
      data-cursor="hover"
    >
      <svg
        className="logo-mark"
        width={w}
        height={size}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        aria-label={title}
        role="img"
      >
        <title>{title}</title>
        <g>
          {BARS.map((b, i) => {
            const delay = i * barStep;
            const style: React.CSSProperties = playing
              ? {
                  transformOrigin: `${b.x}px ${b.y}px`,
                  animation: `logo-bar-drop 380ms cubic-bezier(0.2,0.7,0.2,1) ${delay}ms both`,
                }
              : {};
            return (
              <rect
                key={`bar-${i}`}
                className="logo-bar"
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx={1}
                style={style}
              />
            );
          })}
          {NODES.map((n, i) => {
            const delay = nodeBase + i * nodeStep;
            const style: React.CSSProperties = playing
              ? {
                  transformOrigin: `${n.x}px ${n.y}px`,
                  animation: `logo-node-pop 320ms cubic-bezier(0.2,0.8,0.2,1.2) ${delay}ms both`,
                }
              : {};
            const pulseDelay = i * 60;
            return (
              <g
                key={`node-${i}`}
                style={{ ["--pulse-delay" as string]: `${pulseDelay}ms` }}
                className="logo-node-group"
              >
                <circle
                  className="logo-node"
                  cx={n.x}
                  cy={n.y}
                  r={3.4}
                  style={style}
                />
              </g>
            );
          })}
          {/* Integration ring on node #7 only */}
          <circle
            className="logo-ring"
            cx={NODES[6].x}
            cy={NODES[6].y}
            r={6.2}
            style={
              playing
                ? {
                    transformOrigin: `${NODES[6].x}px ${NODES[6].y}px`,
                    animation: `logo-ring-in 380ms cubic-bezier(0.2,0.8,0.2,1) ${
                      nodeBase + 6 * nodeStep + 100
                    }ms both`,
                  }
                : {}
            }
          />
        </g>
      </svg>
      {wordmark && (
        <span className="logo-wordmark" style={{ marginLeft: 10 }}>
          <span className="name" style={{ fontSize: wordmarkSize }}>
            C Highland
          </span>
          <span className="sub">Advisory</span>
        </span>
      )}
    </span>
  );
}
