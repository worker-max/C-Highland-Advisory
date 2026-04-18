import Link from "next/link";
import type { Division } from "@/content/divisions";

type Props = {
  division: Division;
  totalCount: number;
};

export function DivisionRow({ division, totalCount }: Props) {
  const numLabel = `${division.number} / ${String(totalCount).padStart(2, "0")}`;
  const modelsLabel = division.engagementModels.join(" · ");

  return (
    <Link
      href={`/practice/${division.slug}`}
      className="division-row relative grid items-start gap-4 border-b py-9 md:grid-cols-[60px_minmax(240px,1.2fr)_2fr_200px] md:gap-10"
      style={{ borderBottomColor: "var(--color-rule)" }}
      aria-label={`${division.name} — ${modelsLabel}`}
    >
      <div className="mono-numeral pt-2">{numLabel}</div>
      <div>
        <div
          className="division-name"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "clamp(26px, 2.6vw, 34px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
          }}
        >
          {division.name}
        </div>
      </div>
      <p
        className="max-w-[56ch] text-[15px] leading-[1.6] md:col-start-3"
        style={{ color: "var(--color-ink-soft)" }}
      >
        {division.shortDescription}
      </p>
      <div
        className="flex flex-col items-start gap-2 font-mono text-[11px] uppercase md:items-end md:text-right"
        style={{ color: "var(--color-ink-mute)", letterSpacing: "0.12em" }}
      >
        <span>Engagement</span>
        <span>{modelsLabel}</span>
        <span
          className="division-arrow mt-0"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 200,
            fontSize: 28,
            color: "var(--color-ink-soft)",
            lineHeight: 1,
          }}
        >
          →
        </span>
      </div>
    </Link>
  );
}
