import Link from "next/link";
import { FIRM } from "@/lib/constants";
import { CTAButton } from "./CTAButton";
import { Logo } from "./Logo";

/*
  Von Lyncker-pattern pill nav.

  The previous build was a full-width sticky bar that visually pressed
  on the content beneath it (backdrop blur over warm-bone made every page's
  upper content look murky). This iteration converts to a floating pill:

    - Outer wrapper: position fixed, top:0, padding 24px / 32px (3rem at md+)
      So the pill itself is INSET from the viewport edges by ~32px on each
      side and ~24-32px from the top.
    - Pill: 16px border-radius, 64px tall, backdrop-filter blur(28px),
      semi-transparent bone bg, hairline white border at 12% opacity.
    - 3-region layout: [logo + tight wordmark] · [centered nav links] · [CTA]

  The result is a contained chip floating inside the viewport, with
  generous breathing space above + lateral. Content underneath is
  visually unhindered because the pill is bounded, not edge-to-edge.

  Body padding (homepage hero pt + Hero.tsx pt) is calibrated to clear
  the pill (top inset + pill height = ~96px on md) plus visual breathing
  room (an additional 100-200px before the headline starts).
*/

const LINKS = [
  { href: "/practice", label: "Practice" },
  { href: "/founder", label: "Founder" },
  { href: "/transmissions", label: "Transmissions" },
  { href: "/engagement", label: "Engagement" },
];

export function Nav() {
  return (
    <header
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-[101] px-4 pt-4 sm:px-6 md:px-8 md:pt-6"
    >
      <nav
        className="mx-auto flex h-14 items-center gap-3 rounded-2xl border border-white/30 px-3 pl-4 pr-2 shadow-[0_8px_32px_-12px_rgba(15,15,16,0.18)] backdrop-blur-2xl md:h-16 md:px-5 md:pl-6 md:pr-3"
        style={{
          // Warm-bone at 65% with subtle inner highlight; backdrop-blur does
          // the heavy lift so anything behind the pill reads as "frosted."
          backgroundColor: "rgba(238, 238, 231, 0.72)",
        }}
      >
        {/* LEFT — symbol + tight wordmark. The wordmark inside the pill is
            quieter than the previous version: just "C HIGHLAND" mono caps
            with wide tracking. The hero is where the full mark lives. */}
        <Link
          href="/"
          aria-label={FIRM.name}
          className="group flex shrink-0 items-center gap-2 text-[color:var(--color-ink)]"
        >
          <Logo size={36} variant="symbol" title={FIRM.name} />
          <span
            className="hidden font-mono text-[10px] uppercase text-[color:var(--color-graphite)] sm:inline"
            style={{ letterSpacing: "0.22em" }}
          >
            C&nbsp;Highland
          </span>
        </Link>

        {/* CENTER — nav links. Auto-hidden on small screens, replaced by
            a quieter mobile affordance later if needed. */}
        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 text-[13px] text-[color:var(--color-graphite)] transition-colors hover:bg-white/40 hover:text-[color:var(--color-ink)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT — CTA. Compact-padded so it sits comfortably inside the
            pill (default 14px py would crowd a 56px-tall pill). */}
        <div className="ml-auto md:ml-2">
          <CTAButton
            href="/engagement"
            variant="primary"
            className="!px-5 !py-2.5 !text-[13px]"
          >
            Begin engagement
          </CTAButton>
        </div>
      </nav>
    </header>
  );
}
