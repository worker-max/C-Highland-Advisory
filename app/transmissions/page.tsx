import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { FIRM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Transmissions",
  description:
    "Essays, frameworks, and field notes from across the six disciplines of C Highland Advisory. Inaugural issue forthcoming.",
};

/*
  Transmissions launches as Issue 00 — a table-of-contents-in-waiting.
  Four placeholder entries are styled like the division ledger so the page
  is already furniture, not a stub. Real MDX posts ship later.
*/

const FORTHCOMING = [
  {
    n: "01",
    title: "What clinical rounds taught me about operational audits",
    dek: "The diagnostic habits a clinician carries into the C-suite.",
    division: "Healthcare Strategy",
  },
  {
    n: "02",
    title: "Intake is the whole operation",
    dek: "Why home-health margin lives inside the first three calls.",
    division: "Home Health Operations",
  },
  {
    n: "03",
    title: "Hiring is a design problem",
    dek: "Structured interviews, assessment frameworks, and the false economy of speed.",
    division: "Talent & Workforce",
  },
  {
    n: "04",
    title: "AI is a system, not a feature",
    dek: "A field note on what separates a voice deployment that survives from one that ships and silently degrades.",
    division: "AI Practice",
  },
];

export default function TransmissionsPage() {
  return (
    <>
      <Hero
        headline={
          <>
            Writing from the <em>practice.</em>
          </>
        }
        lead="Essays, frameworks, and field notes from across the six divisions. Issue 00 is the inaugural dispatch — the ledger below previews what's forthcoming."
      />

      {/* ISSUE 00 — table-of-contents-in-waiting */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-20">
            <div>
              <div className="mono-label label-dash mb-3">Issue 00</div>
              <h2 className="section-title text-[clamp(32px,4.5vw,56px)]">
                Inaugural <em>dispatch.</em>
              </h2>
            </div>
            <p
              className="max-w-[56ch] text-[17px] leading-[1.65]"
              style={{ color: "var(--color-ink-soft)", fontWeight: 300 }}
            >
              Writing from the firm doesn&apos;t aim to publish on a calendar —
              it aims to publish when there&apos;s something operator-grade to
              say. Below is what&apos;s on the bench.
            </p>
          </div>
        </Reveal>

        <div
          className="mt-16 border-t"
          style={{ borderTopColor: "var(--color-ink)" }}
        >
          {FORTHCOMING.map((entry, i) => (
            <Reveal key={entry.n} delay={i * 0.06}>
              <div
                className="grid grid-cols-1 gap-4 border-b py-9 md:grid-cols-[60px_minmax(240px,1.2fr)_2fr_160px] md:gap-10"
                style={{ borderBottomColor: "var(--color-rule)" }}
              >
                <div className="mono-numeral pt-2">{entry.n}</div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 72',
                    fontSize: "clamp(22px, 2.3vw, 28px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                  }}
                >
                  {entry.title}
                </div>
                <p
                  className="max-w-[56ch] text-[15px] leading-[1.6]"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  {entry.dek}
                </p>
                <div
                  className="flex flex-col gap-2 font-mono text-[11px] uppercase md:items-end md:text-right"
                  style={{
                    color: "var(--color-ink-mute)",
                    letterSpacing: "0.12em",
                  }}
                >
                  <span>{entry.division}</span>
                  <span style={{ color: "var(--color-accent)" }}>— forthcoming</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-24"
        style={{
          background: "var(--color-paper-deep)",
          borderTopColor: "var(--color-rule)",
        }}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <div className="mono-label label-dash mb-3">Subscribe</div>
            <h2 className="section-title text-[clamp(28px,4vw,44px)]">
              Receive Issue <em>01.</em>
            </h2>
          </div>
          <form
            action="/api/subscribe"
            method="post"
            className="flex max-w-[520px] flex-col gap-6"
          >
            <label className="block">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                required
                className="field-line mt-2"
                placeholder="you@organization.com"
              />
            </label>
            <div>
              <button
                type="submit"
                className="cta-base cta-sm cta-primary"
                aria-label="Subscribe for Issue 01"
              >
                Add me to the list
              </button>
            </div>
            <p
              className="text-[13px]"
              style={{ color: "var(--color-ink-mute)" }}
            >
              Until the first dispatch, Colin&apos;s writing lives at{" "}
              <Link
                href={FIRM.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-rule"
                style={{ fontSize: 11 }}
              >
                colinhighland.com ↗
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
