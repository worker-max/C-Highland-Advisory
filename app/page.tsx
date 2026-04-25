import { DIVISIONS } from "@/content/divisions";
import { FIRM, SECTORS } from "@/lib/constants";
import { Container } from "@/components/Container";
import { Emblem } from "@/components/Emblem";
import { PillRow } from "@/components/PillRow";
import { PullQuote } from "@/components/PullQuote";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";
import { ClientsStrip } from "@/components/ClientsStrip";
import { DivisionSection } from "@/components/DivisionSection";

/*
  Homepage — quieter composition.

  Hero: emblem + the approved founder-note sentence + attribution + one CTA.
  Nothing else above the fold. Let the sentence land; let the page breathe.

  Below: proof strip → the six-division practice grid → founder block →
  engagement steps → CTA footer.
*/

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

export default function Home() {
  return (
    <>
      {/* ═════ HERO — emblem, sentence, attribution, one CTA. Nothing else. ═════ */}
      <section className="pt-[180px] pb-[140px] md:pt-[240px] md:pb-[180px]">
        <Container className="flex flex-col items-start gap-14">
          <Reveal>
            <Emblem size={200} title={FIRM.name} />
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="max-w-[30ch] font-sans text-[clamp(28px,3.4vw,48px)] font-medium leading-[1.18] tracking-[-0.02em] text-[color:var(--color-ink)]"
              style={{ textWrap: "balance" as const }}
            >
              I design operational programs across healthcare, talent
              acquisition, contingent workforce, and applied AI — and I
              build them to last.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col gap-8">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--color-silt)]">
                — {FIRM.founderFull} · {FIRM.location} · Est. {FIRM.founded}
              </p>
              <div>
                <CTAButton href="/engagement" variant="primary">
                  Begin engagement
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═════ CLIENTS & AFFILIATIONS — placeholder strip until logo list lands ═════ */}
      <ClientsStrip />

      {/* ═════ SECTORS SERVED ═════ */}
      <section className="py-14 md:py-20">
        <Container>
          <Reveal>
            <PillRow items={SECTORS} label="Working across" />
          </Reveal>
        </Container>
      </section>

      {/* ═════ THE PRACTICE — opening + 7 stacked editorial sections ═════ */}
      <section className="border-t border-[color:var(--color-mist)] pt-24 md:pt-32">
        <Container>
          <Reveal>
            <div className="eyebrow mb-4">The Practice</div>
            <h2 className="max-w-[24ch] font-sans text-[clamp(36px,4.4vw,64px)] font-medium leading-[1.04] tracking-[-0.025em] text-[color:var(--color-ink)]">
              Seven divisions. One operating discipline.
            </h2>
            <p className="mt-6 max-w-[58ch] text-[clamp(17px,1.4vw,20px)] leading-[1.55] text-[color:var(--color-silt)]">
              Six division-tracks plus a dedicated practice for designing
              human-and-AI workforce programs. Each stands alone — but each
              is informed by the same conviction: that the gap between
              frontline reality and executive decision-making is where most
              strategy quietly fails.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Each division as its own full-width editorial section. */}
      {DIVISIONS.map((division, i) => (
        <DivisionSection
          key={division.slug}
          division={division}
          index={i}
          total={DIVISIONS.length}
        />
      ))}

      {/* ═════ THE FOUNDER — pull-quote + three positions ═════ */}
      <section className="border-t border-[color:var(--color-mist)] py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="eyebrow mb-4">The Founder</div>
            <h2 className="max-w-[22ch] font-sans text-[clamp(32px,4vw,56px)] font-medium leading-[1.05] tracking-[-0.025em] text-[color:var(--color-ink)]">
              A career built at the intersection.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <PullQuote
                quote="The best work doesn't come from another framework. It comes from operators who can sit at the bedside, build the spreadsheet, and ship the AI system — and know which one the moment actually calls for."
                attribution={`— ${FIRM.founderFull} · Founder`}
              />
            </Reveal>
            <div className="space-y-4">
              {POSITIONS.map((p, i) => (
                <Reveal key={p.n} delay={0.1 + i * 0.08}>
                  <div className="card p-6 md:p-7">
                    <div className="mono-numeral mb-3">{p.n}</div>
                    <div className="display-sm mb-2">{p.role}</div>
                    <p className="prose-base text-[color:var(--color-silt)]">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═════ HOW ENGAGEMENTS WORK ═════ */}
      <section className="border-t border-[color:var(--color-mist)] py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="eyebrow mb-4">How engagements work</div>
            <h2 className="max-w-[24ch] font-sans text-[clamp(32px,4vw,56px)] font-medium leading-[1.05] tracking-[-0.025em] text-[color:var(--color-ink)]">
              Three steps. No deck required.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.1}>
                <div className="card p-6 md:p-8">
                  <div className="mono-numeral mb-4">{step.n}</div>
                  <div className="display-sm mb-3">{step.label}</div>
                  <p className="prose-base text-[color:var(--color-silt)]">
                    {step.dek}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═════ CTA FOOTER ═════ */}
      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-28 md:py-40">
        <Container className="flex flex-col items-start gap-10">
          <Reveal>
            <h2 className="max-w-[22ch] font-sans text-[clamp(36px,4.8vw,68px)] font-medium leading-[1.05] tracking-[-0.025em] text-[color:var(--color-ink)]">
              When the next decision has to survive contact with reality.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <CTAButton href="/engagement" variant="primary">
              Begin engagement
            </CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
