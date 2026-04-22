import Link from "next/link";
import { DIVISIONS } from "@/content/divisions";
import { FIRM, SECTORS } from "@/lib/constants";
import { Container } from "@/components/Container";
import { Emblem } from "@/components/Emblem";
import { PillRow } from "@/components/PillRow";
import { PullQuote } from "@/components/PullQuote";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";
import { chapterColor } from "@/lib/chapters";

/*
  Homepage rebuilt TBC-style:
   * Centered emblem above generous negative space
   * Numbered proposition statement
   * Four chapter rows (00–03) = the practice directory
   * Founder-note paragraph lives lower as colophon
   * Everything below flows naturally from the directory
*/

// The four practice tracks Colin surfaces at the hero, in chapter order.
// Each picks the matching Division from content to stay in sync.
const PRACTICE_CHAPTERS: Array<{
  n: string;
  label: string;
  divisionSlug: string;
}> = [
  { n: "00", label: "Healthcare operations", divisionSlug: "home-health-operations" },
  { n: "01", label: "Talent acquisition", divisionSlug: "talent-acquisition" },
  { n: "02", label: "Contingent workforce", divisionSlug: "talent-acquisition" },
  { n: "03", label: "Applied AI adoption", divisionSlug: "ai-practice" },
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
      {/* ═════ HERO — emblem, proposition, chapter directory ═════ */}
      <section className="relative pt-[160px] pb-[96px] md:pt-[220px] md:pb-[140px]">
        <Container className="flex flex-col items-center text-center">
          <Reveal>
            <Emblem size={220} title={FIRM.name} />
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="mt-14 max-w-[22ch] font-sans text-[clamp(32px,4.2vw,60px)] font-medium leading-[1.05] tracking-[-0.025em] text-[color:var(--color-ink)]"
              style={{ textWrap: "balance" as const }}
            >
              Four practices. One operating discipline.
            </h1>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.55] text-[color:var(--color-silt)]">
              Operational programs designed by an operator — built to hold
              past the first quarter, the tenth manager turnover, and the
              model upgrade.
            </p>
          </Reveal>

          {/* Chapter directory — four rows, each a deep link. */}
          <Reveal delay={0.2}>
            <ol className="mt-16 w-full max-w-[680px] list-none divide-y divide-[color:var(--color-mist)] border-y border-[color:var(--color-mist)] text-left">
              {PRACTICE_CHAPTERS.map((ch) => {
                const division = DIVISIONS.find((d) => d.slug === ch.divisionSlug);
                const tintColor = division ? chapterColor(division.chapter) : "var(--color-ink)";
                return (
                  <li key={ch.n}>
                    <Link
                      href={`/practice/${ch.divisionSlug}`}
                      data-chapter={division?.chapter}
                      className="group flex items-center gap-6 py-5 transition-colors hover:text-[color:var(--color-ink)]"
                    >
                      <span className="font-mono text-[13px] tracking-[0.12em] text-[color:var(--color-silt)]">
                        {ch.n}
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-block h-[2px] w-8 shrink-0 transition-[width,background] duration-200 group-hover:w-16"
                        style={{ background: tintColor }}
                      />
                      <span className="flex-1 text-[clamp(20px,2.2vw,28px)] font-medium leading-[1.2] tracking-[-0.01em] text-[color:var(--color-ink)]">
                        {ch.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-[20px] text-[color:var(--color-silt)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[color:var(--color-ink)]"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <CTAButton href="/engagement" variant="primary">
                Begin engagement
              </CTAButton>
              <CTAButton href="/practice" variant="secondary">
                View the full practice
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═════ SECTORS — low-key proof strip ═════ */}
      <section className="border-t border-[color:var(--color-mist)] py-14 md:py-20">
        <Container>
          <Reveal>
            <PillRow items={SECTORS} label="Working across" />
          </Reveal>
        </Container>
      </section>

      {/* ═════ FOUNDER-NOTE — the 24-word sentence now earns its role as prose ═════ */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-28">
        <Container className="max-w-[820px]">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-silt)]">
              — Founder note
            </div>
            <p
              className="mt-8 text-[clamp(22px,2.4vw,32px)] font-normal leading-[1.45] tracking-[-0.015em] text-[color:var(--color-ink)]"
              style={{ textWrap: "balance" as const }}
            >
              I design operational programs across healthcare, talent
              acquisition, contingent workforce, and applied AI — and I
              build them to last.
            </p>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-[color:var(--color-silt)]">
              {FIRM.founderFull} · {FIRM.location} · Est. {FIRM.founded}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ═════ THE FOUNDER — expanded block (pull-quote + 3 positions) ═════ */}
      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="eyebrow mb-6">A career built at the intersection</div>
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
                    <p className="prose-base text-[color:var(--color-silt)]">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═════ CTA FOOTER ═════ */}
      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-24 md:py-32">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] font-sans text-[clamp(36px,4.8vw,68px)] font-medium leading-[1.02] tracking-[-0.03em] text-[color:var(--color-ink)]">
              When the next decision has to survive contact with reality.
            </h2>
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
