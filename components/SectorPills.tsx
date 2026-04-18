type Props = {
  sectors: readonly string[] | string[];
  label?: string;
};

export function SectorPills({ sectors, label = "Sectors served" }: Props) {
  return (
    <div
      className="mt-20 grid grid-cols-1 items-start gap-5 border-t pt-8 md:grid-cols-[220px_1fr] md:gap-12"
      style={{ borderTopColor: "var(--color-rule)" }}
    >
      <div className="mono-label label-dash">{label}</div>
      <div className="flex flex-wrap gap-x-[14px] gap-y-[10px]">
        {sectors.map((sector) => (
          <span
            key={sector}
            className="sector-pill text-[14px] font-body transition-all"
            style={{
              color: "var(--color-ink)",
              border: "1px solid var(--color-rule)",
              borderRadius: 100,
              padding: "8px 16px",
            }}
          >
            {sector}
          </span>
        ))}
      </div>
      <style>{`
        .sector-pill:hover {
          border-color: var(--color-accent) !important;
          color: var(--color-accent) !important;
        }
      `}</style>
    </div>
  );
}
