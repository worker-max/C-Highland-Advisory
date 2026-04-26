import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { FIRM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Toolkits",
  description:
    "Pre-fabricated programs, products, and operator tools for facilitated partnerships. Ready to deploy, sized to your operating model.",
};

/*
  /toolkits — Pre-fabricated programs, products, and tools for
  facilitated partnerships. Stub page; partner-portal content is gated
  behind /login once auth is wired.

  This page is the productized counterpart to /practice (which is the
  bespoke advisory engagements). Sectors / divisions / programs all
  share the same operator-grade vocabulary.
*/

const TOOLKITS = [
  {
    num: "T01",
    name: "Contingent Labor Workforce Toolkit",
    discipline: "Talent Acquisition",
    body: "The operating chassis of the Contingent Labor Workforce Program — supplier governance templates, mix-economics worksheet, and the operating cadence that runs them.",
    status: "Available — partner access",
  },
  {
    num: "T02",
    name: "Enterprise-Wide Education Curriculum",
    discipline: "Strategy & Advisory",
    body: "Curriculum, manager rhythms, and instrumentation for an enterprise-wide education program. Built to be operated, not assembled and forgotten.",
    status: "Available — partner access",
  },
  {
    num: "T03",
    name: "Retention Strategy Diagnostic",
    discipline: "Operational HR",
    body: "Frontline-retention diagnostic + intervention playbook. Operational, not survey-led — designed for HR teams who need to move the number.",
    status: "Available — partner access",
  },
  {
    num: "T04",
    name: "AI Tool Co-op",
    discipline: "AI Practice",
    body: "A growing library of pre-fabricated and semi-custom AI tools — chatbots, voice agents, workflow automation modules, custom tools, and website-infused AI surfaces. Members deploy with eval harnesses + audit logs ready out of the box.",
    status: "Available — partner access",
  },
  {
    num: "T05",
    name: "Branch Performance Architecture",
    discipline: "Home Health Operations",
    body: "Branch-level operating system for national home-health platforms. Levers, cadence, governance — what runs once the strategy work is done.",
    status: "Available — partner access",
  },
];

export default function ToolkitsPage() {
  return (
    <>
      <main style={{ paddingTop: "14vh" }}>
        <section style={{ padding: "8vh var(--gutter) 6vh" }}>
          <span className="eyebrow">
            <span className="marker" /> Toolkits
          </span>
          <h1
            className="h-display"
            style={{ marginTop: 16, marginBottom: 24, maxWidth: "20ch" }}
          >
            Pre-fabricated programs<span className="hl-dot">.</span>
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-silt)" }}>
              Built once, deployed by partners.
            </em>
          </h1>
          <p
            className="body-base"
            style={{ maxWidth: "60ch", marginBottom: 16 }}
          >
            The Practice runs bespoke engagements. The Toolkits are the
            productized counterpart — programs, governance frameworks, and
            operator tools we&rsquo;ve built once and made available to
            facilitated partners. Ready to deploy, sized to your operating
            model.
          </p>
          <p
            className="body-sm"
            style={{
              maxWidth: "60ch",
              marginBottom: 48,
              color: "var(--color-silt)",
            }}
          >
            Partner-page access requires login. The catalogue below is the
            public summary; full materials are gated.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <Link href="/login" className="btn btn-signal">
              <span>Partner login</span>
              <span className="arrow">→</span>
            </Link>
            <a
              href={`mailto:${FIRM.contactEmail}?subject=Toolkit%20partnership%20inquiry`}
              className="btn btn-ghost"
            >
              <span>Inquire about partnership</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </section>

        {/* Toolkit catalogue — window-pane grid matching the homepage
            sectors/operator system. Three columns desktop, two tablet, one mobile. */}
        <section style={{ padding: "4vh var(--gutter) 14vh" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 1,
              background: "var(--color-mist)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {TOOLKITS.map((t) => (
              <div
                key={t.num}
                style={{
                  background: "var(--color-paper)",
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  minHeight: 260,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="mono"
                    style={{ color: "var(--color-silt)" }}
                  >
                    {t.num} · {t.discipline}
                  </span>
                  <span
                    style={{
                      border: "1px solid var(--color-mist)",
                      borderRadius: 999,
                      padding: "4px 10px",
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--color-silt)",
                    }}
                  >
                    Active
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 26,
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    color: "var(--color-ink)",
                  }}
                >
                  {t.name}
                </h3>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "var(--color-graphite)",
                    flex: 1,
                  }}
                >
                  {t.body}
                </p>
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    color: "var(--color-silt)",
                    letterSpacing: "0.16em",
                  }}
                >
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
