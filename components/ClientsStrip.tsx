import { Container } from "./Container";
import { ClientsMarquee } from "./ClientsMarquee";
import { OPERATOR_ROLES, type Client } from "@/content/clients";

/*
  Two strips, deliberately different rhythms — names-only edition.

  The previous build leaned on logos: a static logo+name grid for operator
  experience, a logo+name marquee for clients. The user's review:
  "logos are tiny, some unreadable; this isn't surprising or polished."
  So this iteration drops logos entirely and trusts the typography.

   1. Operator Experience — STATIC. Two large editorial entries.
      Newsreader italic name at clamp(36→64), with a thin lime hairline
      at the left edge as the only chrome. A small mono role tag sits
      below. No background fill, no card, no border. Reads like a colophon.

   2. Clients & Affiliations — MARQUEE. Names in big italic serif drift
      past, separated by 4-dot lime diamonds (DotIcon vocabulary). 110s
      linear pace; pause-on-hover; edge-fade masks. See ClientsMarquee.tsx.

  No marketing meta line on either section. The single mono micro-label
  per section is sufficient framing.
*/

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silt)]">
      {children}
    </div>
  );
}

function OperatorEntry({ client }: { client: Client }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      title={client.name}
      aria-label={`${client.name} — opens in a new tab`}
      className="group relative flex flex-col gap-3 py-2 pl-6"
    >
      {/* Lime hairline at left edge — the only chrome. Grows on hover. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-[2px] bg-[color:var(--color-lime)] transition-all duration-300 group-hover:w-[3px]"
      />
      <span
        className="leading-[1.02] text-[color:var(--color-ink)] transition-colors duration-300 group-hover:text-[color:var(--color-graphite)]"
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(36px, 5vw, 64px)",
          letterSpacing: "-0.02em",
        }}
      >
        {client.name}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-silt)]">
        Operator role
      </span>
    </a>
  );
}

export function ClientsStrip() {
  return (
    <section className="border-y border-[color:var(--color-mist)] py-16 md:py-24">
      {/* Operator Experience — flat editorial colophons, no boxes */}
      <Container>
        <MicroLabel>Operator experience</MicroLabel>
        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-2 md:gap-20">
          {OPERATOR_ROLES.map((client) => (
            <OperatorEntry key={client.domain} client={client} />
          ))}
        </div>
      </Container>

      {/* Generous separation — the marquee gets its own visual paragraph */}
      <div className="my-16 md:my-24" aria-hidden="true" />

      {/* Clients & Affiliations — typographic marquee, names only */}
      <Container>
        <MicroLabel>Clients &amp; affiliations</MicroLabel>
      </Container>
      <div className="mt-8 md:mt-12">
        <ClientsMarquee />
      </div>
    </section>
  );
}
