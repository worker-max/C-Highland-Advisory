import type { ChapterKey } from "@/content/divisions";
import { chapterColor } from "@/lib/chapters";
import clsx from "clsx";

type Props = {
  chapter: ChapterKey;
  className?: string;
};

/*
  10px inline dot used next to text/labels to signal a chapter.
  Parents don't need any special positioning or radius setup.
*/
export function ChapterDot({ chapter, className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={clsx("inline-block h-[10px] w-[10px] rounded-full", className)}
      style={{ background: chapterColor(chapter) }}
    />
  );
}
