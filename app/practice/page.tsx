import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { DivisionsLedger } from "@/components/DivisionsLedger";
import { SectorPills } from "@/components/SectorPills";
import { Reveal } from "@/components/Reveal";
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
            A single firm. Six disciplines. <em>One operating thesis.</em>
          </>
        }
        lead="Each division below stands as its own practice area — with its own clients, engagement models, and deliverables. They are unified not by sector but by method: frontline reality, translated into operational systems, deployed with discipline. Engagements often begin in one division and extend across the others."
      />

      <section
        className="border-t px-6 py-20 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <DivisionsLedger />
        <SectorPills sectors={SECTORS} />

        {/* Closing pull-line: one oversized sentence, no columns. */}
        <Reveal>
          <div
            className="mt-20 border-t pt-12"
            style={{ borderTopColor: "var(--color-rule)" }}
          >
            <div className="mono-label label-dash mb-6">How engagements work</div>
            <p
              className="max-w-[22ch] headline-display"
              style={{
                fontSize: "clamp(40px, 5.5vw, 80px)",
                fontWeight: 250,
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
              }}
            >
              Begin with a brief. From a brief, a <em>scope.</em>
            </p>
            <Link href="/engagement" className="link-rule mt-8">
              How we work →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
