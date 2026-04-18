import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { FIRM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Founder",
  description:
    "Colin Highland, PT, DPT, CBA — founder of C Highland Advisory. A career built at the intersection of clinical care, operational leadership, and applied artificial intelligence.",
};

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

/*
  TODO: Colin to supply longer biographical narrative; the four ORDINALS slots
  below carry voice-matched placeholder prose so layout + rhythm are real.
*/
const ORDINALS = [
  {
    n: "§ I",
    label: "The Clinician",
    body:
      "Doctor of Physical Therapy; frontline clinical experience. The work of bedside care trains a pattern recognition no MBA curriculum replicates — the gap between what the chart records and what actually happened, the systems that exist to protect patients versus the ones that exist to protect the institution. That distinction becomes the spine of every operational engagement that follows.",
  },
  {
    n: "§ II",
    label: "The Operator",
    body:
      "Certified Business Architect with multi-site leadership across home health and workforce systems. Operating teaches what clinical training cannot: the daily reconciliation between margin and mission, intake speed and clinical judgment, growth targets and retention curves. The operator's view is always two-sided — you are never optimizing one number. Strategy that ignores that trade-off fails on contact with the floor.",
  },
  {
    n: "§ III",
    label: "The AI Builder",
    body:
      "Production deployments across healthcare, government, hospitality, home services, and political operations. Voice AI at scale. Workflow automation inside regulated environments. Modular prompting architectures that survive model upgrades and guardrail shifts. Building AI systems for operators — rather than for technologists — means designing for accountability: evaluation loops, fallbacks, human review, measured rollout.",
  },
  {
    n: "§ IV",
    label: "The thesis",
    body:
      "The three disciplines are not a résumé. They are a working method. Each informs the others: the clinician's instinct for what happens at the edge of a system; the operator's discipline about what can actually be changed; the builder's bias toward measurable deployment. C Highland Advisory exists to bring all three to a single engagement — because most consequential problems require all three, and most advisors only offer one.",
  },
];

const COLOPHON = [
  {
    label: "Credentials",
    items: [
      "Doctor of Physical Therapy (DPT)",
      "Certified Business Architect (CBA)",
      "Licensed Physical Therapist (PT)",
    ],
  },
  {
    label: "Based",
    items: [FIRM.location],
  },
  {
    label: "Also at",
    items: ["colinhighland.com — writing, portfolio, editorial"],
  },
  {
    label: "Speaking",
    items: ["— forthcoming"],
    muted: true,
  },
  {
    label: "Publications",
    items: ["— forthcoming"],
    muted: true,
  },
];

export default function FounderPage() {
  return (
    <>
      <Hero
        headline={
          <>
            A career built at the <em>intersection.</em>
          </>
        }
        lead="Colin Highland is the founder of C Highland Advisory. His work sits where three disciplines meet — bedside clinical care, operational leadership, and applied artificial intelligence — because he has spent his career doing all three."
      />

      {/* POSITIONS — the I/II/III signature block, rendered here in paper tone. */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <Reveal>
          <div className="mono-label label-dash mb-10">Three disciplines</div>
        </Reveal>
        <div
          className="grid gap-px"
          style={{ background: "var(--color-rule)" }}
        >
          {POSITIONS.map((row, i) => (
            <Reveal key={row.n} delay={0.1 + i * 0.08}>
              <div
                className="grid grid-cols-[auto_1fr] items-baseline gap-8 py-6 md:gap-10"
                style={{ background: "var(--color-paper)" }}
              >
                <div
                  className="mono-numeral"
                  style={{
                    color: "var(--color-accent)",
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
                      fontSize: "clamp(20px, 2vw, 24px)",
                      lineHeight: 1.3,
                      letterSpacing: "-0.02em",
                      color: "var(--color-ink)",
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
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    {row.text}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ORDINAL essay sections + colophon index */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-[220px_1fr] md:gap-24">
          <aside className="space-y-10">
            <div className="mono-label label-dash">Colophon</div>
            {COLOPHON.map((group) => (
              <div
                key={group.label}
                className="section-rule pt-4"
              >
                <div className="mono-label" style={{ letterSpacing: "0.12em" }}>
                  {group.label}
                </div>
                <ul
                  className="mt-3 space-y-1.5 text-[14px] leading-[1.5]"
                  style={{
                    color: group.muted
                      ? "var(--color-ink-mute)"
                      : "var(--color-ink-soft)",
                  }}
                >
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          <article className="space-y-16">
            {ORDINALS.map((section) => (
              <Reveal key={section.label}>
                <div
                  className="border-t pt-8"
                  style={{ borderTopColor: "var(--color-rule)" }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="mono-numeral"
                      style={{
                        color: "var(--color-accent)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {section.n}
                    </span>
                    <h3
                      className="section-title"
                      style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
                    >
                      {section.label}
                    </h3>
                  </div>
                  <p
                    className="mt-6 max-w-[68ch] text-[17px] leading-[1.7]"
                    style={{ color: "var(--color-ink-soft)", fontWeight: 300 }}
                  >
                    {section.body}
                  </p>
                </div>
              </Reveal>
            ))}

            <div
              className="border-t pt-8"
              style={{ borderTopColor: "var(--color-rule)" }}
            >
              <Link
                href={FIRM.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-rule"
              >
                For writing, portfolio, and editorial, see colinhighland.com ↗
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
