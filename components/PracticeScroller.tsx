"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DIVISIONS } from "@/content/divisions";
import { DotIcon, DIVISION_DOT_PATTERNS } from "./DotIcon";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

/*
  Horizontal-scroll Practice — Von Lyncker beratungsfelder pattern.

  Each of the 7 divisions is one snap-aligned card in a horizontal
  scroller. The next card peeks visibly at the right edge so "there's
  more" is the affordance — no scrollbar, no banner. The final card
  resolves as a black-panel CTA ("the black hole"), the consultation
  call-to-action that lives at the end of the journey.

  Affordances:
   * Cards: lime dot-pattern icon at top, then division name + short
     description, then "Explore →" deep link
   * Scroll: smooth, snap-mandatory, hidden scrollbar
   * Indicator: small mono progress label "Card N of 8" updates on scroll
   * Arrow controls: visible on desktop, advance one card at a time
*/

export function PracticeScroller() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = DIVISIONS.length + 1; // +1 for the black-hole card

  // Track scroll position to update the indicator
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const cardWidth = el.scrollWidth / totalCards;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, totalCards - 1));
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [totalCards]);

  function scrollByCard(dir: -1 | 1) {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.82;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  }

  return (
    <section className="border-t border-[color:var(--color-mist)] py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
            <div>
              <div className="eyebrow mb-3">— The Practice</div>
              <h2 className="max-w-[26ch] font-sans text-[clamp(36px,4.6vw,68px)] font-medium leading-[1.04] tracking-[-0.025em] text-[color:var(--color-ink)]">
                Seven divisions. One operating discipline.
              </h2>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous division"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-mist)] text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-ink)] disabled:opacity-30"
                disabled={activeIndex === 0}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next division"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-mist)] text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-ink)] disabled:opacity-30"
                disabled={activeIndex >= totalCards - 1}
              >
                →
              </button>
            </div>
          </div>
        </Reveal>
      </Container>

      <div
        ref={scrollRef}
        className="scroll-no-bar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2 md:gap-8 md:px-12"
        style={{ scrollSnapStop: "always" }}
      >
        {DIVISIONS.map((division, i) => (
          <DivisionCard key={division.slug} division={division} index={i} />
        ))}
        <BlackHoleCard />
      </div>

      <Container className="mt-8 flex items-center justify-between md:mt-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-silt)]">
          {String(Math.min(activeIndex + 1, totalCards)).padStart(2, "0")} / {String(totalCards).padStart(2, "0")} ·
          {activeIndex < DIVISIONS.length
            ? ` ${DIVISIONS[activeIndex]?.name ?? ""}`
            : " Schedule a consultation"}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {Array.from({ length: totalCards }).map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="h-[2px] w-6 transition-colors"
              style={{
                background:
                  i === activeIndex
                    ? "var(--color-lime)"
                    : "var(--color-mist)",
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── individual division card ──────────────────────────────────────── */

type DivisionCardProps = {
  division: (typeof DIVISIONS)[number];
  index: number;
};

function DivisionCard({ division, index }: DivisionCardProps) {
  const dots = DIVISION_DOT_PATTERNS[division.chapter];
  const num = String(index + 1).padStart(2, "0");
  const total = String(DIVISIONS.length).padStart(2, "0");

  return (
    <Link
      href={`/practice/${division.slug}`}
      data-chapter={division.chapter}
      className="group relative flex min-h-[460px] w-[82vw] max-w-[440px] flex-shrink-0 snap-start flex-col justify-between overflow-hidden border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-8 transition-colors hover:border-[color:var(--color-ink)] md:min-h-[540px] md:w-[420px] md:p-10"
    >
      <div>
        <DotIcon dots={dots} size={140} />
        <div className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-silt)]">
          {num} / {total}
        </div>
        <h3 className="mt-3 max-w-[18ch] font-sans text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.1] tracking-[-0.015em] text-[color:var(--color-ink)]">
          {division.name}
        </h3>
        <p className="mt-4 max-w-[40ch] text-[15px] leading-[1.55] text-[color:var(--color-silt)]">
          {division.positioning}
        </p>
      </div>

      <div className="mt-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink)]">
        <span>Explore</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </Link>
  );
}

/* ─── black-hole CTA card (final card in scroller) ─────────────────── */

function BlackHoleCard() {
  return (
    <Link
      href="/engagement"
      className="group relative flex min-h-[460px] w-[82vw] max-w-[440px] flex-shrink-0 snap-start flex-col justify-end overflow-hidden p-8 md:min-h-[540px] md:w-[460px] md:p-10"
      style={{
        background:
          "radial-gradient(ellipse 130% 90% at 80% 50%, #000 0%, #050505 60%, #1a1a1a 100%)",
        color: "var(--color-bone)",
      }}
    >
      {/* fading lime dots, drifting toward the black */}
      <div className="absolute right-12 top-12 opacity-60">
        <DotIcon
          dots={[
            { x: 30, y: 30 },
            { x: 50, y: 30, r: 6 },
            { x: 70, y: 30, r: 5 },
            { x: 50, y: 50, r: 4 },
          ]}
          size={120}
          dim
        />
      </div>

      <div className="relative">
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-lime)]">
          — At the edge
        </div>
        <h3 className="max-w-[20ch] font-sans text-[clamp(28px,3vw,40px)] font-medium leading-[1.05] tracking-[-0.02em]">
          The conversation that decides whether to start one.
        </h3>
        <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.55] text-[color:var(--color-mist)]">
          Thirty minutes. No deck required. We&apos;ll tell you whether
          we&apos;re the right firm — and if we&apos;re not, we&apos;ll tell
          you who might be.
        </p>
        <span
          className="mt-8 inline-flex items-center justify-center rounded-full px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] transition-transform group-hover:translate-y-[-1px]"
          style={{
            background: "var(--color-lime)",
            color: "#0a0a0a",
          }}
        >
          Schedule a free consultation →
        </span>
      </div>
    </Link>
  );
}
