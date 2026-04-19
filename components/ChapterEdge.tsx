import type { ChapterKey } from "@/content/divisions";
import { chapterColor } from "@/lib/chapters";
import clsx from "clsx";

type Props = {
  chapter: ChapterKey;
  className?: string;
};

/*
  4px left-edge bar in the chapter color. Must be placed inside a
  `position: relative` parent with matching border-radius — currently
  pairs with the `.card` class (14px radius).
*/
export function ChapterEdge({ chapter, className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "absolute left-0 top-0 h-full w-[4px] rounded-l-[14px]",
        className,
      )}
      style={{ background: chapterColor(chapter) }}
    />
  );
}
