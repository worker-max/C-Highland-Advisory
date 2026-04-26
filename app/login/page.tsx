import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { FIRM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Partner login",
  description:
    "Partner portal access for C Highland Advisory toolkits, programs, and shared materials.",
  robots: { index: false, follow: false },
};

/*
  /login — Partner login portal.

  Stub-page only. Real authentication will be wired later (likely
  Auth.js v5 with email magic-link or SSO, mirroring the workforcewave
  pattern). Until then, this page collects an email + redirects to a
  "request access" mailto so partners can request invitations without
  the form needing to actually do anything yet.

  Design note: this page intentionally has its own quiet layout — no
  marketing apparatus, just the sign-in surface. Form sits center-stage
  on the warm-bone canvas with the lockup at the top so partners feel
  they're entering a different surface than the public site.
*/

export default function LoginPage() {
  return (
    <>
      <main
        style={{
          paddingTop: "14vh",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <section
          style={{
            padding: "6vh var(--gutter) 14vh",
            width: "100%",
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          <span className="eyebrow">
            <span className="marker" /> Partner portal
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px, 4.4vw, 56px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              marginTop: 16,
              marginBottom: 16,
              color: "var(--color-ink)",
            }}
          >
            Sign in<span className="hl-dot">.</span>
          </h1>
          <p
            className="body-base"
            style={{ marginBottom: 32, maxWidth: "44ch" }}
          >
            Partner access for facilitated programs and shared materials.
            If you don&rsquo;t have credentials yet,{" "}
            <a
              href={`mailto:${FIRM.contactEmail}?subject=Partner%20portal%20access`}
              style={{
                color: "var(--color-ink)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              request an invitation
            </a>
            .
          </p>

          <form
            action={`mailto:${FIRM.contactEmail}`}
            method="post"
            encType="text/plain"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              padding: 32,
              background: "var(--color-paper)",
              borderRadius: 16,
              border: "1px solid var(--color-mist)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="email"
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "var(--color-silt)",
                }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@partner.org"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--color-mist)",
                  padding: "10px 0",
                  fontSize: 16,
                  fontFamily: "inherit",
                  color: "var(--color-ink)",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="password"
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "var(--color-silt)",
                }}
              >
                Access code
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="•••••••"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--color-mist)",
                  padding: "10px 0",
                  fontSize: 16,
                  fontFamily: "inherit",
                  color: "var(--color-ink)",
                  outline: "none",
                }}
              />
            </div>

            <p
              className="body-sm"
              style={{
                color: "var(--color-silt)",
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              Partner authentication is in setup. For now, requests route to
              {FIRM.contactEmail} and a partner manager will
              follow up within one business day.
            </p>

            <button type="submit" className="btn btn-primary">
              <span>Continue</span>
              <span className="arrow">→</span>
            </button>
          </form>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                color: "var(--color-silt)",
                textTransform: "uppercase",
              }}
            >
              ← Back to public site
            </Link>
            <Link
              href="/toolkits"
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                color: "var(--color-silt)",
                textTransform: "uppercase",
              }}
            >
              View toolkits →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
