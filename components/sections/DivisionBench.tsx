/*
  Discipline-page Section D — The Bench.

  The bespoke SME network beside the practice. Included in engagement
  rates; available independently at $100-$250/hr depending on topic,
  timeline urgency, and scope (same range as Colin's own rates).

  Per-discipline SMEs come from the Division.bench[] array.
*/

type Props = {
  divisionNum: string;
  bench: string[];
};

export function DivisionBench({ divisionNum, bench }: Props) {
  return (
    <section className="programs-section">
      <span className="eyebrow">
        <span className="marker" />
        <span className="num">{divisionNum}.D</span> The bench
      </span>
      <h2 style={{ marginTop: 16 }}>
        Subject-matter experts beside the practice.
      </h2>
      <p className="lede-sm" style={{ marginTop: 16 }}>
        Every engagement includes access to a curated network of subject-
        matter experts — at the engagement rate, not on top of it. The same
        network is available for independent consultation at{" "}
        <strong>$100–$250/hr</strong> depending on topic, timeline urgency,
        and scope (the same range we ourselves work in).
      </p>

      <div style={{ height: 48 }} aria-hidden="true" />

      <div
        className="programs-grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        }}
      >
        {bench.map((member, i) => (
          <div
            className="program-card"
            key={member}
            style={{ minHeight: 180 }}
          >
            <div className="top">
              <span>
                SME · {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pill-tag">On call</span>
            </div>
            <h3 style={{ fontSize: "clamp(20px, 2vw, 24px)" }}>{member}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
