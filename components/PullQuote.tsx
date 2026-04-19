import type { ChapterKey } from "@/content/divisions";
import { chapterColor } from "@/lib/chapters";

type Props = {
  quote: string;
  attribution?: string;
  chapter?: ChapterKey;
};

export function PullQuote({ quote, attribution, chapter }: Props) {
  const color = chapter ? chapterColor(chapter) : "var(--color-ink)";
  return (
    <figure>
      <blockquote
        className="display-md"
        style={{ color, fontWeight: 400 }}
      >
        {`\u201C${quote}\u201D`}
      </blockquote>
      {attribution && (
        <figcaption className="eyebrow mt-6">{attribution}</figcaption>
      )}
    </figure>
  );
}
