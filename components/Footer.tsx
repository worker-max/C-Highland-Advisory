import { FIRM } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="grid grid-cols-1 items-center gap-4 border-t px-6 py-10 md:grid-cols-3 md:px-12 md:pb-10 md:pt-[60px]"
      style={{ borderTopColor: "var(--color-rule)" }}
    >
      <div
        className="text-[14px]"
        style={{
          color: "var(--color-ink)",
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
        }}
      >
        {FIRM.legalName}
      </div>
      <div
        className="mono-label md:justify-self-center"
        style={{ letterSpacing: "0.12em" }}
      >
        {FIRM.location} · Est. {FIRM.founded}
      </div>
      <a
        href={FIRM.portfolioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mono-label footer-link md:justify-self-end"
        style={{ letterSpacing: "0.12em" }}
      >
        colinhighland.com ↗
        <style>{`
          .footer-link:hover { color: var(--color-accent) !important; }
        `}</style>
      </a>
    </footer>
  );
}
