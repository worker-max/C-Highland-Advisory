import { Hero } from "@/components/Hero";
import { SectionHead } from "@/components/SectionHead";
import { DivisionsLedger } from "@/components/DivisionsLedger";
import { SectorPills } from "@/components/SectorPills";
import { FounderQuote } from "@/components/FounderQuote";
import { Reveal } from "@/components/Reveal";
import { FIRM, SECTORS } from "@/lib/constants";

const POSITIONS = [
  {
    n: "I.",
    role: "Clinician",
    text: "Doctor of Physical Therapy with frontline clinical experience.",
  },
  {
    n: "II.",
    role: "Operator",
    text: "Certified Business Architect with multi-site leadership across home health and workforce systems.",
  },
  {
    n: "III.",
    role: "AI Builder",
    text: "Production deployments across healthcare, government, hospitality, and home services.",
  },
];

export default function Home() {
  return (
    <>
      <Hero
        meta={[
          { label: "EST.", value: `${FIRM.founded}, ${FIRM.location}` },
          { label: "DISCIPLINE", value: FIRM.discipline },
          { label: "FOUNDER", value: FIRM.founderFull },
        ]}
        headline={
          <>
            The space where <em>clinical intuition</em>, operational{" "}
            <span className="rule-under">discipline</span>, and applied AI converge.
          </>
        }
        lead="C Highland Advisory partners with leaders across healthcare, government, hospitality, and the industries that run them — translating frontline reality into operational systems and deploying artificial intelligence where it actually creates leverage. One firm. Six disciplines. A single point of view."
        primaryCta={{ label: "Begin engagement", href: "/engagement" }}
        secondaryCta={{ label: "View practice", href: "/practice" }}
      />

      {/* THE PRACTICE */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <Reveal>
          <SectionHead
            label="The Practice"
            title={
              <>
                Six disciplines. <em>One operating thesis.</em>
              </>
            }
            desc="Each division stands alone — but each is informed by the same conviction: that the gap between frontline reality and executive decision-making is where most strategy quietly fails. Engagements may begin in any one division and extend across the others as needed."
          />
        </Reveal>

        <DivisionsLedger />
        <SectorPills sectors={SECTORS} />
      </section>

      {/* THE FOUNDER (inverted, dark) */}
      <section
        className="dark-section border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{ borderTopColor: "var(--color-ink)" }}
      >
        <Reveal>
          <SectionHead
            label="The Founder"
            title={
              <>
                A career built at the <em>intersection.</em>
              </>
            }
            inverted
          />
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal delay={0.1}>
            <FounderQuote
              quote="The best work doesn't come from another framework. It comes from operators who can sit at the bedside, build the spreadsheet, and ship the AI system — and know which one the moment actually calls for."
              attribution={`— ${FIRM.founderFull} · Founder`}
            />
          </Reveal>

          <div
            className="grid gap-px"
            style={{ background: "rgba(200,211,203,0.2)" }}
          >
            {POSITIONS.map((row, i) => (
              <Reveal key={row.n} delay={0.2 + i * 0.08}>
                <div
                  className="grid grid-cols-[auto_1fr] items-baseline gap-8 py-6 md:gap-10"
                  style={{ background: "var(--color-ink)" }}
                >
                  <div
                    className="mono-numeral"
                    style={{
                      color: "var(--color-accent-soft)",
                      letterSpacing: "0.1em",
                      fontSize: 11,
                    }}
                  >
                    {row.n}
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        fontVariationSettings: '"opsz" 48',
                        fontSize: "clamp(20px, 2vw, 26px)",
                        lineHeight: 1.25,
                        letterSpacing: "-0.02em",
                        color: "var(--color-paper)",
                      }}
                    >
                      {row.role} —{" "}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: 17,
                        lineHeight: 1.55,
                        color: "var(--color-accent-soft)",
                      }}
                    >
                      {row.text}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
