import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { FIRM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Founder",
  description:
    "Colin Highland, PT, DPT, CBA — founder of C Highland Advisory. A career built at the intersection of clinical care, operational leadership, and applied artificial intelligence.",
};

const CHAPTERS = [
  {
    n: "01",
    label: "Clinician",
    chapterKey: "healthcare" as const,
    body: "Doctor of Physical Therapy with frontline clinical experience. The work of bedside care trains a kind of pattern recognition no MBA curriculum replicates — the gap between what the chart records and what actually happened, the systems that exist to protect patients versus the ones that exist to protect the institution.",
  },
  {
    n: "02",
    label: "Operator",
    chapterKey: "homehealth" as const,
    body: "Certified Business Architect with multi-site leadership across home health and workforce systems. Operating teaches what clinical training cannot: the daily reconciliation between margin and mission, intake speed and clinical judgment, growth targets and retention curves.",
  },
  {
    n: "03",
    label: "AI Builder",
    chapterKey: "ai" as const,
    body: "Production deployments across healthcare, government, hospitality, home services, and political operations. Voice AI at scale. Workflow automation inside regulated environments. Modular prompting architectures that survive model upgrades and guardrail shifts.",
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
  { label: "Based", items: [FIRM.location] },
  { label: "Also at", items: ["colinhighland.com — writing, portfolio, editorial"] },
  { label: "Speaking", items: ["— forthcoming"], muted: true },
  { label: "Publications", items: ["— forthcoming"], muted: true },
];

export default function FounderPage() {
  return (
    <>
      <Hero
        eyebrow="The Founder"
        headline={
          <>
            A career built at the <em>intersection.</em>
          </>
        }
        lead="Colin Highland is the founder of C Highland Advisory. His work sits where three disciplines meet — bedside clinical care, operational leadership, and applied artificial intelligence — because he has spent his career doing all three."
      />

      {/* Three chapters alternating */}
      {CHAPTERS.map((ch, idx) => (
        <section
          key={ch.n}
          className="border-t border-[color:var(--color-mist)] py-20 md:py-24"
        >
          <Container>
            <div
              className={`grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 ${
                idx % 2 === 1 ? "md:[&>:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div
                  className="card h-full min-h-[280px] overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, var(--color-ch-${ch.chapterKey}) 0%, var(--color-paper) 120%)`,
                    opacity: 0.92,
                  }}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <div>
                  <div className="mono-numeral mb-4">{ch.n}</div>
                  <h2 className="display-md mb-6">{ch.label}</h2>
                  <p className="prose-base max-w-[58ch] text-[color:var(--color-silt)]">
                    {ch.body}
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ))}

      {/* Colophon */}
      <section className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper)] py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHead eyebrow="Colophon" title="The record." />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COLOPHON.map((group) => (
              <div key={group.label} className="card p-6">
                <div className="eyebrow mb-3">{group.label}</div>
                <ul
                  className="space-y-1.5 text-[15px] leading-snug"
                  style={{
                    color: group.muted
                      ? "var(--color-silt)"
                      : "var(--color-graphite)",
                  }}
                >
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href={FIRM.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta cta-ghost"
            >
              For writing, portfolio, and editorial, see colinhighland.com ↗
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
