import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { FIRM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Transmissions",
  description:
    "Essays, frameworks, and field notes from across the six disciplines of C Highland Advisory. Inaugural issue forthcoming.",
};

export default function TransmissionsPage() {
  return (
    <>
      <Hero
        eyebrow="Transmissions"
        headline={<>Writing from the <em>practice.</em></>}
        lead="Essays, frameworks, and field notes from across the six divisions. The inaugural dispatch is forthcoming."
      />

      <section className="border-t border-[color:var(--color-mist)] py-20 md:py-24">
        <Container>
          <Reveal>
            <div className="card mx-auto max-w-[720px] p-8 md:p-12">
              <div className="eyebrow mb-4">Inaugural dispatch</div>
              <h2 className="display-md mb-6">Forthcoming.</h2>
              <p className="prose-base mb-8 text-[color:var(--color-silt)]">
                Writing from the firm doesn&apos;t aim to publish on a calendar —
                it publishes when there is something operator-grade to say. Until
                then, personal writing lives at colinhighland.com.
              </p>
              <form
                action="/api/subscribe"
                method="post"
                className="flex flex-col gap-4 sm:flex-row"
              >
                <label className="flex-1">
                  <span className="sr-only">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@organization.com"
                    className="field-line"
                  />
                </label>
                <button type="submit" className="cta cta-primary">
                  Add me to the list
                </button>
              </form>
              <div className="mt-8">
                <Link
                  href={FIRM.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta cta-ghost"
                >
                  Visit colinhighland.com
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
