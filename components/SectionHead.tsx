import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  label: string;
  title: ReactNode;
  desc?: ReactNode;
  inverted?: boolean;
  className?: string;
};

export function SectionHead({ label, title, desc, inverted = false, className }: Props) {
  return (
    <div
      className={clsx(
        "grid items-end gap-8 md:grid-cols-[1fr_2fr] md:gap-20",
        desc ? "mb-16 md:mb-20" : "mb-12 md:mb-16",
        className,
      )}
    >
      <div>
        <div
          className={clsx("mono-label label-dash", inverted && "label-dash-inverted")}
          style={{
            color: inverted ? "rgba(245,242,237,0.6)" : undefined,
          }}
        >
          {label}
        </div>
        <h2
          className="section-title mt-[18px] text-[clamp(36px,5vw,64px)]"
          style={{ color: inverted ? "var(--color-paper)" : "var(--color-ink)" }}
        >
          {title}
        </h2>
      </div>
      {desc && (
        <p
          className="max-w-[56ch] text-[17px] leading-[1.65]"
          style={{ color: inverted ? "var(--color-paper)" : "var(--color-ink-soft)" }}
        >
          {desc}
        </p>
      )}
      {inverted && (
        <style>{`.label-dash-inverted::before { color: var(--color-accent-soft); }`}</style>
      )}
    </div>
  );
}
