import Link from "next/link";
import type { Division } from "@/content/divisions";
import { chapterColor } from "@/lib/chapters";
import { CHAPTER_ICONS } from "./icons";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type Props = {
  division: Division;
  index: number;
  total: number;
};

/*
  Each division as a full-width editorial section — Von Lyncker pattern.

  Layout:
    [ left column: numeral, title, lead, top services, learn-more link ]
    [ right column (lg+): the chapter's animated mark at 240-280px ]

  A subtle chapter-color radial wash sits on the right edge of the section
  to ground each one in its own atmosphere without being decorative.
*/

export function DivisionSection({ division, index, total }: Props) {
  const ChapterMark = CHAPTER_ICONS[division.chapter];
  const num = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");
  const accent = chapterColor(division.chapter);

  // Limit services list shown on the homepage to keep each section compact.
  const featuredServices = division.services.slice(0, 5);

  return (
    <section
      data-chapter={division.chapter}
      className="relative overflow-hidden border-t border-[color:var(--color-mist)] py-20 md:py-28"
    >
      {/* Subtle chapter wash on the right edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-2/3"
        style={{
          background: `radial-gradient(ellipse 65% 75% at 95% 50%, ${accent} 0%, transparent 65%)`,
          opacity: 0.06,
        }}
      />

      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
            <div>
              <div
                className="mb-6 font-mono text-[12px] uppercase tracking-[0.18em]"
                style={{ color: accent }}
              >
                {num} <span className="text-[color:var(--color-silt)]">/ {totalStr}</span>
              </div>

              <h3 className="mb-6 max-w-[22ch] font-sans text-[clamp(32px,4vw,56px)] font-medium leading-[1.05] tracking-[-0.025em] text-[color:var(--color-ink)]">
                {division.name}
              </h3>

              <p className="mb-10 max-w-[58ch] text-[clamp(17px,1.6vw,21px)] leading-[1.55] text-[color:var(--color-graphite)]">
                {division.positioning}
              </p>

              <div className="mb-10 max-w-[60ch]">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-silt)] mb-4">
                  — Programs &amp; services
                </div>
                <ul className="space-y-3">
                  {featuredServices.map((service) => (
                    <li
                      key={service}
                      className="flex gap-4 border-t border-[color:var(--color-mist)] pt-3 text-[15px] leading-[1.5] text-[color:var(--color-graphite)]"
                    >
                      <span
                        className="mt-[7px] h-px w-4 shrink-0"
                        style={{ background: accent, opacity: 0.6 }}
                        aria-hidden="true"
                      />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/practice/${division.slug}`}
                className="group inline-flex items-baseline gap-2 font-mono text-[12px] uppercase tracking-[0.14em]"
                style={{ color: "var(--color-ink)" }}
              >
                <span>Explore the practice</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex lg:items-start lg:justify-end lg:pt-2">
              <ChapterMark size={280} title={`${division.name} mark`} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
