import { DIVISIONS } from "@/content/divisions";
import { DivisionRow } from "./DivisionRow";
import { Reveal } from "./Reveal";

export function DivisionsLedger() {
  return (
    <div className="border-t" style={{ borderTopColor: "var(--color-ink)" }}>
      {DIVISIONS.map((division, index) => (
        <Reveal key={division.slug} delay={index * 0.06}>
          <DivisionRow division={division} totalCount={DIVISIONS.length} />
        </Reveal>
      ))}
    </div>
  );
}
