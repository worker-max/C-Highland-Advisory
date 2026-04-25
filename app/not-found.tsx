import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ paddingTop: "14vh" }}>
      <section style={{ padding: "8vh var(--gutter) 14vh" }}>
        <span className="eyebrow">
          <span className="marker" /> Not found
        </span>
        <h1
          className="h-display"
          style={{ marginTop: 16, marginBottom: 24, maxWidth: "18ch" }}
        >
          This page is not in the ledger.
        </h1>
        <p className="body-base" style={{ maxWidth: "56ch", marginBottom: 48 }}>
          It may have moved, or it may never have existed. The practice is
          still the right next step.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <Link href="/" className="btn btn-ghost">
            <span>Home</span>
            <span className="arrow">→</span>
          </Link>
          <Link href="/#divisions" className="btn btn-primary">
            <span>View divisions</span>
            <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
