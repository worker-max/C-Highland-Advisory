import Link from "next/link";
import { FIRM } from "@/lib/constants";
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
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-rule px-6 py-5 md:px-12 md:py-7"
      style={{
        background: "rgba(245, 242, 237, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottomColor: "var(--color-rule)",
      }}
    >
      <Link href="/" className="flex items-center gap-3">
        <span
          className="flex h-7 w-7 items-center justify-center border-[1.5px] font-mono text-[10px] font-medium"
          style={{ borderColor: "var(--color-ink)" }}
        >
          CH
        </span>
        <span
          className="font-display text-[18px]"
          style={{ fontWeight: 400, letterSpacing: "-0.01em" }}
        >
          {FIRM.name}
        </span>
      </Link>

      <ul className="hidden items-center gap-9 text-[13px] md:flex">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="transition-colors"
              style={{ color: "var(--color-ink-soft)", letterSpacing: "0.02em" }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <CTAButton href="/engagement" variant="primary" size="sm">
        Initiate brief →
      </CTAButton>
    </nav>
  );
}
