import type { ReactNode } from "react";
import clsx from "clsx";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";

export type MetaItem = {
  label: string;
  value: string;
};

type CtaSpec = {
  label: string;
  href: string;
};

type Props = {
  meta?: MetaItem[];
  headline: ReactNode;
  lead?: ReactNode;
  primaryCta?: CtaSpec;
  secondaryCta?: CtaSpec;
  maxCh?: number;
};

/*
  Masthead + nav stack ≈ 112px on desktop. pt-[216px] leaves ~104px between
  the nav's bottom rule and the meta bar — enough that the two hairlines
  don't visually collide.
*/
export function Hero({
  meta,
  headline,
  lead,
  primaryCta,
  secondaryCta,
  maxCh = 20,
}: Props) {
  return (
    <section className="relative grid min-h-screen grid-cols-1 gap-[60px] px-6 pb-[100px] pt-[160px] md:px-12 md:pt-[216px]">
      {meta && meta.length > 0 && (
        <Reveal delay={0.05}>
          <div
            className="grid grid-cols-1 gap-5 border-b pb-6 md:grid-cols-3 md:gap-12"
            style={{ borderBottomColor: "var(--color-rule)" }}
          >
            {meta.map((m) => (
              <div key={m.label} className="mono-label label-dash">
                <span>{m.label}</span>
                <span
                  className="mt-1.5 block normal-case"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    letterSpacing: 0,
                    color: "var(--color-ink)",
                    fontWeight: 400,
                  }}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal delay={meta ? 0.15 : 0.05}>
        <h1
          className={clsx("headline-display text-[clamp(56px,9vw,128px)]")}
          style={{ maxWidth: `${maxCh}ch` }}
        >
          {headline}
        </h1>
      </Reveal>

      {(lead || primaryCta || secondaryCta) && (
        <Reveal delay={0.25}>
          <div className="mt-6 grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-20">
            {lead ? (
              <p
                className="max-w-[50ch] text-[18px] leading-[1.6]"
                style={{ color: "var(--color-ink-soft)", fontWeight: 300 }}
              >
                {lead}
              </p>
            ) : (
              <div />
            )}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap gap-4 md:justify-end">
                {secondaryCta && (
                  <CTAButton href={secondaryCta.href} variant="ghost">
                    {secondaryCta.label}
                  </CTAButton>
                )}
                {primaryCta && (
                  <CTAButton href={primaryCta.href} variant="primary">
                    {primaryCta.label}
                  </CTAButton>
                )}
              </div>
            )}
          </div>
        </Reveal>
      )}
    </section>
  );
}
