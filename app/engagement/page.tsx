import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Engagement",
  description:
    "Begin an engagement with C Highland Advisory. Forty-five minutes. No deck. We map the operating problem and decide together.",
};

/*
  /engagement — minimal engagement page.

  The homepage CTA card already explains the engagement posture
  (45min, no deck, free first conversation). This page mirrors that
  copy and surfaces the email, with the option to add a real brief
  form back later.
*/

export default function EngagementPage() {
  return (
    <>
      <main style={{ paddingTop: "14vh" }}>
        <section style={{ padding: "8vh var(--gutter) 14vh" }}>
          <span className="eyebrow">
            <span className="marker" /> Engagement
          </span>
          <h1
            className="h-display"
            style={{ marginTop: 16, marginBottom: 24, maxWidth: "18ch" }}
          >
            Begin an engagement.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-silt)" }}>
              Or just bring the problem.
            </em>
          </h1>
          <p
            className="body-base"
            style={{ maxWidth: "56ch", marginBottom: 48 }}
          >
            Forty-five minutes. No deck. We map the operating problem and
            decide together if there&rsquo;s a program worth designing.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 80,
            }}
          >
            <a
              href="mailto:engage@chighlandadvisory.com"
              className="btn btn-signal"
            >
              <span>engage@chighlandadvisory.com</span>
              <span className="arrow">→</span>
            </a>
            <Link href="/" className="btn btn-ghost">
              <span>Back to the practice</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
