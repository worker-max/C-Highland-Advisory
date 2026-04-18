import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DIVISIONS, getDivision } from "@/content/divisions";
import { SectorPills } from "@/components/SectorPills";
import { CTAButton } from "@/components/CTAButton";

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
      {/* HERO */}
      <section className="relative px-6 pb-20 pt-[140px] md:px-12 md:pb-[100px] md:pt-[180px]">
        <div
          className="mono-label label-dash mb-6"
          style={{ letterSpacing: "0.12em" }}
        >
          <Link href="/practice" className="hover:text-ink">
            Practice
          </Link>
          <span className="mx-2" style={{ color: "var(--color-ink-mute)" }}>
            →
          </span>
          <span style={{ color: "var(--color-ink)" }}>{division.name}</span>
        </div>

        <div
          className="font-mono text-[12px]"
          style={{
            color: "var(--color-ink-mute)",
            letterSpacing: "0.08em",
          }}
        >
          {numLabel}
        </div>

        <h1 className="headline-display mt-4 max-w-[18ch] text-[clamp(44px,7vw,96px)]">
          {division.name}
        </h1>

        <p
          className="mt-10 max-w-[48ch] font-display italic"
          style={{
            fontWeight: 300,
            fontSize: "clamp(24px, 2.6vw, 36px)",
            lineHeight: 1.25,
            color: "var(--color-accent)",
          }}
        >
          {division.positioning}
        </p>
      </section>

      {/* WHAT WE DO */}
      <section
        className="border-t px-6 py-16 md:px-12 md:py-24"
        style={{ borderTopColor: "var(--color-rule)" }}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
          <div className="mono-label label-dash">What we do</div>
          <ul
            className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2"
            style={{ color: "var(--color-ink)" }}
          >
            {division.services.map((service) => (
              <li
                key={service}
                className="border-t pt-4 text-[16px] leading-[1.5]"
                style={{ borderTopColor: "var(--color-rule)" }}
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
          <div className="mono-label label-dash">Engagement models</div>
          <div className="space-y-6">
            {division.engagementModels.map((model) => (
              <div
                key={model}
                className="grid grid-cols-[140px_1fr] gap-8 border-t pt-4"
                style={{ borderTopColor: "var(--color-rule)" }}
              >
                <div
                  className="font-mono text-[11px] uppercase"
                  style={{
                    color: "var(--color-ink)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {model}
                </div>
                <div
                  className="text-[16px] leading-[1.55]"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  {ENGAGEMENT_EXPLANATIONS[model]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THESIS */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-28"
        style={{
          background: "var(--color-ink)",
          color: "var(--color-paper)",
          borderTopColor: "var(--color-ink)",
        }}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
          <div
            className="mono-label label-dash"
            style={{ color: "rgba(245,242,237,0.6)" }}
          >
            The thesis
          </div>
          <p
            className="max-w-[62ch] font-display italic"
            style={{
              fontWeight: 300,
              fontSize: "clamp(22px, 2.4vw, 30px)",
              lineHeight: 1.35,
              color: "var(--color-paper)",
            }}
          >
            {division.thesis}
          </p>
        </div>
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
