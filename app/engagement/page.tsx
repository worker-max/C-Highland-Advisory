import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { BriefForm } from "@/components/BriefForm";

export const metadata: Metadata = {
  title: "Engagement",
  description:
    "How we work with C Highland Advisory. Retainer, project, embedded, and build engagements — beginning with a short structured brief.",
};

const MODELS = [
  {
    label: "Retainer",
    body: "Ongoing advisory with a monthly cadence, typically 3–12 months. Used when the work is continuous and the counsel is integrated into the leadership rhythm.",
  },
  {
    label: "Project",
    body: "Scoped deliverable with a defined end date, typically 4–16 weeks. Used when the question is specific and the outcome is a named artifact.",
  },
  {
    label: "Embedded",
    body: "On-site or near-site operational work, typically for operations-heavy engagements — ride-alongs, workflow audits, intake call reviews.",
  },
  {
    label: "Build",
    body: "For the AI Practice: deploy a working system, typically 6–16 weeks to production. Prompt architecture, evaluation loops, integration, rollout.",
  },
];

const STEPS = [
  {
    n: "01",
    label: "You submit a brief",
    body: "A short, structured conversation. No deck required.",
  },
  {
    n: "02",
    label: "We respond within 3 business days",
    body: "If there\u2019s a fit, we schedule a 30-minute call.",
  },
  {
    n: "03",
    label: "We send a proposed scope",
    body: "Within a week of the call, you have a scope in hand.",
  },
];

export default function EngagementPage() {
  return (
    <>
      <Hero
        headline={
          <>
            How <em>we work.</em>
          </>
        }
        lead="Engagements begin with a brief — a short, structured conversation to understand what you're trying to decide, build, or fix. From there, we scope. We are deliberate about fit: we take fewer engagements so we can do each one seriously."
      />

      {/* ENGAGEMENT MODELS */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <div className="mono-label label-dash mb-4">Engagement models</div>
            <h2 className="section-title text-[clamp(32px,4.5vw,52px)]">
              Four ways in.
            </h2>
          </div>
          <div className="space-y-10">
            {MODELS.map((m) => (
              <div
                key={m.label}
                className="grid grid-cols-[140px_1fr] gap-6 border-t pt-6 md:gap-10"
                style={{ borderTopColor: "var(--color-rule)" }}
              >
                <div
                  className="font-mono text-[11px] uppercase"
                  style={{
                    color: "var(--color-ink)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {m.label}
                </div>
                <p
                  className="max-w-[56ch] text-[16px] leading-[1.6]"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE BRIEF */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{
          background: "var(--color-paper-deep)",
          borderTopColor: "var(--color-rule)",
        }}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <div className="mono-label label-dash mb-4">The brief</div>
            <h2 className="section-title text-[clamp(32px,4.5vw,52px)]">
              Thirty minutes.
              <br />
              <em>No deck required.</em>
            </h2>
          </div>
          <div
            className="max-w-[60ch] space-y-5 text-[17px] leading-[1.65]"
            style={{ color: "var(--color-ink-soft)" }}
          >
            <p>
              We&apos;ll ask what you&apos;re trying to decide, what has and
              hasn&apos;t worked, and what success looks like. We&apos;ll tell
              you whether we&apos;re the right firm — and if we&apos;re not,
              we&apos;ll tell you who might be.
            </p>
            <p>
              If there&apos;s a fit, we&apos;ll send a scope within a week of
              the call.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <div className="mono-label label-dash mb-4">Initiate brief</div>
            <h2 className="section-title text-[clamp(32px,4.5vw,52px)]">
              Send us what you&apos;re
              <br />
              <em>working on.</em>
            </h2>
          </div>
          <BriefForm />
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{
          background: "var(--color-ink)",
          color: "var(--color-paper)",
          borderTopColor: "var(--color-ink)",
        }}
      >
        <div
          className="mono-label label-dash mb-6"
          style={{ color: "rgba(245,242,237,0.6)" }}
        >
          What happens next
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="border-t pt-6"
              style={{ borderTopColor: "rgba(245,242,237,0.2)" }}
            >
              <div
                className="font-mono text-[11px] uppercase"
                style={{
                  color: "var(--color-accent-soft)",
                  letterSpacing: "0.1em",
                }}
              >
                {s.n}
              </div>
              <h3
                className="mt-3 font-display text-[24px]"
                style={{
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.label}
              </h3>
              <p
                className="mt-3 max-w-[40ch] text-[15px] leading-[1.55]"
                style={{ color: "var(--color-paper)", opacity: 0.7 }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
