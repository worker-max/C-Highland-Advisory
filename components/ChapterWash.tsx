import type { ChapterKey } from "@/content/divisions";
import { chapterColor } from "@/lib/chapters";

type Props = {
  chapter: ChapterKey;
  intensity?: number;
};

/*
  Radial wash used on division detail page heroes.
  Washes the top ~40% of the section in the chapter color at low opacity.
*/
export function ChapterWash({ chapter, intensity = 0.22 }: Props) {
  const color = chapterColor(chapter);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] -z-10"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${color} 0%, transparent 65%)`,
        opacity: intensity,
      }}
    />
  );
}
