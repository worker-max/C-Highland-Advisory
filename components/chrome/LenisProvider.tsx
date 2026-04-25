"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/*
  LenisProvider — wires Lenis smooth-scroll into the App Router root.

  Per DESIGN_HANDOFF: lerp 0.1, smooth: true. Disable entirely on
  prefers-reduced-motion. Mount once at the root; Lenis handles the
  global window scroll under the hood.
*/

export function LenisProvider() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
