"use client";

import { useState } from "react";
import { Container } from "./Container";
import {
  CLIENTS,
  OPERATOR_ROLES,
  clientLogoSrc,
  clientLogoFallback,
  type Client,
} from "@/content/clients";

/*
  Two strips, rendered together:

   1. Operator experience (Humana + CenterWell Home Health) — wider, fewer
      cells per row so each logo carries weight. This is where the operator
      title was held; honest framing as employer history, not advisory work.

   2. Clients & Affiliations (20 brands) — denser 5x4 grid. The cross-
      industry portfolio of advisory engagements.

  Each cell tries Uplead -> DuckDuckGo -> mono-text fallback, so no slot
  ever blanks out. Cells link to the brand's site (target=_blank).
*/

function LogoCell({ client }: { client: Client }) {
  // Three-step source chain: primary, then favicon fallback, then text.
  const primary = clientLogoSrc(client);
  const favicon = clientLogoFallback(client);
  const [src, setSrc] = useState<string>(primary);
  const [stage, setStage] = useState<"primary" | "favicon" | "text">("primary");

  function handleError() {
    if (stage === "primary") {
      setSrc(favicon);
      setStage("favicon");
    } else {
      setStage("text");
    }
  }

  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      title={client.name}
      aria-label={`${client.name} — opens in a new tab`}
      className="group flex aspect-[5/3] items-center justify-center bg-[color:var(--color-bone)] p-6 transition-colors hover:bg-[color:var(--color-paper)]"
    >
      {stage !== "text" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={client.name}
          loading="lazy"
          onError={handleError}
          className="max-h-[44px] max-w-[78%] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <span className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-silt)] transition-colors group-hover:text-[color:var(--color-ink)]">
          {client.name}
        </span>
      )}
    </a>
  );
}

type StripProps = {
  label: string;
  meta?: string;
  items: Client[];
  /** desktop grid cols; mobile + tablet step down responsively */
  cols?: 2 | 5;
};

function LogoStrip({ label, meta, items, cols = 5 }: StripProps) {
  const desktopCols = cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-5";
  const tabletCols = cols === 2 ? "md:grid-cols-2" : "md:grid-cols-4";

  return (
    <Container>
      <div className="mb-8 flex flex-col gap-2 md:mb-10 md:flex-row md:items-baseline md:justify-between">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-silt)]">
          — {label}
        </div>
        {meta && (
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-silt)] opacity-70">
            {meta}
          </div>
        )}
      </div>

      <div
        role="list"
        aria-label={label}
        className={`grid grid-cols-2 gap-px bg-[color:var(--color-mist)] sm:grid-cols-3 ${tabletCols} ${desktopCols}`}
      >
        {items.map((client) => (
          <div role="listitem" key={`${client.name}-${client.domain}`}>
            <LogoCell client={client} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export function ClientsStrip() {
  return (
    <section className="border-y border-[color:var(--color-mist)] py-14 md:py-20">
      <LogoStrip
        label="Operator Experience"
        meta="Where the title was held"
        items={OPERATOR_ROLES}
        cols={2}
      />

      <div className="my-14 md:my-20" aria-hidden="true" />

      <LogoStrip
        label="Clients & Affiliations"
        meta={`${CLIENTS.length} engagements · across healthcare, government, hospitality, sports & AI`}
        items={CLIENTS}
        cols={5}
      />
    </section>
  );
}
