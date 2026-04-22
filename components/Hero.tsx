import type { ReactNode } from "react";
import clsx from "clsx";
import type { ChapterKey } from "@/content/divisions";
import { chapterColor } from "@/lib/chapters";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";
import { ChapterBand } from "./ChapterBand";
import { ChapterWash } from "./ChapterWash";
import { Reveal } from "./Reveal";

type CtaSpec = { label: string; href: string };

type Props = {
  mode?: "homepage" | "page";
  chapter?: ChapterKey;
  mark?: ReactNode;
  eyebrow?: string;
  headline: ReactNode;
  lead?: ReactNode;
  byline?: ReactNode;
  primaryCta?: CtaSpec;
  secondaryCta?: CtaSpec;
  className?: string;
};

export function Hero({
  mode = "page",
  chapter,
  mark,
  eyebrow,
  headline,
  lead,
  byline,
  primaryCta,
  secondaryCta,
  className,
}: Props) {
  return (
    <section
      className={clsx(
        "relative overflow-hidden pt-[140px] pb-[96px] md:pt-[180px] md:pb-[120px]",
        className,
      )}
    >
      {mode === "homepage" && <ChapterBand />}
      {mode === "page" && chapter && <ChapterWash chapter={chapter} />}
      <Container>
        <Reveal>
          {mark && <div className="mb-8">{mark}</div>}
          {eyebrow && (
            <div
              className="eyebrow mb-6"
              style={
                mode === "page" && chapter
                  ? { color: chapterColor(chapter) }
                  : undefined
              }
            >
              {eyebrow}
            </div>
          )}
          <h1
            className={clsx(
              mode === "homepage" ? "display-xl" : "display-lg",
              "max-w-[18ch]",
            )}
          >
            {headline}
          </h1>
          {lead && <p className="lead mt-8">{lead}</p>}
          {byline && (
            <p
              className="mt-6 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-[color:var(--color-silt)]"
            >
              {byline}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-wrap gap-4">
              {primaryCta && (
                <CTAButton href={primaryCta.href} variant="primary">
                  {primaryCta.label}
                </CTAButton>
              )}
              {secondaryCta && (
                <CTAButton href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </CTAButton>
              )}
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
