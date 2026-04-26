import type { Metadata } from "next";
import Link from "next/link";
import { TIERS } from "@/lib/content/engagement";
import { FIRM } from "@/lib/constants";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InquireForm } from "@/components/InquireForm";

export const metadata: Metadata = {
  title: "Engagement",
  description:
    "Four ways to work with C Highland Advisory. Embedded program, Charleston Symposium, Virtual Advisory, or the Small Business Co-op.",
};

/*
  /engagement — the tier hub.

  Lays out all four engagement tiers with deeper copy than the homepage
  preview, links into each /engagement/[slug] for the dedicated page,
  and ends with a generic Inquire form for visitors who haven't picked
  a tier yet.
*/

export default function EngagementHub() {
  return (
    <>
      <main style={{ paddingTop: "14vh" }}>
        <section style={{ padding: "8vh var(--gutter) 4vh" }}>
          <span className="eyebrow">
            <span className="marker" /> Engagement
          </span>
          <h1
            className="h-display"
            style={{ marginTop: 16, marginBottom: 24, maxWidth: "20ch" }}
          >
            Four ways to engage<span className="hl-dot">.</span>
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-silt)" }}>
              Same operating discipline. Different shape of partnership.
            </em>
          </h1>
          <p
            className="body-base"
            style={{ maxWidth: "60ch", marginBottom: 32 }}
          >
            Every operating problem has its own shape. We&rsquo;ve built four
            engagement formats so the partnership format never gets in the
            way of the work — embedded for the heaviest lifts, in-person for
            the deliberate reset, virtual for the on-call thinking partner,
            and a small-business co-op for the operators who can&rsquo;t fit
            a six-figure consulting line item but still need the help.
          </p>
          <p
            className="body-sm"
            style={{
              maxWidth: "60ch",
              marginBottom: 48,
              color: "var(--color-silt)",
            }}
          >
            All tiers include access to our subject-matter-expert bench
            (independent rates: $100–$250/hr) and custom AI tool integration
            where indicated. HIPAA-compliant and SOC&nbsp;2-ready architecture
            available where the operating environment requires it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <a
              href={`mailto:${FIRM.contactEmail}?subject=${encodeURIComponent("Engagement inquiry")}`}
              className="btn btn-primary"
            >
              <span>Begin engagement</span>
              <span className="arrow">→</span>
            </a>
            <Link href="/" className="btn btn-ghost">
              <span>Back to the practice</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </section>

        {/* Tier cards — full preview, links into each /engagement/[slug] */}
        <section style={{ padding: "4vh var(--gutter) 4vh" }}>
          <div
            className="programs-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            }}
          >
            {TIERS.map((t) => (
              <Link
                key={t.slug}
                href={`/engagement/${t.slug}`}
                className="program-card"
                style={{ minHeight: 320 }}
              >
                <div className="top">
                  <span>{t.num} · Tier</span>
                  <span className="pill-tag">Open →</span>
                </div>
                <h3 style={{ fontSize: "clamp(24px, 2.4vw, 30px)" }}>
                  {t.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 17,
                    lineHeight: 1.45,
                    color: "var(--color-graphite)",
                    fontVariationSettings: '"opsz" 24',
                    marginTop: 4,
                  }}
                >
                  {t.oneLiner}
                </p>
                <p style={{ flex: 1 }}>{t.body}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Generic inquire form for visitors who haven't picked a tier */}
        <section style={{ padding: "8vh var(--gutter) 14vh" }}>
          <span className="eyebrow">
            <span className="marker" /> Or — start the conversation
          </span>
          <h2
            className="h-section"
            style={{ marginTop: 16, marginBottom: 32, maxWidth: "20ch" }}
          >
            Forty-five minutes. No deck.
          </h2>
          <InquireForm
            subject="General engagement inquiry"
            title="What are you trying to move?"
            helper="The shape of the engagement comes out of this conversation. We respond within 24 hours."
          />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
