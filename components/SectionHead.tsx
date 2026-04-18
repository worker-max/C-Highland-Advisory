import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  label: string;
  title: ReactNode;
  desc?: ReactNode;
  inverted?: boolean;
  className?: string;
};

/*
  items-start keeps the Swiss baseline — label/title left column anchors to
  the top of the description column rather than dragging down to its bottom.
*/
export function SectionHead({ label, title, desc, inverted = false, className }: Props) {
  return (
    <div
      className={clsx(
        "grid items-start gap-8 md:grid-cols-[1fr_2fr] md:gap-20",
        desc ? "mb-10 md:mb-14" : "mb-10 md:mb-12",
        className,
      )}
    >
      <div>
        <div
          className={clsx("mono-label label-dash")}
          style={{
            color: inverted ? "var(--color-accent-soft)" : undefined,
          }}
        >
          {label}
        </div>
        <h2
          className="section-title mt-4 text-[clamp(36px,5vw,64px)]"
          style={{ color: inverted ? "var(--color-paper)" : "var(--color-ink)" }}
        >
          {title}
        </h2>
      </div>
      {desc && (
        <p
          className="max-w-[56ch] text-[17px] leading-[1.65]"
          style={{
            color: inverted ? "var(--color-accent-soft)" : "var(--color-ink-soft)",
            fontWeight: 300,
          }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
