/*
  Approach — three-card window-pane.

  Section bg: --color-bone
  Three cards in a 1px-gap grid on --color-mist (the window-pane recipe).
  Each card carries a Step 0N number, serif title, body, and a 56x56 glyph.
*/

const STEPS = [
  {
    num: "Step 01",
    title: "Operating diagnostic",
    body: "Two weeks inside the operation — read the cadence, watch the failure modes, surface the load-bearing walls. Output is honest, not polite.",
  },
  {
    num: "Step 02",
    title: "Program architecture",
    body: "Design the program — roles, cadence, instrumentation, governance. Built to be operated, not presented. We size it to your team, not to a deck.",
  },
  {
    num: "Step 03",
    title: "Embedded execution",
    body: "Run it for a quarter or three with the people who'll own it after. Hand it over with the muscle memory intact, not the consultant gone.",
  },
];

function Glyph({ idx }: { idx: number }) {
  if (idx === 0) {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
        <circle
          cx="28"
          cy="28"
          r="14"
          fill="none"
          stroke="var(--color-graphite)"
          strokeWidth="1"
        />
        <circle cx="28" cy="28" r="3" fill="var(--color-signal)" />
      </svg>
    );
  }
  if (idx === 1) {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
        <rect
          x="10"
          y="10"
          width="36"
          height="36"
          fill="none"
          stroke="var(--color-graphite)"
          strokeWidth="1"
        />
        <line
          x1="10"
          y1="22"
          x2="46"
          y2="22"
          stroke="var(--color-graphite)"
          strokeWidth="1"
        />
        <line
          x1="22"
          y1="10"
          x2="22"
          y2="46"
          stroke="var(--color-graphite)"
          strokeWidth="1"
        />
        <circle cx="34" cy="34" r="3" fill="var(--color-signal)" />
      </svg>
    );
  }
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
      <line
        x1="6"
        y1="28"
        x2="50"
        y2="28"
        stroke="var(--color-graphite)"
        strokeWidth="1"
      />
      <circle cx="14" cy="28" r="2.5" fill="var(--color-graphite)" />
      <circle cx="28" cy="28" r="2.5" fill="var(--color-graphite)" />
      <circle cx="44" cy="28" r="3.5" fill="var(--color-signal)" />
    </svg>
  );
}

export function Approach() {
  return (
    <section className="approach" id="approach">
      <div className="approach-head">
        <div>
          <span className="eyebrow">
            <span className="marker" />
            <span className="num">01</span> Approach
          </span>
          <h2 className="h-section" style={{ marginTop: 16 }}>
            How an engagement{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-silt)" }}>
              actually
            </em>{" "}
            works.
          </h2>
        </div>
        <p
          className="body-base"
          style={{ maxWidth: "44ch", justifySelf: "end" }}
        >
          A small, deliberate cadence. Diagnose, design, run. We do the
          unglamorous middle so the program survives the people who built it.
        </p>
      </div>
      <div className="approach-grid">
        {STEPS.map((s, i) => (
          <div className="approach-card" key={s.num}>
            <div>
              <div className="num">{s.num}</div>
              <h3 style={{ marginTop: 14 }}>{s.title}</h3>
            </div>
            <p>{s.body}</p>
            <div className="glyph">
              <Glyph idx={i} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
