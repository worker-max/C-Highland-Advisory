import { Container } from "./Container";

/*
  Clients & Affiliations strip — placeholder grid until the real list arrives.

  Pattern: 12-slot logo grid, 2-col mobile → 6-col desktop, hairline-divided
  cells that read as a publisher's mark sheet rather than a marketing band.

  When real logos arrive: each <Slot> gets replaced by an <img> with the
  same aspect ratio (5/3) and grayscale filter. Hover-to-color is the
  standard B2B convention; we'll wire that in when there's something to
  hover.
*/

const PLACEHOLDER_COUNT = 12;

export function ClientsStrip() {
  return (
    <section className="border-y border-[color:var(--color-mist)] py-14 md:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-silt)]">
            — Clients & Affiliations
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-mist)]">
            Placeholder · awaiting list
          </div>
        </div>

        <div
          role="list"
          aria-label="Clients and affiliations placeholder grid"
          className="grid grid-cols-2 gap-px bg-[color:var(--color-mist)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <div
              key={i}
              role="listitem"
              className="flex aspect-[5/3] items-center justify-center bg-[color:var(--color-bone)]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silt)] opacity-60">
                Logo {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
