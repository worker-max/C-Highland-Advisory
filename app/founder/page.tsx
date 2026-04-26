import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Founder",
  description:
    "Colin Highland — PT, DPT, CBA. Operator first, advisor by consequence. Senior advisory in strategy, operations, and applied AI.",
};

/*
  Founder page — operator first, advisor by consequence.

  IMPORTANT: The third paragraph (healthcare-strategy honesty) is the
  approved language and must NOT be edited without Colin's sign-off.
  See DESIGN_HANDOFF.md.
*/

export default function FounderPage() {
  return (
    <div className="founder-page">
      <section className="founder-hero">
        <div style={{ marginBottom: 64 }}>
          <span className="eyebrow">
            <span className="marker" /> Founder · Colin Highland · PT, DPT, CBA
          </span>
        </div>
        <div className="grid">
          <h1>
            Operator first.
            <br />
            <em>Advisor by consequence.</em>
          </h1>
          <div className="portrait" data-cursor="hover">
            <span className="corner">PORTRAIT · DROP IN</span>
            <span className="placeholder">Founder photo</span>
          </div>
        </div>
      </section>

      <section className="founder-bio">
        <div className="grid">
          <aside>
            <span className="lbl">Credentials</span>
            <ul>
              <li>Doctor of Physical Therapy (DPT)</li>
              <li>Certified Business Architect (CBA)</li>
              <li>Charleston, South Carolina</li>
            </ul>
            <span className="lbl">Operator track</span>
            <ul>
              <li>Humana — Workforce strategy</li>
              <li>CenterWell Home Health — Operations</li>
            </ul>
            <span className="lbl">Sibling brand</span>
            <ul>
              <li>
                <Link
                  href="https://niallhighland.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  niallhighland.com
                </Link>
              </li>
            </ul>
          </aside>
          <article>
            <p>
              The advisory work came after the operator chair, not before.
              Years inside large workforce and home-health platforms — Humana,
              CenterWell — taught me that the programs that hold under pressure
              don&rsquo;t come from frameworks; they come from someone who has
              had to run them on a Tuesday.
            </p>
            <p>
              C Highland Advisory exists for the version of the work that
              doesn&rsquo;t fit a deck: the operating cadence the strategy
              assumes but never names, the contingent-labor program that has to
              be hireable in this market, the AI workflow that has to be
              auditable on a clinician&rsquo;s desktop. We design programs
              across seven divisions, but they share one operating discipline.
            </p>
            <p>
              On healthcare specifically: the operator track is anchored in
              home health — branch operations, clinician productivity, and
              the workforce architecture that surrounds them, all inside
              CenterWell, with adjacent exposure across the broader Humana
              platform. The discipline translates outward across healthcare,
              and the SME bench fills any gaps where the operator track
              didn&rsquo;t run directly.
            </p>
            <p>
              If the operating problem is real, the first conversation is free.
              Forty-five minutes. No deck. We&rsquo;ll map it together, and
              decide if there&rsquo;s a program worth designing.
            </p>
          </article>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
