import Link from "next/link";
import { FIRM } from "@/lib/constants";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";

const LINKS = [
  { href: "/practice", label: "Practice" },
  { href: "/founder", label: "Founder" },
  { href: "/transmissions", label: "Transmissions" },
  { href: "/engagement", label: "Engagement" },
];

export function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--color-mist)] bg-[rgb(247_245_241_/_0.8)] backdrop-blur"
    >
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 text-[color:var(--color-ink)]">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-ink)] font-sans text-[11px] font-medium"
          >
            CH
          </span>
          <span className="text-[17px] font-medium tracking-tight">{FIRM.name}</span>
        </Link>

        <ul className="hidden items-center gap-8 text-[14px] md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[color:var(--color-graphite)] transition-colors hover:text-[color:var(--color-ink)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <CTAButton href="/engagement" variant="primary">
          Begin engagement
        </CTAButton>
      </Container>
    </nav>
  );
}
