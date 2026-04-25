/*
  Operator — two-card window-pane.

  Two equal cards (1px gap on --color-mist, 16px outer radius).
  Each card: org name (mono caps top) + dates + serif role title +
  summary + 3-cell meta grid.
*/

const OPERATORS = [
  {
    org: "Humana",
    dates: "2018 — 2024",
    role: "Workforce strategy and contingent labor program leadership.",
    summary:
      "Designed and operated contingent workforce programs across acute, ambulatory, and home-health surfaces. Built the recruiter-capacity model and the operating cadence that ran them.",
    meta: [
      { lbl: "Surface", val: "Enterprise" },
      { lbl: "Scope", val: "Workforce program" },
      { lbl: "Output", val: "Operating model" },
    ],
  },
  {
    org: "CenterWell Home Health",
    dates: "2021 — 2024",
    role: "Home Health operations and clinician productivity.",
    summary:
      "Branch performance architecture, clinician productivity programs, and the unglamorous work of moving onboarding-to-productive time inside a national home-health platform.",
    meta: [
      { lbl: "Surface", val: "Branch · Region" },
      { lbl: "Scope", val: "Operations program" },
      { lbl: "Output", val: "Performance architecture" },
    ],
  },
];

export function Operator() {
  return (
    <section className="operator" id="operator">
      <div className="operator-head">
        <div>
          <span className="eyebrow">
            <span className="marker" />
            <span className="num">03</span> Operator experience
          </span>
          <h2 className="h-section" style={{ marginTop: 16 }}>
            Built from inside the model.
          </h2>
        </div>
        <p className="body-base" style={{ maxWidth: "44ch" }}>
          The operator chair came first. The advisory work is the version that
          comes from running these programs, not from observing them.
        </p>
      </div>
      <div className="operator-cards">
        {OPERATORS.map((op) => (
          <div className="operator-card" key={op.org}>
            <div className="head-row">
              <span className="org">{op.org}</span>
              <span className="mono" style={{ color: "var(--color-silt)" }}>
                {op.dates}
              </span>
            </div>
            <h3 className="role">{op.role}</h3>
            <p className="summary">{op.summary}</p>
            <div className="meta">
              {op.meta.map((m) => (
                <div key={m.lbl}>
                  <span className="lbl">{m.lbl}</span>
                  <span className="val">{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
