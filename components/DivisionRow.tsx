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
      className="division-row relative grid cursor-pointer items-start gap-4 border-b py-9 transition-all md:grid-cols-[60px_1fr_2fr_200px] md:gap-10"
      style={{ borderBottomColor: "var(--color-rule)" }}
      aria-label={`${division.name} — ${modelsLabel}`}
    >
      <div
        className="pt-2 font-mono text-[12px]"
        style={{ color: "var(--color-ink-mute)", letterSpacing: "0.08em" }}
      >
        {numLabel}
      </div>
      <div>
        <div
          className="division-name font-display text-[24px] transition-colors md:text-[26px]"
          style={{ fontWeight: 300, lineHeight: 1.15, letterSpacing: "-0.01em" }}
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
        style={{ color: "var(--color-ink-mute)", letterSpacing: "0.1em" }}
      >
        <span>Engagement</span>
        <span>{modelsLabel}</span>
        <span
          className="division-arrow mt-0 font-display text-[24px] transition-all"
          style={{ color: "var(--color-ink-mute)" }}
        >
          →
        </span>
      </div>
      <style>{`
        .division-row::before {
          content: "";
          position: absolute;
          left: -1.5rem;
          right: -1.5rem;
          top: 0;
          bottom: 0;
          background: var(--color-paper-deep);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }
        @media (min-width: 768px) {
          .division-row::before {
            left: -3rem;
            right: -3rem;
          }
        }
        .division-row:hover::before { opacity: 1; }
        .division-row:hover .division-name { color: var(--color-accent); }
        .division-row:hover .division-arrow {
          color: var(--color-accent);
          transform: translateX(8px);
        }
      `}</style>
    </Link>
  );
}
