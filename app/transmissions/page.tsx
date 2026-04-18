import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FIRM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Transmissions",
  description:
    "Essays, frameworks, and field notes from across the six disciplines of C Highland Advisory. Launching soon.",
};

/*
  Transmissions placeholder. MDX post scaffolding lives at
  app/transmissions/[slug]/page.tsx. Posts will be read from
  content/transmissions/*.mdx in a later iteration — this page
  will render the post index above the placeholder copy.
*/

export default function TransmissionsPage() {
  return (
    <>
      <Hero
        headline={
          <>
            Writing from the
            <br />
            <em>practice.</em>
          </>
        }
        lead="Essays, frameworks, and field notes from across the six divisions. Launching soon."
      />

      <section
        className="border-t px-6 py-20 md:px-12 md:py-[120px]"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
          <div className="mono-label label-dash">Until then</div>
          <div>
            <p
              className="max-w-[60ch] text-[18px] leading-[1.6]"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Colin&apos;s personal writing — essays, portfolio notes, and the
              longer Transmissions archive — lives at his personal site.
            </p>
            <Link
              href={FIRM.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block font-mono text-[12px] uppercase transition-colors"
              style={{
                color: "var(--color-ink)",
                letterSpacing: "0.12em",
                borderBottom: "1px solid var(--color-ink)",
                paddingBottom: 2,
              }}
            >
              colinhighland.com ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
