import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FIRM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Founder",
  description:
    "Colin Highland, PT, DPT, CBA — founder of C Highland Advisory. A career built at the intersection of clinical care, operational leadership, and applied artificial intelligence.",
};

const SECTIONS = [
  {
    label: "I. The Clinician",
    body:
      "Doctor of Physical Therapy with frontline clinical experience. The work of bedside care — the assessment, the hands-on intervention, the daily cadence of documentation — trains a kind of pattern recognition that no MBA curriculum replicates. It teaches you what the chart records versus what actually happened. It teaches you which systems exist to protect patients and which exist to protect the institution. That distinction becomes the spine of every operational engagement that follows.",
  },
  {
    label: "II. The Operator",
    body:
      "Certified Business Architect with multi-site leadership across home health and workforce systems. Operating taught Colin what clinical training could not: the daily reconciliation between margin and mission, intake speed and clinical judgment, growth targets and retention curves. The operator's view is always two-sided — you are never just optimizing one number. Strategy that ignores this trade-off fails on contact with the floor.",
  },
  {
    label: "III. The AI Builder",
    body:
      "Production deployments across healthcare, government, hospitality, home services, and political operations. Voice AI at scale. Workflow automation inside regulated environments. Modular prompting architectures that survive model upgrades and guardrail shifts. Building AI systems for operators — rather than for technologists — means designing for accountability: evaluation loops, fallbacks, human review, measured rollout.",
  },
  {
    label: "The thesis",
    body:
      "The three disciplines are not a résumé. They are a working method. Each informs the others: the clinician's instinct for what happens at the edge of a system; the operator's discipline about what can actually be changed; the builder's bias toward measurable deployment. C Highland Advisory exists to bring all three to a single engagement — because most consequential problems require all three, and most advisors only offer one.",
  },
];

export default function FounderPage() {
  return (
    <>
      <Hero
        headline={
          <>
            A career built at the
            <br />
            <em>intersection.</em>
          </>
        }
        lead="Colin Highland is the founder of C Highland Advisory. His work sits where three disciplines meet — bedside clinical care, operational leadership, and applied artificial intelligence — because he has spent his career doing all three."
      />

      <section
        className="border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-[220px_1fr] md:gap-24">
          <aside>
            <div className="mono-label label-dash mb-6">The record</div>
            <dl
              className="space-y-4 text-[14px]"
              style={{ color: "var(--color-ink-soft)" }}
            >
              <div>
                <dt
                  className="font-mono text-[11px] uppercase"
                  style={{
                    color: "var(--color-ink-mute)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Name
                </dt>
                <dd className="mt-1">{FIRM.founderFull}</dd>
              </div>
              <div>
                <dt
                  className="font-mono text-[11px] uppercase"
                  style={{
                    color: "var(--color-ink-mute)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Credentials
                </dt>
                <dd className="mt-1">
                  Doctor of Physical Therapy · Certified Business Architect
                </dd>
              </div>
              <div>
                <dt
                  className="font-mono text-[11px] uppercase"
                  style={{
                    color: "var(--color-ink-mute)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Based
                </dt>
                <dd className="mt-1">{FIRM.location}</dd>
              </div>
              <div>
                <dt
                  className="font-mono text-[11px] uppercase"
                  style={{
                    color: "var(--color-ink-mute)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Portfolio
                </dt>
                <dd className="mt-1">
                  <a
                    href={FIRM.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                    style={{ color: "var(--color-ink)" }}
                  >
                    colinhighland.com ↗
                  </a>
                </dd>
              </div>
            </dl>
          </aside>

          <article className="space-y-16">
            {SECTIONS.map((section) => (
              <div
                key={section.label}
                className="border-t pt-8"
                style={{ borderTopColor: "var(--color-rule)" }}
              >
                <div
                  className="mono-label label-dash mb-4"
                  style={{ letterSpacing: "0.12em" }}
                >
                  {section.label}
                </div>
                {/* TODO: replace placeholder copy with Colin's longer narrative */}
                <p
                  className="max-w-[68ch] text-[17px] leading-[1.65]"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  {section.body}
                </p>
              </div>
            ))}

            <div
              className="border-t pt-8"
              style={{ borderTopColor: "var(--color-rule)" }}
            >
              <Link
                href={FIRM.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-[12px] uppercase transition-colors hover:text-accent"
                style={{
                  letterSpacing: "0.12em",
                  color: "var(--color-ink)",
                  borderBottom: "1px solid var(--color-ink)",
                  paddingBottom: 2,
                }}
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
