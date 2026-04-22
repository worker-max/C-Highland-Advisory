import Link from "next/link";
import type { Division } from "@/content/divisions";
import { ChapterEdge } from "./ChapterEdge";
import { CHAPTER_ICONS } from "./icons";

type Props = {
  division: Division;
  totalCount: number;
};

export function DivisionCard({ division, totalCount }: Props) {
  const numLabel = `${division.number} / ${String(totalCount).padStart(2, "0")}`;
  const ChapterMark = CHAPTER_ICONS[division.chapter];
  return (
    <Link
      href={`/practice/${division.slug}`}
      data-chapter={division.chapter}
      className="card card-interactive group relative block overflow-hidden p-6 md:p-8"
    >
      <ChapterEdge chapter={division.chapter} />
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="mono-numeral">{numLabel}</div>
        <ChapterMark size={56} title={`${division.name} mark`} />
      </div>
      <h3 className="display-sm mb-3">{division.name}</h3>
      <p className="prose-base mb-6 max-w-[48ch] text-[color:var(--color-silt)]">
        {division.positioning}
      </p>
      <span aria-hidden="true" className="cta cta-ghost">Learn more</span>
    </Link>
  );
}
