import Link from "next/link";
import type { Division } from "@/content/divisions";
import { ChapterEdge } from "./ChapterEdge";

type Props = {
  division: Division;
  totalCount: number;
};

export function DivisionCard({ division, totalCount }: Props) {
  const numLabel = `${division.number} / ${String(totalCount).padStart(2, "0")}`;
  return (
    <Link
      href={`/practice/${division.slug}`}
      className="card card-interactive group relative block overflow-hidden p-6 md:p-8"
    >
      <ChapterEdge chapter={division.chapter} />
      <div className="mono-numeral mb-6">{numLabel}</div>
      <h3 className="display-sm mb-3">{division.name}</h3>
      <p className="prose-base mb-6 max-w-[48ch] text-[color:var(--color-silt)]">
        {division.positioning}
      </p>
      <span aria-hidden="true" className="cta cta-ghost">Learn more</span>
    </Link>
  );
}
