import Link from "next/link";
import { Logo } from "@/components/Logo";
import { DIVISIONS } from "@/lib/content/divisions";
import { FIRM } from "@/lib/constants";

/*
  SiteFooter — dark footer with serif CTA + signal-green email pill +
  4-column grid (logo + wordmark | 4 divisions | 3 divisions | office).

  bg: --color-ink, color: --color-bone

  All mailto references route through FIRM.contactEmail so the future
  domain switch is a one-line change in lib/constants.ts.
*/

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-cta">
        Begin an engagement.
        <br />
        <em>Or just bring the problem.</em>
      </div>
      <a
        href={`mailto:${FIRM.contactEmail}`}
        className="btn btn-signal"
        style={{ marginBottom: 80 }}
      >
        <span>{FIRM.contactEmail}</span>
        <span className="arrow">→</span>
      </a>
      <div className="footer-grid">
        <div>
          <Logo
            size={42}
            tone="dark"
            layout="inline"
            showWordmark
            wordmarkSize={24}
            intro="never"
          />
          <p
            className="body-sm"
            style={{
              color: "var(--color-mist)",
              marginTop: 24,
              maxWidth: "32ch",
            }}
          >
            C Highland Advisory LLC. Senior advisory in strategy, operations,
            and applied AI. Charleston, South Carolina.
          </p>
        </div>
        <div>
          <h4>Divisions</h4>
          <ul>
            {DIVISIONS.slice(0, 4).map((d) => (
              <li key={d.slug}>
                <Link href={`/practice/${d.slug}`}>{d.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>&nbsp;</h4>
          <ul>
            {DIVISIONS.slice(4).map((d) => (
              <li key={d.slug}>
                <Link href={`/practice/${d.slug}`}>{d.name}</Link>
              </li>
            ))}
            <li style={{ marginTop: 18 }}>
              <Link href="/toolkits">Toolkits</Link>
            </li>
            <li>
              <Link href="/login">Partner login</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Office</h4>
          <ul>
            <li>Charleston, SC</li>
            <li>By appointment</li>
            <li>
              <a href={`mailto:${FIRM.contactEmail}`}>{FIRM.contactEmail}</a>
            </li>
            <li>
              <a
                href="https://niallhighland.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                niallhighland.com (sibling)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-base">
        <span>© 2026 C Highland Advisory LLC</span>
        <span>South Carolina · Est. {FIRM.founded}</span>
      </div>
    </footer>
  );
}
