"use client";

import { useState } from "react";
import {
  CLIENTS,
  clientLogoSrc,
  clientLogoFallback,
  type Client,
} from "@/content/clients";

/*
  ClientsMarquee — auto-scrolling client ticker.

  CLIENTS list is rendered twice in a row, then the whole track translates
  -50% over 70s on a linear infinite loop, producing a seamless ticker.
  Pauses on hover. Each cell links to the client's site (target=_blank).

  The track is wrapped in a fade-edge mask so logos drift in/out of view
  cleanly rather than abruptly clipping at the container edge.
*/

function MarqueeCell({ client }: { client: Client }) {
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
      className="group flex h-16 shrink-0 items-center gap-3 px-6"
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
      <span className="whitespace-nowrap text-[13px] font-medium leading-[1.2] tracking-[-0.005em] text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-lime)]">
        {client.name}
      </span>
    </a>
  );
}

export function ClientsMarquee() {
  // Render the list twice for the seamless -50% translate loop.
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <div className="marquee-pause group/marquee relative w-full overflow-hidden">
      {/* edge fade mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32"
        style={{
          background:
            "linear-gradient(to right, var(--color-bone) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32"
        style={{
          background:
            "linear-gradient(to left, var(--color-bone) 0%, transparent 100%)",
        }}
      />

      <div className="marquee-track flex w-max">
        {items.map((client, i) => (
          <MarqueeCell key={`${client.name}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}
