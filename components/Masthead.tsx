"use client";

import { usePathname } from "next/navigation";
import { FIRM } from "@/lib/constants";
import { DIVISIONS } from "@/content/divisions";

/*
  Running editorial masthead. Sits above Nav. Numbered "dossiers" per page
  give the site continuity as an editorial property rather than a service-page set.
  Hover the dossier number to reveal the page slug — quiet wayfinding.
*/
const DOSSIER_BY_PATH: Record<string, { n: string; slug: string }> = {
  "/": { n: "01", slug: "masthead" },
  "/practice": { n: "02", slug: "the practice" },
  "/founder": { n: "03", slug: "the founder" },
  "/engagement": { n: "04", slug: "engagement" },
  "/transmissions": { n: "05", slug: "transmissions" },
};

function resolve(pathname: string) {
  if (DOSSIER_BY_PATH[pathname]) return DOSSIER_BY_PATH[pathname];
  if (pathname.startsWith("/practice/")) {
    const slug = pathname.slice("/practice/".length);
    const division = DIVISIONS.find((d) => d.slug === slug);
    if (division) {
      return {
        n: `02.${division.number}`,
        slug: (division.shortName ?? division.name).toLowerCase(),
      };
    }
  }
  return { n: "—", slug: "off-ledger" };
}

export function Masthead() {
  const pathname = usePathname();
  const dossier = resolve(pathname);

  return (
    <div
      aria-label="Publication masthead"
      className="fixed inset-x-0 top-0 z-[49] flex items-center justify-between border-b px-6 py-2 md:px-12"
      style={{
        background: "var(--color-paper-deep)",
        borderBottomColor: "var(--color-rule)",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-ink-mute)",
      }}
    >
      <div className="flex items-center gap-4 md:gap-6">
        <span>Issue 00</span>
        <span aria-hidden="true" style={{ color: "var(--color-rule)" }}>
          ·
        </span>
        <span>{FIRM.location.split(",")[0]}</span>
        <span aria-hidden="true" style={{ color: "var(--color-rule)" }}>
          ·
        </span>
        <span className="hidden md:inline">Established {FIRM.founded}</span>
      </div>
      <div className="masthead-dossier relative flex items-center gap-1">
        <span style={{ color: "var(--color-ink-soft)" }}>Dossier No.</span>
        <span
          style={{
            color: "var(--color-ink)",
            transition: "color var(--dur-hover) var(--ease-editorial)",
          }}
        >
          {dossier.n}
        </span>
        <span
          aria-hidden="true"
          className="masthead-dossier-slug overflow-hidden whitespace-nowrap"
          style={{
            maxWidth: 0,
            opacity: 0,
            paddingLeft: 0,
            color: "var(--color-ink-soft)",
            transition:
              "max-width 300ms var(--ease-editorial), opacity 300ms var(--ease-editorial), padding 300ms var(--ease-editorial)",
          }}
        >
          · {dossier.slug}
        </span>
      </div>
    </div>
  );
}
