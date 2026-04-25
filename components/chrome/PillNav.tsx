"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";

/*
  PillNav — Von Lyncker-pattern pill nav.

  Layout: CSS grid 1fr auto 1fr — [left links] [centered logo symbol] [right CTA]
  Width: max-width 880px, height 56px, border-radius 999px, backdrop-blur(20px)

  Wordmark hidden in nav. Only the symbol mark (size 32) appears.

  Hover behavior: a JS-driven .nav-bg pill (absolutely positioned white pill)
  animates translateX + width to the rect of the hovered link with a 280ms
  cubic-bezier(0.65, 0, 0.35, 1). On mouseleave (parent ul), opacity → 0.
  This is NOT a CSS :hover — it's measured per-link on mouseenter.

  Mobile (<= 720px): collapse to [symbol] [spacer] [CTA]; hide the link list.
*/

const LINKS = [
  { id: "approach", label: "Approach", href: "/#approach" },
  { id: "divisions", label: "Divisions", href: "/#divisions" },
  { id: "operator", label: "Operator", href: "/#operator" },
  { id: "founder", label: "Founder", href: "/founder" },
];

export function PillNav() {
  const wrapRef = useRef<HTMLUListElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (!hoveredId || !wrapRef.current || !bgRef.current) {
      if (bgRef.current) bgRef.current.style.opacity = "0";
      return;
    }
    const link = wrapRef.current.querySelector<HTMLElement>(
      `[data-id="${hoveredId}"]`,
    );
    if (!link) return;
    const rect = link.getBoundingClientRect();
    const parentRect = wrapRef.current.getBoundingClientRect();
    bgRef.current.style.transform = `translateX(${
      rect.left - parentRect.left
    }px)`;
    bgRef.current.style.width = `${rect.width}px`;
    bgRef.current.style.opacity = "1";
  }, [hoveredId]);

  return (
    <div className="nav-wrap">
      <nav className="nav-pill" aria-label="Primary">
        <ul
          className="nav-links"
          ref={wrapRef}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div ref={bgRef} className="nav-bg" />
          {LINKS.map((l) => (
            <li key={l.id}>
              <Link
                href={l.href}
                data-id={l.id}
                className="nav-link"
                onMouseEnter={() => setHoveredId(l.id)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="nav-symbol" aria-label="Home">
          <Logo size={32} intro="never" />
        </Link>
        <ul className="nav-links right">
          <li>
            <Link href="/#contact" className="nav-cta">
              <span className="dot" />
              <span>Begin engagement</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
