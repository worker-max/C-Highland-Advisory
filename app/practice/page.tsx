import type { Metadata } from "next";
import { DIVISIONS } from "@/content/divisions";
import { SECTORS } from "@/lib/constants";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { DivisionCard } from "@/components/DivisionCard";
import { PillRow } from "@/components/PillRow";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "A single firm. Six disciplines. One operating thesis — each division stands as its own practice area, unified by method rather than sector.",
};

export default function PracticePage() {
  return (
    <>
      <Hero
        headline={
          <>
            Six disciplines. One operating thesis.          </>
        }
        lead="Each division below stands as its own practice area — with its own clients, engagement models, and deliverables. They are unified not by sector but by method: frontline reality, translated into operational systems, deployed with discipline."
      />

      <section className="pb-20 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {DIVISIONS.map((division, i) => (
              <Reveal key={division.slug} delay={i * 0.06}>
                <DivisionCard division={division} totalCount={DIVISIONS.length} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <PillRow items={SECTORS} label="Sectors served" />
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-24 md:py-28">
        <Container>
          <Reveal>
            <h2 className="display-lg max-w-[24ch]">
              Begin with a brief. From a brief, a scope.            </h2>
            <div className="mt-10">
              <CTAButton href="/engagement" variant="primary">
                How we work
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
