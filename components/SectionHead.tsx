import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "start",
  className,
}: Props) {
  return (
    <div className={clsx("mb-12 md:mb-16", align === "center" && "text-center", className)}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="display-md">{title}</h2>
      {lead && (
        <p className={clsx("lead mt-6", align === "center" && "mx-auto")}>
          {lead}
        </p>
      )}
    </div>
  );
}
