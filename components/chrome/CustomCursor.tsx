"use client";

import { useEffect, useRef, useState } from "react";

/*
  CustomCursor — Von Lyncker-style dual-dot cursor.

  Outer: 28x28 signal-green at 0.35 opacity, lerps toward mouse with factor 0.18
  Inner: 6x6 signal-green, lerps with factor 0.7 (near-instant follow)

  On hover over a, button, [data-cursor='hover']:
  outer scales to 56x56 with opacity 0.55.

  Hidden on (pointer: coarse) — touch devices keep their native pointer.
  Disabled when prefers-reduced-motion: reduce.
*/

export function CustomCursor() {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const state = useRef({ tx: 0, ty: 0, x: 0, y: 0, ix: 0, iy: 0 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarse || reduced) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      state.current.tx = e.clientX;
      state.current.ty = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      if (t.closest("a, button, [data-cursor='hover']")) setHovering(true);
      else setHovering(false);
    };

    let raf: number;
    const tick = () => {
      const s = state.current;
      s.x += (s.tx - s.x) * 0.18;
      s.y += (s.ty - s.y) * 0.18;
      s.ix += (s.tx - s.ix) * 0.7;
      s.iy += (s.ty - s.iy) * 0.7;
      if (outer.current) {
        outer.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      }
      if (inner.current) {
        inner.current.style.transform = `translate3d(${s.ix}px, ${s.iy}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div className="cursor-wrap" aria-hidden="true">
      <div ref={outer} className={`cursor-outer ${hovering ? "hover" : ""}`} />
      <div ref={inner} className="cursor-inner" />
    </div>
  );
}
