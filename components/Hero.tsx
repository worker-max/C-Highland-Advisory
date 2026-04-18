import type { ReactNode } from "react";

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
};

import { CTAButton } from "./CTAButton";

export function Hero({ meta, headline, lead, primaryCta, secondaryCta }: Props) {
  return (
    <section className="relative grid min-h-screen grid-cols-1 gap-[60px] px-6 pb-[100px] pt-[140px] md:px-12 md:pb-[100px] md:pt-[180px]">
      {meta && meta.length > 0 && (
        <div
          className="grid grid-cols-1 gap-5 border-b pb-6 md:grid-cols-3 md:gap-12"
          style={{ borderBottomColor: "var(--color-rule)" }}
        >
          {meta.map((m) => (
            <div
              key={m.label}
              className="font-mono text-[11px] uppercase"
              style={{ color: "var(--color-ink-mute)", letterSpacing: "0.12em" }}
            >
              {m.label} —
              <span
                className="mt-1.5 block font-body text-[14px] normal-case"
                style={{ color: "var(--color-ink)", letterSpacing: 0, fontWeight: 400 }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}

      <h1 className="headline-display max-w-[16ch] text-[clamp(56px,9vw,132px)]">
        {headline}
      </h1>

      {(lead || primaryCta || secondaryCta) && (
        <div className="mt-10 grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-20">
          {lead ? (
            <p
              className="max-w-[50ch] text-[18px] leading-[1.6]"
              style={{ color: "var(--color-ink-soft)", fontWeight: 400 }}
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
      )}
    </section>
  );
}
