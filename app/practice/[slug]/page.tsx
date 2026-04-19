import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DIVISIONS, getDivision } from "@/content/divisions";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHead } from "@/components/SectionHead";
import { ServiceGrid } from "@/components/ServiceGrid";
import { PillRow } from "@/components/PillRow";
import { EngagementModelCard } from "@/components/EngagementModelCard";
import { PullQuote } from "@/components/PullQuote";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";

type Params = { slug: string };

const ALL_MODELS = ["Retainer", "Project", "Embedded", "Build", "Advisory"] as const;

const MODEL_EXPLANATIONS: Record<string, string> = {
  Retainer: "Ongoing advisory with a monthly cadence, typically 3–12 months.",
  Project: "Scoped deliverable with a defined end date, typically 4–16 weeks.",
  Embedded: "On-site or near-site operational work, typically for operations-heavy engagements.",
  Build: "Deploy a working system, typically 6–16 weeks to production.",
  Advisory: "As-needed counsel without an ongoing retainer commitment.",
};

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) return {};
  return {
    title: division.name,
    description: division.shortDescription,
  };
}

export default async function DivisionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) notFound();

  return (
    <div data-chapter={division.chapter}>
      <Hero
        mode="page"
        chapter={division.chapter}
        eyebrow={`${division.number} / 06 · The Practice`}
        headline={division.name}
        lead={division.positioning}
      />

      {/* What we do */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="What we do"
              title={<>Services in this practice.</>}
            />
          </Reveal>
          <ServiceGrid services={division.services} />
        </Container>
      </section>

      {/* Who we serve */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <PillRow items={division.sectors} label="Who we serve" />
        </Container>
      </section>

      {/* Engagement models */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Engagement models"
              title={<>How we enter.</>}
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ALL_MODELS.map((model, i) => (
              <Reveal key={model} delay={i * 0.04}>
                <EngagementModelCard
                  model={model}
                  description={MODEL_EXPLANATIONS[model]}
                  active={(division.engagementModels as readonly string[]).includes(model)}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Thesis */}
      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-24 md:py-28">
        <Container>
          <Reveal>
            <div className="eyebrow mb-6">The thesis</div>
            <PullQuote quote={division.thesis} chapter={division.chapter} />
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="display-md max-w-[22ch]">
              Ready to discuss{" "}
              {division.shortName ?? division.name}?
            </h2>
            <CTAButton href="/engagement" variant="primary">
              Begin engagement
            </CTAButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
