"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

/*
  Hero — two-panel sticky slide-in.

  Container is 220vh tall (creates scroll room).
  hero-outer is sticky 100vh (pinned viewport).
  hero-panel-1 is the dark atmospheric panel (z:1, full bleed).
  hero-panel-2 is the white rounded card (z:2, position absolute, inset 0)
  that starts at translateX(100vw) and slides to translateX(0) as scroll
  progress goes 0 → 1.

  Scroll math:
    progress = clamp(0..1, scrolled / (heroHeight - 100vh))
    panel2.transform = translateX((1 - progress) * 100vw)
*/

export function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      if (panel2Ref.current) {
        panel2Ref.current.style.transform = `translateX(${(1 - p) * 100}vw)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" ref={wrapRef}>
      <div className="hero-outer">
        {/* Panel 1 — atmosphere */}
        <div className="hero-panel-1">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-1-toprow">
            <span className="hero-1-tag">
              <span className="marker" aria-hidden="true" />
              C Highland Advisory · Charleston, SC · Est. 2026
            </span>
            <span className="scroll-cue">
              <span className="line" aria-hidden="true" />
              Scroll
            </span>
          </div>
          {/* Prominent animated brand mark — full lockup matching Colin's
              reference: cream bars + cream "C Highland" + tracked "ADVISORY"
              on the dark atmosphere. Bars draw on first session, nodes
              cascade on hover. C-silhouette is encoded in the bar widths
              [54, 64, 44, 70, 44, 64, 54] in Logo.tsx — must not change. */}
          <div className="hero-1-logo">
            <Logo
              size={140}
              tone="dark"
              layout="stacked"
              showWordmark
              wordmarkSize={32}
              intro="auto"
              hover={true}
            />
          </div>
          <div className="hero-1-content">
            <h1 className="hero-1-headline">
              Seven divisions.
              <br />
              <em>One operating discipline.</em>
            </h1>
            <div className="hero-1-meta">
              <p className="body-base">
                Senior advisory across healthcare, talent acquisition,
                contingent workforce, and applied AI — designed as programs
                that hold under pressure.
              </p>
              <Link href="#approach" className="btn btn-signal">
                <span>Read the discipline</span>
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Panel 2 — slides in */}
        <div className="hero-panel-2" ref={panel2Ref}>
          <div className="hero-2-toprow">
            <span className="eyebrow">
              <span className="marker" /> A note from the founder
            </span>
            <span className="mono" style={{ color: "var(--color-silt)" }}>
              02 / 02
            </span>
          </div>
          <h2 className="hero-2-headline">
            I design operational programs across healthcare, talent acquisition,
            contingent workforce, and applied AI —{" "}
            <em>and I build them to last.</em>
          </h2>
          <div className="hero-2-bottom">
            <div className="hero-2-stats">
              <div className="stat">
                <span className="num">07</span>
                <span className="lbl">Disciplines</span>
              </div>
              <div className="stat">
                <span className="num">09</span>
                <span className="lbl">Sectors served</span>
              </div>
              <div className="stat">
                <span className="num">2026</span>
                <span className="lbl">Founded</span>
              </div>
            </div>
            <div className="body-sm" style={{ maxWidth: "32ch" }}>
              Boutique. Quiet authority. Operator-grade pragmatism. Not
              academic. Not consultancy-glossy.
            </div>
            <Link href="#contact" className="btn btn-primary">
              <span>Begin engagement</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
