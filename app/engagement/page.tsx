import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
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
    body: "Ongoing advisory with a monthly cadence, typically 3–12 months. Used when the work is continuous and the counsel is integrated into the leadership rhythm.",
  },
  {
    label: "Project",
    body: "Scoped deliverable with a defined end date, typically 4–16 weeks. Used when the question is specific and the outcome is a named artifact.",
  },
  {
    label: "Embedded",
    body: "On-site or near-site operational work — ride-alongs, workflow audits, intake call reviews. For operations-heavy engagements where the answers live in the detail.",
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
    label: "We respond within three business days",
    body: "If there is a fit, we schedule a thirty-minute call.",
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
        maxCh={14}
      />

      {/* ENGAGEMENT MODELS */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
            <div>
              <div className="mono-label label-dash mb-3">Engagement models</div>
              <h2 className="section-title text-[clamp(32px,4.5vw,56px)]">
                Four models. <em>One method.</em>
              </h2>
            </div>
            <div className="space-y-8">
              {MODELS.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.05}>
                  <div
                    className="grid grid-cols-[160px_1fr] gap-6 border-t pt-6 md:gap-10"
                    style={{ borderTopColor: "var(--color-rule)" }}
                  >
                    <div
                      className="mono-label"
                      style={{
                        color: "var(--color-ink)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      <span className="mono-numeral mr-3">0{i + 1}</span>
                      {m.label}
                    </div>
                    <p
                      className="max-w-[56ch] text-[16px] leading-[1.6]"
                      style={{ color: "var(--color-ink-soft)" }}
                    >
                      {m.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* THE BRIEF */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-24"
        style={{
          background: "var(--color-paper-deep)",
          borderTopColor: "var(--color-rule)",
        }}
      >
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
            <div>
              <div className="mono-label label-dash mb-3">The brief</div>
              <h2 className="section-title text-[clamp(32px,4.5vw,56px)]">
                Thirty minutes. <em>No deck required.</em>
              </h2>
            </div>
            <div
              className="max-w-[60ch] space-y-5 text-[17px] leading-[1.65]"
              style={{ color: "var(--color-ink-soft)", fontWeight: 300 }}
            >
              <p>
                We&apos;ll ask what you&apos;re trying to decide, what has and
                hasn&apos;t worked, and what success looks like. We&apos;ll tell
                you whether we&apos;re the right firm — and if we&apos;re not,
                we&apos;ll tell you who might be.
              </p>
              <p>
                If there&apos;s a fit, we send a scope within a week of the call.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FORM */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
            <div>
              <div className="mono-label label-dash mb-3">Initiate brief</div>
              <h2 className="section-title text-[clamp(32px,4.5vw,56px)]">
                Send us what you&apos;re <em>working on.</em>
              </h2>
            </div>
            <BriefForm />
          </div>
        </Reveal>
      </section>

      {/* WHAT HAPPENS NEXT — dark inversion */}
      <section
        className="dark-section border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{ borderTopColor: "var(--color-ink)" }}
      >
        <div
          className="mono-label label-dash mb-10"
          style={{ color: "var(--color-accent-soft)" }}
        >
          What happens next
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.1 + i * 0.1}>
              <div
                className="rule-dark border-t pt-6"
                style={{ borderTopWidth: 1, borderTopStyle: "solid" }}
              >
                <div
                  className="mono-numeral"
                  style={{
                    color: "var(--color-accent-soft)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.n}
                </div>
                <h3
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 48',
                    fontSize: 22,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    color: "var(--color-paper)",
                  }}
                >
                  {s.label}
                </h3>
                <p
                  className="mt-3 max-w-[40ch] text-[15px] leading-[1.6]"
                  style={{ color: "var(--color-accent-soft)" }}
                >
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
