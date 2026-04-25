import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Transmissions",
  description:
    "Field notes, frameworks, and essays from across the practice. Inaugural dispatch forthcoming.",
};

export default function TransmissionsPage() {
  return (
    <>
      <main style={{ paddingTop: "14vh" }}>
        <section style={{ padding: "8vh var(--gutter) 14vh" }}>
          <span className="eyebrow">
            <span className="marker" /> Transmissions
          </span>
          <h1
            className="h-display"
            style={{ marginTop: 16, marginBottom: 24, maxWidth: "18ch" }}
          >
            Writing from the practice.
          </h1>
          <p
            className="body-base"
            style={{ maxWidth: "56ch", marginBottom: 48 }}
          >
            Field notes, frameworks, and essays from across the seven
            divisions. The inaugural dispatch is forthcoming.
          </p>
          <Link href="/" className="btn btn-ghost">
            <span>Back to the practice</span>
            <span className="arrow">→</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
