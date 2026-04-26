/*
  Discipline-page Section C — Method.

  Cross-cutting value prop on every /practice/[slug] page:
    1. Innovative operational process & governance design
    2. Custom AI tool integration where indicated
    3. HIPAA + SOC 2-ready architecture available
    4. Software-delivery capabilities (pre-fab, semi-custom, custom,
       AI-driven website redesigns, full mobile apps for iOS + Android)

  Rendered with paper background to make this section pop visually
  as the structural differentiator vs other boutique advisory firms.
*/

const METHOD_CARDS = [
  {
    num: "C.01",
    label: "Process & governance",
    title: "Operational process design.",
    body: "Cadence, escalation paths, decision rights, instrumentation. Built to be operated by your team after we leave — not by us.",
  },
  {
    num: "C.02",
    label: "AI integration",
    title: "Custom AI tool integration.",
    body: "Custom tools, chatbots, voice agents, workflow automation, and website-infused AI — pre-fabricated, semi-custom, or fully custom. Audit-first, observable, owned by you.",
  },
  {
    num: "C.03",
    label: "Compliance",
    title: "Compliant deployments.",
    body: "HIPAA-compliant and SOC 2-ready architecture available where the operating environment requires it. The compliance posture is written into the program from day one.",
    pillTag: "HIPAA · SOC 2",
  },
  {
    num: "C.04",
    label: "Delivery",
    title: "Software at the speed of operations.",
    body: "Relationship-driven delivery: pre-fab tools from the AI Tool Co-op, semi-custom builds, AI-driven website redesigns, and full mobile (iOS + Android) when the operating model needs an app, not a dashboard.",
  },
];

export function DivisionMethod({ divisionNum }: { divisionNum: string }) {
  return (
    <section
      className="programs-section"
      style={{ background: "var(--color-paper)" }}
    >
      <span className="eyebrow">
        <span className="marker" />
        <span className="num">{divisionNum}.C</span> Method
      </span>
      <h2 style={{ marginTop: 16 }}>
        Operational process. Custom AI integration.
      </h2>
      <p className="lede-sm" style={{ marginTop: 16 }}>
        Every engagement pairs innovative operational governance with custom
        AI tool integration — not because AI is fashionable, but because the
        program needs an instrument the team can actually run. Compliance is
        built in. Delivery moves at the speed of operations, not the speed of
        software vendors.
      </p>

      <div style={{ height: 48 }} aria-hidden="true" />

      <div className="programs-grid">
        {METHOD_CARDS.map((c) => (
          <div className="program-card" key={c.num}>
            <div className="top">
              <span>
                {c.num} · {c.label}
              </span>
              {c.pillTag ? (
                <span className="pill-tag">{c.pillTag}</span>
              ) : null}
            </div>
            <h3>{c.title}</h3>
            <p style={{ flex: 1 }}>{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
