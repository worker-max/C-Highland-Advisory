import { FIRM } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="flex flex-col items-start justify-between gap-4 border-t px-6 py-10 md:flex-row md:items-center md:px-12 md:pb-10 md:pt-[60px]"
      style={{ borderTopColor: "var(--color-rule)" }}
    >
      <div
        className="font-display text-[14px]"
        style={{ color: "var(--color-ink)", letterSpacing: "-0.01em" }}
      >
        {FIRM.legalName}
      </div>
      <div
        className="font-mono text-[11px] uppercase"
        style={{ color: "var(--color-ink-mute)", letterSpacing: "0.1em" }}
      >
        {FIRM.location} · Est. {FIRM.founded}
      </div>
      <a
        href={FIRM.portfolioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] uppercase transition-colors hover:text-ink"
        style={{ color: "var(--color-ink-mute)", letterSpacing: "0.1em" }}
      >
        colinhighland.com ↗
      </a>
    </footer>
  );
}
