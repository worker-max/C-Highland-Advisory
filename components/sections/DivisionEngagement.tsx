import Link from "next/link";
import { TIERS } from "@/lib/content/engagement";
import { FIRM } from "@/lib/constants";

/*
  Discipline-page Section E — Engagement.

  Brief 4-tier preview at the close of every /practice/[slug] page,
  with a "Begin engagement" CTA that opens a mailto pre-filled with
  the discipline name as context.

  Each tier card links to its dedicated /engagement/[slug] sub-page
  for the deep version.
*/

type Props = {
  divisionNum: string;
  divisionName: string;
};

export function DivisionEngagement({ divisionNum, divisionName }: Props) {
  const subject = encodeURIComponent(`Engagement inquiry — ${divisionName}`);
  const ctaHref = `mailto:${FIRM.contactEmail}?subject=${subject}`;

  return (
    <section
      className="programs-section"
      style={{ background: "var(--color-paper)" }}
    >
      <span className="eyebrow">
        <span className="marker" />
        <span className="num">{divisionNum}.E</span> Engagement
      </span>
      {/*
        Per Colin's review: every division is available across ALL 4
        engagement tiers — scope is the pliable derivative. The framing
        below makes it explicit so buyers don't read the Co-op tier
        as a watered-down version of the Embedded tier — same
        discipline, different shape.
      */}
      <h2 style={{ marginTop: 16 }}>
        Any tier. Same discipline.
        <br />
        <em style={{ fontStyle: "italic", color: "var(--color-silt)" }}>
          Scope is the pliable derivative.
        </em>
      </h2>
      <p className="lede-sm" style={{ marginTop: 16 }}>
        All four formats deliver the {divisionName} discipline. Length,
        format, and intensity flex with the operating problem; the
        discipline holds. Pricing is scope-dependent and we respond
        within 24 hours of a brief.
      </p>

      <div style={{ height: 48 }} aria-hidden="true" />

      <div
        className="programs-grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {TIERS.map((t) => (
          <Link
            key={t.slug}
            href={`/engagement/${t.slug}`}
            className="program-card"
            style={{
              minHeight: 240,
              cursor: "none",
              transition: "transform 200ms ease",
            }}
          >
            <div className="top">
              <span>{t.num} · Tier</span>
              <span className="pill-tag">Open →</span>
            </div>
            <h3>{t.name}</h3>
            <p style={{ flex: 1 }}>{t.body}</p>
          </Link>
        ))}
      </div>

      <div
        style={{
          marginTop: 56,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
        }}
      >
        <a href={ctaHref} className="btn btn-primary">
          <span>Begin engagement</span>
          <span className="arrow">→</span>
        </a>
        <Link href="/engagement" className="btn btn-ghost">
          <span>Compare all tiers</span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
