// Pure server component — animation is CSS-only (see globals.css
// .marquee-track--editorial). Hover-pause is handled by CSS hover state
// on the .marquee-pause container, no JS needed.
import { CLIENTS, type Client } from "@/content/clients";

/*
  ClientsMarquee — typographic edition.

  No logos. The names are the visual.

  The previous build was a logo+name ticker, which read like every other
  consultancy on the internet. This iteration trusts the typography:

    • Each name renders in Newsreader italic at editorial scale
      (clamp 28→56px), inheriting the wordmark's serif voice.
    • Between every name sits a small lime dot-pattern marker —
      a 4-dot diamond drawn in inline SVG, echoing the DotIcon
      vocabulary already used across The Practice section.
    • The track auto-scrolls at 90s linear (slower than a logo wall;
      editorial pacing — the eye should LINGER, not scan).
    • Hover pauses. Each name is a real link to the client site.
    • Edge fades preserve the "always more" affordance.

  The result is unambiguous: this is not a logo grid. This is a colophon.
*/

function DotMark() {
  // 4-dot diamond — quiet but unmistakably lime, ~14px square.
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
      className="shrink-0"
      style={{ color: "var(--color-lime)" }}
    >
      <circle cx="7" cy="2"  r="1.4" fill="currentColor" />
      <circle cx="2" cy="7"  r="1.4" fill="currentColor" />
      <circle cx="12" cy="7" r="1.4" fill="currentColor" />
      <circle cx="7" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

function NameEntry({ client }: { client: Client }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${client.name} — opens in a new tab`}
      className="group flex shrink-0 items-center gap-10 px-6"
    >
      <span
        className="whitespace-nowrap leading-[1.05] text-[color:var(--color-ink)] transition-colors duration-300 group-hover:text-[color:var(--color-silt)]"
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(28px, 4vw, 56px)",
          letterSpacing: "-0.015em",
        }}
      >
        {client.name}
      </span>
      <DotMark />
    </a>
  );
}

export function ClientsMarquee() {
  // Render the list twice for the seamless -50% translate loop.
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <div className="marquee-pause group/marquee relative w-full overflow-hidden py-4">
      {/* edge fade masks — wider than before; the fade itself is the framing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-48"
        style={{
          background:
            "linear-gradient(to right, var(--color-bone) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-48"
        style={{
          background:
            "linear-gradient(to left, var(--color-bone) 0%, transparent 100%)",
        }}
      />

      <div className="marquee-track marquee-track--editorial flex w-max items-center">
        {items.map((client, i) => (
          <NameEntry key={`${client.name}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}
