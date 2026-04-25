"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DIVISIONS } from "@/lib/content/divisions";
import { DivisionIcon } from "@/components/DivisionIcon";

/*
  Divisions — sticky horizontal scroll.

  Container is 700vh tall; outer is sticky 100vh.
  Track is a flex row of 7 division cards + 1 black-hole CTA card,
  starting at translateX(20vw) (a peek of card 1) and ending at
  translateX(-(trackWidth - 100vw + 64)) when scroll hits 100%.

  Active card index = floor(p * 7) — used for the "0N / 07" indicator.
  The DivisionIcon receives scrollProgress so its internal geometry shifts.

  Black-hole CTA (8th card) uses --color-ink bg with two radial gradients
  bleeding signal-green, a 380x380 hole element bottom-right, and a pulsing
  signal-green dot.
*/

export function Divisions() {
  const wrapRef = useRef<HTMLElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const prevScrollYRef = useRef(0);
  const velocityRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  // Scroll-velocity decay loop — writes --scroll-vel as a CSS variable
  // on the divisions outer so descendants (the division icons) can
  // transform in response. Decays toward 0 when the user stops scrolling
  // so the icons "settle" rather than freeze mid-shift.
  useEffect(() => {
    let raf: number;
    const tick = () => {
      velocityRef.current *= 0.86; // exponential decay
      if (Math.abs(velocityRef.current) < 0.05) velocityRef.current = 0;
      if (outerRef.current) {
        // Clamp so a fast flick doesn't throw the icons offscreen
        const v = Math.max(-40, Math.min(40, velocityRef.current));
        outerRef.current.style.setProperty("--scroll-vel", String(v));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current || !trackRef.current) return;

      const scrollY = window.scrollY;
      // Capture instantaneous velocity (delta from last scroll event)
      // The decay loop above eases this toward 0 between events.
      velocityRef.current = scrollY - prevScrollYRef.current;
      prevScrollYRef.current = scrollY;

      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);

      const trackWidth = trackRef.current.scrollWidth;
      const travel = trackWidth - window.innerWidth + 64;
      const startX = window.innerWidth * 0.2;
      const x = startX - p * (travel + startX);
      trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;

      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;

      const idx = Math.min(
        DIVISIONS.length - 1,
        Math.floor(p * DIVISIONS.length),
      );
      setActiveIdx(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="divisions" id="divisions" ref={wrapRef}>
      <div className="divisions-outer" ref={outerRef}>
        <div className="divisions-head">
          <div className="left">
            <span className="eyebrow">
              <span className="marker" />
              <span className="num">02</span> Divisions
            </span>
            <h2>
              Seven disciplines.
              <br />
              <span style={{ fontStyle: "italic", color: "var(--color-silt)" }}>
                One operating discipline.
              </span>
            </h2>
          </div>
          <div className="divisions-progress">
            <span className="label">
              {String(activeIdx + 1).padStart(2, "0")} / 07
            </span>
            <div className="track">
              <div ref={fillRef} className="fill" />
            </div>
          </div>
        </div>

        <div className="divisions-track" ref={trackRef}>
          {DIVISIONS.map((d) => (
            <Link key={d.slug} href={`/practice/${d.slug}`} className="div-card">
              <div className="top">
                <span className="num">{d.num} / 07</span>
                <span className="stripe" style={{ background: d.color }} />
              </div>
              <div className="body-area">
                <h3>{d.name}</h3>
                <p>{d.lede}</p>
                <div className="programs">
                  {d.programs.map((p) => (
                    <span key={p} className="program">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              {/* Icon as its own large row — scroll velocity translates
                  it horizontally via the --scroll-vel CSS variable on the
                  divisions outer. The icon container reads that variable
                  and shifts/leans in response. */}
              <div className="icon-slot">
                <DivisionIcon kind={d.icon} scrollProgress={progress} />
              </div>
              <div className="bottom">
                <span className="open">
                  Open division <span className="arrow">→</span>
                </span>
              </div>
            </Link>
          ))}

          {/* Black-hole CTA card. NOT a Link wrapper — the prominent
              signal-green button inside the body is the only click target.
              Nesting <a> inside <a> would be illegal HTML anyway. */}
          <div className="div-card cta">
            <div className="hole" aria-hidden="true" />
            <div className="signal-ring" aria-hidden="true" />
            <div className="top">
              <span className="num">08 / 07</span>
              <span
                className="stripe"
                style={{ background: "var(--color-signal)" }}
              />
            </div>
            <div className="body-area">
              <h3>
                The first conversation is free.
                <br />
                <span style={{ fontStyle: "italic", color: "var(--color-mist)" }}>
                  Bring the operating problem.
                </span>
              </h3>
              <p>
                Forty-five minutes. No deck. We map the operating problem and
                decide together if there&apos;s a program worth designing.
              </p>
              {/* Prominent lime-green CTA pill — sits right under the body
                  copy per Colin's review. The previous "Begin engagement"
                  link in the bottom corner was buried. */}
              <Link
                href="#contact"
                className="btn btn-signal cta-pill"
              >
                <span>Begin engagement</span>
                <span className="arrow">→</span>
              </Link>
            </div>
            <div className="bottom" />
          </div>
        </div>
      </div>
    </section>
  );
}
