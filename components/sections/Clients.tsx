/*
  Clients — names-only marquee + sectors window-pane.

  Marquee: top + bottom hairlines, 28px vertical padding, 96px edge fades.
  Track: gap 56px, infinite linear 60s, pause on hover. Each item:
  sans medium 18px name + mono 10px caps tag + 6px mist dot separator.

  Sectors: 4-column window-pane below the marquee, 9 cells.
*/

import { CLIENTS, SECTORS } from "@/lib/content/clients";

export function Clients() {
  return (
    <section className="clients" id="clients">
      <div className="clients-head">
        <div>
          <span className="eyebrow">
            <span className="marker" />
            <span className="num">04</span> Clients &amp; affiliations
          </span>
          <h2 className="h-section" style={{ marginTop: 16 }}>
            The operating environments
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-silt)" }}>
              this work has lived inside.
            </em>
          </h2>
        </div>
        <p className="body-base" style={{ maxWidth: "40ch" }}>
          Names only. The work isn&apos;t a logo wall — it&apos;s the operating
          posture beneath it.
        </p>
      </div>

      <div className="marquee" aria-label="Clients and affiliations">
        <div className="marquee-track">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span className="marquee-item" key={`${c.name}-${i}`}>
              <span>{c.name}</span>
              <span className="tag">{c.tag}</span>
              <span className="sep" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      <div className="sectors">
        {SECTORS.map((s) => (
          <div className="sector" key={s.num}>
            <div className="num">{s.num}</div>
            <div>
              <div className="name">{s.name}</div>
              <div className="count" style={{ marginTop: 8 }}>
                {s.count}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
