import type { ReactNode } from "react";
import clsx from "clsx";
import type { ChapterKey } from "@/content/divisions";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";
import { ChapterBand } from "./ChapterBand";
import { ChapterWash } from "./ChapterWash";
import { Reveal } from "./Reveal";

type CtaSpec = { label: string; href: string };

type Props = {
  mode?: "homepage" | "page";
  chapter?: ChapterKey;
  eyebrow?: string;
  headline: ReactNode;
  lead?: ReactNode;
  primaryCta?: CtaSpec;
  secondaryCta?: CtaSpec;
  className?: string;
};

export function Hero({
  mode = "page",
  chapter,
  eyebrow,
  headline,
  lead,
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
        <Reveal delay={0.05}>
          {eyebrow && <div className="eyebrow mb-6">{eyebrow}</div>}
          <h1 className={mode === "homepage" ? "display-xl" : "display-lg"}>
            {headline}
          </h1>
          {lead && <p className="lead mt-8">{lead}</p>}
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
