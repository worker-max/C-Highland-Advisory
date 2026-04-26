"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

/*
  LenisProvider — wires Lenis smooth-scroll into the App Router root.

  Per DESIGN_HANDOFF: lerp 0.1, smooth: true. Disable entirely on
  prefers-reduced-motion. Mount once at the root; Lenis handles the
  global window scroll under the hood.

  Route-change scroll reset — IMPORTANT
  -------------------------------------
  Lenis hijacks window.scroll and Next.js App Router's automatic
  top-reset on navigation does NOT propagate through Lenis's
  internal state. Without an explicit reset, scrollY persists across
  routes — which means navigating from the homepage (long sticky
  scroll) to a shorter division detail page lands the user *past*
  the destination's bottom = visually at the footer.

  Fix: a second useEffect keyed on pathname calls
  lenis.scrollTo(0, { immediate: true }) on every navigation,
  forcing Lenis's target + current scroll values back to 0
  without the smooth-scroll animation.
*/

export function LenisProvider() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Mount Lenis once.
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
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll to top on every route change. immediate: true skips
  // the smooth animation so users don't see the page scrolling itself
  // back to the top after the new route renders.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      // Fallback when Lenis isn't active (reduced motion, coarse pointer).
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
}
