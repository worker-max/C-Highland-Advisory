import type { ChapterKey } from "@/content/divisions";
import clsx from "clsx";

type Props = {
  chapter: ChapterKey;
  variant?: "edge" | "dot";
  className?: string;
};

const CHAPTER_VAR: Record<ChapterKey, string> = {
  strategy: "var(--color-ch-strategy)",
  healthcare: "var(--color-ch-healthcare)",
  homehealth: "var(--color-ch-homehealth)",
  talent: "var(--color-ch-talent)",
  hr: "var(--color-ch-hr)",
  ai: "var(--color-ch-ai)",
};

/*
  "edge" = 4px left-edge bar (used on cards).
  "dot"  = small inline 10px dot (used inline near text).
  Consumers position and size the wrapper; this component only renders the mark.
*/
export function ChapterChip({ chapter, variant = "edge", className }: Props) {
  const color = CHAPTER_VAR[chapter];
  if (variant === "dot") {
    return (
      <span
        aria-hidden="true"
        className={clsx("inline-block h-[10px] w-[10px] rounded-full", className)}
        style={{ background: color }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={clsx("absolute left-0 top-0 h-full w-[4px] rounded-l-[14px]", className)}
      style={{ background: color }}
    />
  );
}

export function chapterColor(chapter: ChapterKey) {
  return CHAPTER_VAR[chapter];
}
