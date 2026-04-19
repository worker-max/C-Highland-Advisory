import { Reveal } from "./Reveal";

type Step = { n: string; label: string; dek: string };

type Props = {
  steps: Step[];
};

export function StepFlow({ steps }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      {steps.map((step, i) => (
        <Reveal key={step.n} delay={i * 0.1}>
          <div className="card p-6 md:p-8">
            <div className="mono-numeral mb-4">{step.n}</div>
            <div className="display-sm mb-3">{step.label}</div>
            <p className="prose-base text-[color:var(--color-silt)]">{step.dek}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
