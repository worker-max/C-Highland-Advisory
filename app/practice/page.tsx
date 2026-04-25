import type { Metadata } from "next";
import Link from "next/link";
import { DIVISIONS } from "@/lib/content/divisions";
import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "Seven divisions. One operating discipline. The full practice index.",
};

/*
  /practice — a quiet index of the seven divisions for direct linking.
  The homepage #divisions section is the canonical exploration surface;
  this page is a flat ledger for users who came in deep.
*/

export default function PracticeIndex() {
  return (
    <>
      <main className="practice-index" style={{ paddingTop: "14vh" }}>
        <section style={{ padding: "8vh var(--gutter) 4vh" }}>
          <span className="eyebrow">
            <span className="marker" /> Practice
          </span>
          <h1
            className="h-display"
            style={{ marginTop: 16, marginBottom: 24, maxWidth: "20ch" }}
          >
            Seven divisions.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-silt)" }}>
              One operating discipline.
            </em>
          </h1>
          <p
            className="body-base"
            style={{ maxWidth: "60ch", marginBottom: 64 }}
          >
            Each division stands as its own discipline. The horizontal
            scroller on the home page is the intended way to read the
            practice. This index is here for direct linking.
          </p>
        </section>

        <section
          className="next-division"
          style={{ background: "var(--color-bone)", border: "none" }}
        >
          {DIVISIONS.map((d) => (
            <Link
              key={d.slug}
              href={`/practice/${d.slug}`}
              style={{ marginTop: 0 }}
            >
              <span className="next-num">{d.num} / 07</span>
              <span className="next-name">{d.name}</span>
              <span className="next-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
