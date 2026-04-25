import { Container } from "./Container";
import { CLIENTS, OPERATOR_ROLES, type Client } from "@/content/clients";

/*
  ClientsStrip — Von Lyncker window-pane edition.

  Foundation language being established here:
    • White rounded cards (16px radius) sit on a slightly darker warm
      base. The 1px gap between adjacent cards lets the base bleed
      through, creating the "window pane" effect from the reference site.
    • Clean modern sans for names. No italic serif — that treatment
      was the wrong read of "polished."
    • Lime as the only accent: a small tag badge or hover state.

  Two zones, distinct but built from the same card primitives:

   1. Operator Experience — 2 large cards. Each shows the brand,
      role, and tenure window. Lime "OPERATOR" badge in the corner
      to differentiate from advisory engagements.

   2. Clients & Affiliations — Compact grid (5 cols on lg, 4 on md,
      2 on mobile). Each card carries name + sector tag.

  Sector labels — short, human-friendly, derived from sector key.
*/

const SECTOR_LABEL: Record<NonNullable<Client["sector"]>, string> = {
  "national-services": "National services",
  government: "Government",
  healthcare: "Healthcare",
  hospitality: "Hospitality",
  ai: "AI / software",
  sports: "Sports",
  communications: "Communications",
};

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-silt)]">
      {children}
    </div>
  );
}

function OperatorCard({ client }: { client: Client }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      title={client.name}
      aria-label={`${client.name} — opens in a new tab`}
      className="group relative flex flex-col justify-between gap-12 rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_-12px_rgba(15,15,16,0.12)] md:p-9"
    >
      {/* Lime corner badge — operator role, distinguishes from advisory clients */}
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-ink)]"
          style={{ backgroundColor: "var(--color-lime)" }}
        >
          <span className="size-1 rounded-full bg-[color:var(--color-ink)]" />
          Operator
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silt)]">
          2019 — 2026
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-sans text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.05] tracking-[-0.022em] text-[color:var(--color-ink)]">
          {client.name}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-silt)]">
          Healthcare · workforce systems
        </span>
      </div>
    </a>
  );
}

function ClientCard({ client }: { client: Client }) {
  const sectorLabel = client.sector ? SECTOR_LABEL[client.sector] : null;
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      title={client.name}
      aria-label={`${client.name} — opens in a new tab`}
      className="group flex h-full flex-col justify-between gap-6 rounded-2xl bg-white p-5 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-12px_rgba(15,15,16,0.12)] md:p-6"
    >
      <span className="font-sans text-[15px] font-medium leading-[1.2] tracking-[-0.005em] text-[color:var(--color-ink)] md:text-[16px]">
        {client.name}
      </span>
      <div className="flex items-center justify-between gap-2">
        {sectorLabel ? (
          <span className="truncate font-mono text-[9.5px] uppercase tracking-[0.18em] text-[color:var(--color-silt)]">
            {sectorLabel}
          </span>
        ) : (
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[color:var(--color-silt)]">
            &nbsp;
          </span>
        )}
        {/* Lime indicator dot — becomes solid on hover, signals "live" */}
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-[color:var(--color-mist)] transition-colors duration-300 group-hover:bg-[color:var(--color-lime)]"
        />
      </div>
    </a>
  );
}

export function ClientsStrip() {
  return (
    <section className="border-y border-[color:var(--color-mist)] py-14 md:py-20">
      {/* Operator Experience — 2 large cards */}
      <Container>
        <div className="mb-6 md:mb-8">
          <MicroLabel>Operator experience</MicroLabel>
        </div>
        {/*
          The wrapper bg sits behind the 1px gap between cards (the
          "window pane" base). It's a half-tone darker than the section
          bg so the bleed reads cleanly.
        */}
        <div
          className="grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2"
          style={{
            backgroundColor: "var(--color-mist)",
            gap: "1px",
          }}
        >
          {OPERATOR_ROLES.map((client) => (
            <OperatorCard key={client.domain} client={client} />
          ))}
        </div>
      </Container>

      {/* Spacer between zones */}
      <div className="h-12 md:h-16" aria-hidden="true" />

      {/* Clients & Affiliations — compact grid */}
      <Container>
        <div className="mb-6 flex items-end justify-between md:mb-8">
          <MicroLabel>Clients &amp; affiliations</MicroLabel>
          <MicroLabel>
            <span className="text-[color:var(--color-graphite)]">
              {CLIENTS.length}
            </span>{" "}
            engagements
          </MicroLabel>
        </div>
        <div
          className="grid grid-cols-2 overflow-hidden rounded-2xl sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          style={{
            backgroundColor: "var(--color-mist)",
            gap: "1px",
          }}
        >
          {CLIENTS.map((client) => (
            <ClientCard key={client.domain} client={client} />
          ))}
        </div>
      </Container>
    </section>
  );
}
