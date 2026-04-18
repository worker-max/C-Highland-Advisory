import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DIVISIONS, getDivision } from "@/content/divisions";
import { SectorPills } from "@/components/SectorPills";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";

type Params = { slug: string };

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) return {};
  return {
    title: division.name,
    description: division.shortDescription,
  };
}

function articleFor(word: string) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

const ENGAGEMENT_EXPLANATIONS: Record<string, string> = {
  Retainer: "Ongoing advisory with a monthly cadence, typically 3–12 months.",
  Project: "Scoped deliverable with a defined end date, typically 4–16 weeks.",
  Embedded: "On-site or near-site operational work, typically for operations-heavy engagements.",
  Build: "Deploy a working system, typically 6–16 weeks to production.",
  Advisory: "As-needed counsel without an ongoing retainer commitment.",
};

export default async function DivisionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) notFound();

  const numLabel = `${division.number} / ${String(DIVISIONS.length).padStart(2, "0")}`;

  return (
    <>
      {/* HERO — number raised to display scale as typographic furniture */}
      <section className="relative px-6 pb-20 pt-[160px] md:px-12 md:pb-[100px] md:pt-[216px]">
        <div
          className="mono-label label-dash mb-8"
          style={{ letterSpacing: "0.12em" }}
        >
          <Link href="/practice" className="hover:text-[color:var(--color-ink)]">
            Practice
          </Link>
          <span className="mx-2" style={{ color: "var(--color-ink-mute)" }}>
            /
          </span>
          <span style={{ color: "var(--color-ink)" }}>{division.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:gap-16">
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 200,
              fontVariationSettings: '"opsz" 96',
              fontSize: "clamp(64px, 8vw, 120px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "var(--color-ink-mute)",
            }}
          >
            {numLabel}
          </div>

          <div>
            <h1 className="headline-display text-[clamp(40px,6vw,92px)]" style={{ maxWidth: "18ch" }}>
              {division.name}
            </h1>
            <p
              className="mt-8 max-w-[46ch]"
              style={{
                fontFamily: "var(--font-sans)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(22px, 2.4vw, 32px)",
                lineHeight: 1.25,
                color: "var(--color-accent)",
                letterSpacing: "-0.015em",
              }}
            >
              {division.positioning}
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section
        className="border-t px-6 py-16 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
            <div>
              <div className="mono-label label-dash mb-3">What we do</div>
              <h2 className="section-title text-[clamp(30px,4vw,48px)]">
                Services in this <em>practice.</em>
              </h2>
            </div>
            <ul className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
              {division.services.map((service, i) => (
                <li
                  key={service}
                  className="border-t pt-4 text-[16px] leading-[1.55]"
                  style={{
                    borderTopColor: "var(--color-rule)",
                    color: "var(--color-ink)",
                  }}
                >
                  <span
                    className="mono-numeral mr-3"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    0{i + 1}
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* WHO WE SERVE */}
      <section
        className="border-t px-6 py-16 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <SectorPills sectors={division.sectors} label="Who we serve" />
      </section>

      {/* ENGAGEMENT MODELS */}
      <section
        className="border-t px-6 py-16 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
            <div>
              <div className="mono-label label-dash mb-3">Engagement models</div>
              <h2 className="section-title text-[clamp(30px,4vw,48px)]">
                How we <em>enter.</em>
              </h2>
            </div>
            <div className="space-y-6">
              {division.engagementModels.map((model) => (
                <div
                  key={model}
                  className="grid grid-cols-[140px_1fr] gap-8 border-t pt-5"
                  style={{ borderTopColor: "var(--color-rule)" }}
                >
                  <div
                    className="mono-label"
                    style={{
                      color: "var(--color-ink)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {model}
                  </div>
                  <div
                    className="text-[16px] leading-[1.6]"
                    style={{ color: "var(--color-ink-soft)" }}
                  >
                    {ENGAGEMENT_EXPLANATIONS[model]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* THESIS — dark inversion */}
      <section
        className="dark-section border-t px-6 py-20 md:px-12 md:py-28"
        style={{ borderTopColor: "var(--color-ink)" }}
      >
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
            <div>
              <div
                className="mono-label label-dash mb-3"
                style={{ color: "var(--color-accent-soft)" }}
              >
                The thesis
              </div>
              <div
                className="mono-numeral"
                style={{
                  color: "var(--color-accent-soft)",
                  letterSpacing: "0.1em",
                }}
              >
                {numLabel}
              </div>
            </div>
            <p
              className="max-w-[62ch]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.4vw, 32px)",
                lineHeight: 1.35,
                letterSpacing: "-0.015em",
                color: "var(--color-paper)",
              }}
            >
              {division.thesis}
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto] md:gap-20">
          <h2 className="section-title text-[clamp(28px,4vw,48px)]">
            Ready to discuss {articleFor(division.shortName ?? division.name)}{" "}
            <em>{division.shortName ?? division.name}</em> engagement?
          </h2>
          <CTAButton href="/engagement" variant="primary">
            Initiate brief →
          </CTAButton>
        </div>
      </section>
    </>
  );
}
