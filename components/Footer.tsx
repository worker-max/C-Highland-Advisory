import { FIRM } from "@/lib/constants";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-mist)] py-12">
      <Container className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
        <div className="text-[15px] font-medium text-[color:var(--color-ink)]">
          {FIRM.legalName}
        </div>
        <div className="text-[13px] text-[color:var(--color-silt)] md:justify-self-center">
          {FIRM.location} · Est. {FIRM.founded}
        </div>
        <a
          href={FIRM.portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-[color:var(--color-silt)] transition-colors hover:text-[color:var(--color-ink)] md:justify-self-end"
        >
          colinhighland.com ↗
        </a>
      </Container>
    </footer>
  );
}
