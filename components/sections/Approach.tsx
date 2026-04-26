import Link from "next/link";
import { TIERS } from "@/lib/content/engagement";
import { FIRM } from "@/lib/constants";

/*
  Engagement section — the homepage primary visual.

  Renamed in spirit from "Approach" (the file is still Approach.tsx
  for import-path stability) — this section is now the dominant moment
  on the homepage. Four tier cards in a 2x2 layout with outsized
  typography on each tier name. Section reads as four posters, not
  four cards in a grid.

  Each tier links to its dedicated /engagement/[slug] page; a primary
  CTA at the bottom routes a generic "Begin engagement" mailto.

  Source of truth for tier copy is lib/content/engagement.ts —
  same data feeds /engagement (hub), /engagement/[slug] (sub-pages),
  and the discipline-page DivisionEngagement section.
*/

export function Approach() {
  const subject = encodeURIComponent("Engagement inquiry");
  const ctaHref = `mailto:${FIRM.contactEmail}?subject=${subject}`;

  return (
    <section className="engagement-primary section" id="approach">
      <div className="engagement-head">
        <span className="eyebrow">
          <span className="marker" />
          <span className="num">01</span> Engagement
        </span>
        <h2 className="engagement-h">
          Four ways to engage<span className="hl-dot">.</span>
          <br />
          <em>Same operating discipline.</em>
        </h2>
        <p className="engagement-lede">
          Every operating problem has its own shape. We&rsquo;ve built four
          engagement formats so the partnership format never gets in the way
          of the work — embedded for the heaviest lifts, in-person for the
          deliberate reset, virtual for the on-call thinking partner, and a
          small-business co-op for the operators who can&rsquo;t fit a
          six-figure consulting line item but still need the help.
        </p>
      </div>

      <div className="tiers-grid">
        {TIERS.map((t) => (
          <Link
            key={t.slug}
            href={`/engagement/${t.slug}`}
            className="tier-card"
          >
            <div className="tier-num-row">
              <span className="tier-num">{t.num}</span>
              <span className="tier-divider" aria-hidden="true" />
              <span className="tier-shortname">{t.shortName}</span>
            </div>
            <h3 className="tier-name">{t.name}</h3>
            <p className="tier-oneliner">{t.oneLiner}</p>
            <ul className="tier-inclusions">
              {t.inclusions.slice(0, 3).map((inc) => (
                <li key={inc}>{inc}</li>
              ))}
            </ul>
            <span className="tier-open">
              Open tier <span className="arrow">→</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="engagement-cta-row">
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
