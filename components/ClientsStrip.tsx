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
  Two strips, both compact horizontal-row cells:

   1. Operator Experience — Humana, CenterWell Home Health
   2. Clients & Affiliations — 20 brands

  Each cell: tight h-16 row, small color logo on the left (h-7), brand name
  in sans-medium beside it. No grayscale — color is the recognition cue
  for many of these (Servpro orange, CertaPro red, Citibot blue, etc.).
  Text fallback (mono caps) takes the cell when logo sources fail.

  Whole cell links to the brand's site.
*/

function LogoCell({ client }: { client: Client }) {
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
      className="group flex h-16 items-center gap-3 bg-[color:var(--color-bone)] px-4 transition-colors hover:bg-[color:var(--color-paper)]"
    >
      {stage !== "text" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={handleError}
          className="h-7 w-9 shrink-0 object-contain"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-7 w-9 shrink-0 items-center justify-center rounded-[3px] bg-[color:var(--color-mist)]/40"
        />
      )}
      <span className="truncate text-[13px] font-medium leading-[1.2] tracking-[-0.005em] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-ink)]">
        {client.name}
      </span>
    </a>
  );
}

type StripProps = {
  label: string;
  meta?: string;
  items: Client[];
  /** desktop columns; mobile/tablet auto-step down */
  cols?: 2 | 3 | 4 | 5;
};

const COL_DESKTOP: Record<NonNullable<StripProps["cols"]>, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};
const COL_TABLET: Record<NonNullable<StripProps["cols"]>, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-4",
};

function LogoStrip({ label, meta, items, cols = 4 }: StripProps) {
  return (
    <Container>
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
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
        className={`grid grid-cols-1 gap-px bg-[color:var(--color-mist)] sm:grid-cols-2 ${COL_TABLET[cols]} ${COL_DESKTOP[cols]}`}
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
    <section className="border-y border-[color:var(--color-mist)] py-12 md:py-14">
      <LogoStrip
        label="Operator Experience"
        meta="Where the title was held"
        items={OPERATOR_ROLES}
        cols={2}
      />

      <div className="my-8" aria-hidden="true" />

      <LogoStrip
        label="Clients & Affiliations"
        meta={`${CLIENTS.length} engagements · across healthcare, government, hospitality, sports & AI`}
        items={CLIENTS}
        cols={4}
      />
    </section>
  );
}
