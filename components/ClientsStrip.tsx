"use client";

import { useState } from "react";
import { Container } from "./Container";
import { ClientsMarquee } from "./ClientsMarquee";
import {
  OPERATOR_ROLES,
  clientLogoSrc,
  clientLogoFallback,
  type Client,
} from "@/content/clients";

/*
  Two strips, deliberately different rhythms — minimalist build per user
  review (drop the verbose sub-labels, let the visuals speak):

   1. Operator Experience — STATIC. Two cells (Humana + CenterWell Home
      Health). No sub-tag, no marketing meta line.

   2. Clients & Affiliations — MARQUEE. Auto-scrolling ticker. No meta line.
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

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silt)]">
      {children}
    </div>
  );
}

export function ClientsStrip() {
  return (
    <section className="border-y border-[color:var(--color-mist)] py-10 md:py-14">
      {/* Operator Experience — static, wider cells, no meta */}
      <Container>
        <MicroLabel>Operator experience</MicroLabel>
        <div className="grid grid-cols-1 gap-px bg-[color:var(--color-mist)] sm:grid-cols-2">
          {OPERATOR_ROLES.map((client) => (
            <OperatorCell key={client.domain} client={client} />
          ))}
        </div>
      </Container>

      <div className="my-8 md:my-10" aria-hidden="true" />

      {/* Clients & Affiliations — edge-to-edge marquee */}
      <Container>
        <MicroLabel>Clients &amp; affiliations</MicroLabel>
      </Container>
      <ClientsMarquee />
    </section>
  );
}
