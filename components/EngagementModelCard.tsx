import clsx from "clsx";
import type { EngagementModel } from "@/content/divisions";

type Props = {
  model: EngagementModel | string;
  description: string;
  active?: boolean;
};

export function EngagementModelCard({ model, description, active = true }: Props) {
  return (
    <div
      className={clsx(
        "p-6 md:p-7 rounded-[14px]",
        active && "card",
        !active && "opacity-40 border border-dashed border-[color:var(--color-mist)]",
      )}
    >
      <div className="eyebrow mb-3">{active ? "Model" : "Not offered here"}</div>
      <div className="display-sm mb-3">{model}</div>
      <p className="prose-base text-[color:var(--color-silt)]">{description}</p>
    </div>
  );
}
