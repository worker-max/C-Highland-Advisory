import Link from "next/link";

/*
  Founder excerpt — pull quote on --color-paper.

  Two-column grid (1fr 1fr, gap 64px, max 1400px center).
  Left: serif clamp(32-48px) pull quote with italic second clause in --color-silt.
  Right: byline mono caps + credentials + ghost button to /founder.
*/

export function FounderExcerpt() {
  return (
    <section className="founder-excerpt" id="founder">
      <div className="founder-excerpt-grid">
        <p className="pull">
          &ldquo;I don&rsquo;t sell strategy. I design programs that hold up
          after the deck is closed —{" "}
          <em>which is the only kind that&rsquo;s worth your time, or mine.</em>
          &rdquo;
        </p>
        <div className="pull-meta">
          <span className="byline">
            Colin Highland · PT, DPT, CBA · Founder
          </span>
          <p className="credentials">
            Doctor of Physical Therapy · Certified Business Architect. Former
            workforce-strategy and home-health operations leader at Humana and
            CenterWell. Charleston, SC.
          </p>
          <Link
            href="/founder"
            className="btn btn-ghost"
            style={{ alignSelf: "flex-start" }}
          >
            <span>Read the founder note</span>
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
