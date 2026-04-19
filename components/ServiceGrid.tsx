import { Reveal } from "./Reveal";

type Props = {
  services: readonly string[] | string[];
};

export function ServiceGrid({ services }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {services.map((service, i) => (
        <Reveal key={service} delay={i * 0.04}>
          <div className="card p-5 md:p-6">
            <div className="mono-numeral mb-3">
              {String(i + 1).padStart(2, "0")}
            </div>
            <p className="text-[17px] font-medium leading-snug text-[color:var(--color-ink)]">
              {service}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
