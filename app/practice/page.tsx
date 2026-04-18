import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { DivisionsLedger } from "@/components/DivisionsLedger";
import { SectorPills } from "@/components/SectorPills";
import { SECTORS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "A single firm. Six disciplines. One operating thesis — each division below stands as its own practice area, unified by method rather than sector.",
};

export default function PracticePage() {
  return (
    <>
      <Hero
        headline={
          <>
            A single firm. Six disciplines.
            <br />
            <em>One operating thesis.</em>
          </>
        }
        lead="Each division below stands as its own practice area — with its own clients, engagement models, and deliverables. They are unified not by sector but by method: frontline reality, translated into operational systems, deployed with discipline. Engagements often begin in one division and extend across the others."
      />

      <section
        className="border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <DivisionsLedger />
        <SectorPills sectors={SECTORS} />

        <div
          className="mt-20 grid grid-cols-1 items-start gap-8 border-t pt-12 md:grid-cols-[1fr_2fr] md:gap-20"
          style={{ borderTopColor: "var(--color-rule)" }}
        >
          <div className="mono-label label-dash">How engagements work</div>
          <div>
            <p
              className="max-w-[60ch] text-[17px] leading-[1.65]"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Every engagement begins with a brief — a short, structured conversation
              to understand what you&apos;re trying to decide, build, or fix. From
              there, we scope.
            </p>
            <Link
              href="/engagement"
              className="mt-6 inline-block font-mono text-[11px] uppercase transition-colors"
              style={{
                color: "var(--color-ink)",
                letterSpacing: "0.12em",
                borderBottom: "1px solid var(--color-ink)",
                paddingBottom: 2,
              }}
            >
              How we work →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
