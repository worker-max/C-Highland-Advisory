import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TIERS, getTierBySlug } from "@/lib/content/engagement";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InquireForm } from "@/components/InquireForm";

type Params = { slug: string };

export function generateStaticParams() {
  return TIERS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const t = getTierBySlug(slug);
  if (!t) return {};
  return {
    title: t.name,
    description: t.oneLiner,
  };
}

export default async function TierPage(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const tier = getTierBySlug(slug);
  if (!tier) notFound();

  const idx = TIERS.findIndex((t) => t.slug === slug);
  const next = TIERS[(idx + 1) % TIERS.length];

  return (
    <div className="division-page">
      {/* Hero — same vocabulary as the division detail page so the
          tier sub-pages feel structurally familiar. */}
      <section className="division-hero">
        <div className="crumbs">
          <Link href="/">C Highland Advisory</Link>
          <span>/</span>
          <Link href="/engagement">Engagement</Link>
          <span>/</span>
          <span className="num">{tier.num}</span>
        </div>
        <div className="stripe-row">
          <div
            className="stripe"
            style={{ background: "var(--color-signal)" }}
            aria-hidden="true"
          />
          <span className="mono" style={{ color: "var(--color-silt)" }}>
            {tier.num} · {tier.shortName.toUpperCase()}
          </span>
        </div>
        <h1>{tier.name}</h1>
        <p className="lede">{tier.oneLiner}</p>
        <div className="meta-strip">
          {tier.meta.map((m) => (
            <div className="meta-cell" key={m.lbl}>
              <span className="lbl">{m.lbl}</span>
              <span className="val">{m.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Body — long copy paragraphs */}
      <section className="programs-section">
        <span className="eyebrow">
          <span className="marker" />
          <span className="num">{tier.num}.A</span> Format
        </span>
        <h2 style={{ marginTop: 16 }}>What this tier is.</h2>
        {tier.longBody.map((p, i) => (
          <p
            className="lede-sm"
            key={i}
            style={{ marginTop: i === 0 ? 24 : 8 }}
          >
            {p}
          </p>
        ))}
      </section>

      {/* Inclusions */}
      <section
        className="programs-section"
        style={{ background: "var(--color-paper)" }}
      >
        <span className="eyebrow">
          <span className="marker" />
          <span className="num">{tier.num}.B</span> Inclusions
        </span>
        <h2 style={{ marginTop: 16 }}>What&rsquo;s included.</h2>

        <div style={{ height: 32 }} aria-hidden="true" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 1,
            background: "var(--color-mist)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {tier.inclusions.map((inc, i) => (
            <div
              key={i}
              style={{
                background: "var(--color-bone)",
                padding: 28,
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                minHeight: 110,
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--color-silt)",
                  letterSpacing: "0.18em",
                  paddingTop: 4,
                }}
              >
                ·{String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15.5,
                  lineHeight: 1.5,
                  color: "var(--color-graphite)",
                }}
              >
                {inc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing + Inquire */}
      <section className="programs-section">
        <span className="eyebrow">
          <span className="marker" />
          <span className="num">{tier.num}.C</span> Pricing
        </span>
        <h2 style={{ marginTop: 16, marginBottom: 16 }}>
          Pricing within 24 hours.
        </h2>
        <p className="lede-sm" style={{ marginBottom: 48, maxWidth: "60ch" }}>
          {tier.pricingNote}
        </p>

        <InquireForm
          subject={`${tier.name} (${tier.num})`}
          preface={`Tier of interest: ${tier.name} (${tier.num}). One-liner: ${tier.oneLiner}`}
          title="Inquire about pricing."
        />
      </section>

      {/* Next tier */}
      <section className="next-division">
        <span className="eyebrow">
          <span className="marker" /> Next tier
        </span>
        <Link href={`/engagement/${next.slug}`} style={{ marginTop: 32 }}>
          <span className="next-num">{next.num}</span>
          <span className="next-name">{next.name}</span>
          <span className="next-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
