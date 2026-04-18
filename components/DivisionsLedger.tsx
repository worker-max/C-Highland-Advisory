import { DIVISIONS } from "@/content/divisions";
import { DivisionRow } from "./DivisionRow";

export function DivisionsLedger() {
  return (
    <div className="border-t" style={{ borderTopColor: "var(--color-ink)" }}>
      {DIVISIONS.map((division) => (
        <DivisionRow
          key={division.slug}
          division={division}
          totalCount={DIVISIONS.length}
        />
      ))}
    </div>
  );
}
