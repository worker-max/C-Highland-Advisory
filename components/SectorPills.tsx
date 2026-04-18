type Props = {
  sectors: readonly string[] | string[];
  label?: string;
};

export function SectorPills({ sectors, label = "Sectors served" }: Props) {
  return (
    <div
      className="mt-20 grid grid-cols-1 items-start gap-5 border-t pt-8 md:grid-cols-[180px_1fr] md:gap-12"
      style={{ borderTopColor: "var(--color-rule)" }}
    >
      <div className="mono-label label-dash">{label}</div>
      <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
        {sectors.map((sector) => (
          <span key={sector} className="sector-pill">
            {sector}
          </span>
        ))}
      </div>
    </div>
  );
}
