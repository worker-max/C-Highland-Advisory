import { Hero } from "@/components/Hero";
import { SectionHead } from "@/components/SectionHead";
import { DivisionsLedger } from "@/components/DivisionsLedger";
import { SectorPills } from "@/components/SectorPills";
import { FounderQuote } from "@/components/FounderQuote";
import { FIRM, SECTORS } from "@/lib/constants";

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
            The space where <em>clinical intuition</em>,<br />
            operational <span className="underline">discipline</span>,<br />
            and applied AI converge.
          </>
        }
        lead="C Highland Advisory partners with leaders across healthcare, government, hospitality, and the industries that run them — translating frontline reality into operational systems and deploying artificial intelligence where it actually creates leverage. One firm. Six disciplines. A single point of view."
        primaryCta={{ label: "Begin engagement", href: "/engagement" }}
        secondaryCta={{ label: "View practice", href: "/practice" }}
      />

      {/* DIVISIONS */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <SectionHead
          label="The Practice"
          title={
            <>
              Six disciplines.
              <br />
              <em>One operating thesis.</em>
            </>
          }
          desc="Each division stands alone — but each is informed by the same conviction: that the gap between frontline reality and executive decision-making is where most strategy quietly fails. Engagements may begin in any one division and extend across the others as needed."
        />

        <DivisionsLedger />
        <SectorPills sectors={SECTORS} />
      </section>

      {/* FOUNDER (inverted) */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{
          background: "var(--color-ink)",
          color: "var(--color-paper)",
          borderTopColor: "var(--color-ink)",
        }}
      >
        <SectionHead
          label="The Founder"
          title={
            <>
              A career built at the
              <br />
              <em>intersection.</em>
            </>
          }
          inverted
        />

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-[100px]">
          <FounderQuote
            quote="The best work doesn't come from another framework. It comes from operators who can sit at the bedside, build the spreadsheet, and ship the AI system — and know which one the moment actually calls for."
            attribution={`— ${FIRM.founderFull} · Founder`}
          />

          <div
            className="grid gap-px"
            style={{ background: "rgba(245, 242, 237, 0.15)" }}
          >
            {[
              {
                n: "I.",
                t: "Clinician — Doctor of Physical Therapy with frontline clinical experience.",
              },
              {
                n: "II.",
                t: "Operator — Certified Business Architect with multi-site leadership across home health and workforce systems.",
              },
              {
                n: "III.",
                t: "AI Builder — production deployments across healthcare, government, hospitality, and home services.",
              },
            ].map((row) => (
              <div
                key={row.n}
                className="grid grid-cols-[auto_1fr] items-baseline gap-8 py-6 md:gap-10"
                style={{ background: "var(--color-ink)" }}
              >
                <div
                  className="font-mono text-[11px]"
                  style={{
                    color: "var(--color-accent-soft)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {row.n}
                </div>
                <div
                  className="font-display text-[20px]"
                  style={{ fontWeight: 300, lineHeight: 1.3 }}
                >
                  {row.t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
