import type { ChapterKey } from "@/content/divisions";

/*
  Single source of truth for chapter-color token lookup.
  Consumers: ChapterEdge, ChapterDot, ChapterWash, DivisionCard, any page
  that needs a chapter-hued element.
*/
export const CHAPTER_VAR: Record<ChapterKey, string> = {
  strategy: "var(--color-ch-strategy)",
  healthcare: "var(--color-ch-healthcare)",
  homehealth: "var(--color-ch-homehealth)",
  talent: "var(--color-ch-talent)",
  hr: "var(--color-ch-hr)",
  ai: "var(--color-ch-ai)",
  humanai: "var(--color-ch-humanai)",
};

export function chapterColor(chapter: ChapterKey): string {
  return CHAPTER_VAR[chapter];
}
