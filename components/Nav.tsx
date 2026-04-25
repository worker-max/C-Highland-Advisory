import Link from "next/link";
import { FIRM } from "@/lib/constants";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";
import { Emblem } from "./Emblem";

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
        <Link
          href="/"
          aria-label={FIRM.name}
          className="group flex items-center gap-3 text-[color:var(--color-ink)]"
        >
          <Emblem size={40} title={FIRM.name} />
          <span className="flex flex-col leading-none">
            <span
              className="font-mono text-[9px] uppercase text-[color:var(--color-silt)]"
              style={{ letterSpacing: "0.26em" }}
            >
              Senior Advisory
            </span>
            <span
              className="mt-1 text-[22px] leading-none"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              C{" "}
              <span style={{ fontStyle: "italic" }}>Highland</span>
            </span>
          </span>
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
