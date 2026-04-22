import { DIVISIONS } from "@/content/divisions";
import { FIRM, SECTORS } from "@/lib/constants";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHead } from "@/components/SectionHead";
import { DivisionCard } from "@/components/DivisionCard";
import { PillRow } from "@/components/PillRow";
import { PullQuote } from "@/components/PullQuote";
import { StepFlow } from "@/components/StepFlow";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";
import {
  PracticeIcon,
  FounderIcon,
  AdoptionIcon,
  HumanAITeammateIcon,
} from "@/components/icons";

const ENGAGEMENT_STEPS = [
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

const POSITIONS = [
  {
    n: "01",
    role: "Clinician",
    text: "Doctor of Physical Therapy with frontline clinical experience.",
  },
  {
    n: "02",
    role: "Operator",
    text: "Certified Business Architect with multi-site leadership across home health and workforce systems.",
  },
  {
    n: "03",
    role: "AI Builder",
    text: "Production deployments across healthcare, government, hospitality, and home services.",
  },
];

export default function Home() {
  return (
    <>
      {/*
        HOTFIX: hero-overflow patch only. Overall hero composition is being
        reconsidered via the design research pass — do not polish this further.
      */}
      <section className="relative overflow-hidden pt-[140px] pb-[96px] md:pt-[180px] md:pb-[120px]">
        {/* ChapterBand removed inline: it was fighting the long manifesto. */}
        <Container>
          <Reveal>
            <p
              className="mb-10 max-w-[58ch] font-sans text-[clamp(32px,3.6vw,56px)] font-medium leading-[1.1] tracking-[-0.02em] text-[color:var(--color-ink)]"
              style={{ textWrap: "balance" as const }}
            >
              I design operational programs across healthcare, talent
              acquisition, contingent workforce, and applied AI — and I
              build them to last.
            </p>
            <p className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-[color:var(--color-silt)]">
              — {FIRM.founderFull} · {FIRM.location} · Est. {FIRM.founded}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CTAButton href="/engagement" variant="primary">
                Begin engagement
              </CTAButton>
              <CTAButton href="/practice" variant="secondary">
                View practice
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Proof strip */}
      <section className="border-t border-[color:var(--color-mist)] py-12 md:py-16">
        <Container>
          <PillRow items={SECTORS} label="Working across" />
        </Container>
      </section>

      {/* The Practice */}
      <section className="py-20 md:py-24">
        <Container>
          <Reveal>
            <div className="mb-6">
              <PracticeIcon size={72} />
            </div>
            <SectionHead
              eyebrow="The Practice"
              title={<>Six disciplines. One operating thesis.</>}
              lead="Each division stands alone — but each is informed by the same conviction: that the gap between frontline reality and executive decision-making is where most strategy quietly fails."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIVISIONS.map((division, i) => (
              <Reveal key={division.slug} delay={i * 0.06}>
                <DivisionCard division={division} totalCount={DIVISIONS.length} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The Founder */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <div className="mb-6">
              <FounderIcon size={72} />
            </div>
            <SectionHead
              eyebrow="The Founder"
              title={<>A career built at the intersection.</>}
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <PullQuote
                quote="The best work doesn't come from another framework. It comes from operators who can sit at the bedside, build the spreadsheet, and ship the AI system — and know which one the moment actually calls for."
                attribution={`— ${FIRM.founderFull} · Founder`}
              />
              <div className="mt-8 flex items-center gap-3 text-[13px] font-medium text-[color:var(--color-silt)]">
                <HumanAITeammateIcon size={48} />
                <span>Signature framework: human-and-AI teammate adoption.</span>
              </div>
            </Reveal>
            <div className="space-y-4">
              {POSITIONS.map((p, i) => (
                <Reveal key={p.n} delay={0.1 + i * 0.08}>
                  <div className="card p-6 md:p-7">
                    <div className="mono-numeral mb-3">{p.n}</div>
                    <div className="display-sm mb-2">{p.role}</div>
                    <p className="prose-base text-[color:var(--color-silt)]">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* How engagements work */}
      <section className="py-20 md:py-24">
        <Container>
          <Reveal>
            <div className="mb-6">
              <AdoptionIcon size={72} />
            </div>
            <SectionHead
              eyebrow="How engagements work"
              title={<>Three steps. No deck required.</>}
              lead="Engagements begin with a brief — a short, structured conversation. From there, we scope. Programs are designed to hold — past the launch, past the next manager turnover."
            />
          </Reveal>
          <StepFlow steps={ENGAGEMENT_STEPS} />
        </Container>
      </section>

      {/* CTA footer block */}
      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-24 md:py-32">
        <Container className="text-center">
          <Reveal>
            <h2 className="display-lg mx-auto max-w-[22ch]">
              When the next decision has to{" "}
              survive contact with reality.            </h2>
            <div className="mt-10 flex justify-center">
              <CTAButton href="/engagement" variant="primary">
                Begin engagement
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
