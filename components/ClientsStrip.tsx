"use client";

import { useState } from "react";
import { Container } from "./Container";
import { ClientsMarquee } from "./ClientsMarquee";
import {
  OPERATOR_ROLES,
  clientLogoSrc,
  clientLogoFallback,
  CLIENTS,
  type Client,
} from "@/content/clients";

/*
  Two strips, deliberately different rhythms:

   1. Operator Experience — STATIC. Two cells (Humana + CenterWell Home
      Health) sized to give each weight. Where the title was held.

   2. Clients & Affiliations — MARQUEE. Auto-scrolling ticker of all 20
      brands. Pauses on hover. Edge-fade mask. Cross-industry breadth
      shown as continuous motion.
*/

function OperatorCell({ client }: { client: Client }) {
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
      className="group flex h-20 items-center gap-4 bg-[color:var(--color-bone)] px-6 transition-colors hover:bg-[color:var(--color-paper)]"
    >
      {stage !== "text" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={handleError}
          className="h-9 w-12 shrink-0 object-contain"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-9 w-12 shrink-0 items-center justify-center rounded-[3px] bg-[color:var(--color-mist)]/40"
        />
      )}
      <span className="text-[15px] font-medium leading-[1.2] tracking-[-0.005em] text-[color:var(--color-ink)]">
        {client.name}
      </span>
    </a>
  );
}

export function ClientsStrip() {
  return (
    <section className="border-y border-[color:var(--color-mist)] py-12 md:py-14">
      {/* Operator Experience — static, wider cells */}
      <Container>
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-silt)]">
            — Operator Experience
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-silt)] opacity-70">
            Where the title was held
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[color:var(--color-mist)] sm:grid-cols-2">
          {OPERATOR_ROLES.map((client) => (
            <OperatorCell key={client.domain} client={client} />
          ))}
        </div>
      </Container>

      <div className="my-10" aria-hidden="true" />

      {/* Clients & Affiliations — marquee ticker */}
      <Container>
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-silt)]">
            — Clients &amp; Affiliations
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-silt)] opacity-70">
            {CLIENTS.length} engagements · across healthcare, government, hospitality, sports &amp; AI
          </div>
        </div>
      </Container>

      {/* Marquee renders edge-to-edge — outside Container so the fade mask aligns with viewport */}
      <ClientsMarquee />
    </section>
  );
}
