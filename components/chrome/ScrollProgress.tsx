"use client";

import { useEffect, useRef } from "react";

/*
  ScrollProgress — 2px lime hairline at the bottom of the viewport.

  scaleX driven by scrollY / (scrollHeight - innerHeight). Listens to
  the global scroll event (passive). Lenis dispatches the same scroll
  events the browser does, so this works without any Lenis-specific wiring.
*/

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
