import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHead } from "@/components/SectionHead";
import { StepFlow } from "@/components/StepFlow";
import { EngagementModelCard } from "@/components/EngagementModelCard";
import { BriefForm } from "@/components/BriefForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Engagement",
  description:
    "How we work with C Highland Advisory. Retainer, project, embedded, and build engagements — beginning with a short structured brief.",
};

const MODELS = [
  {
    label: "Retainer",
    body: "Ongoing advisory with a monthly cadence, typically 3–12 months.",
  },
  {
    label: "Project",
    body: "Scoped deliverable with a defined end date, typically 4–16 weeks.",
  },
  {
    label: "Embedded",
    body: "On-site or near-site operational work for operations-heavy engagements.",
  },
  {
    label: "Build",
    body: "Deploy a working system, typically 6–16 weeks to production.",
  },
];

const STEPS = [
  {
    n: "01",
    label: "You submit a brief",
    dek: "A short, structured conversation. No deck required.",
  },
  {
    n: "02",
    label: "We respond within three days",
    dek: "If there is a fit, we schedule a thirty-minute call.",
  },
  {
    n: "03",
    label: "We send a proposed scope",
    dek: "Within a week of the call, you have a scope in hand.",
  },
];

export default function EngagementPage() {
  return (
    <>
      <Hero
        eyebrow="Engagement"
        headline={<>How we work.</>}
        lead="Engagements begin with a brief — a short, structured conversation to understand what you are trying to decide, build, or fix. From there, we scope."
      />

      {/* Four models */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Engagement models"
              title={<>Four models. One method.</>}
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MODELS.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.06}>
                <EngagementModelCard model={m.label} description={m.body} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The brief + form */}
      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <Reveal>
              <SectionHead
                eyebrow="The brief"
                title={<>Thirty minutes. No deck required.</>}
                lead="We will ask what you are trying to decide, what has and has not worked, and what success looks like. We will tell you whether we are the right firm — and if we are not, we will tell you who might be."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <BriefForm />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What happens next */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="What happens next"
              title={<>Three steps. Nothing theatrical.</>}
            />
          </Reveal>
          <StepFlow steps={STEPS} />
        </Container>
      </section>
    </>
  );
}
