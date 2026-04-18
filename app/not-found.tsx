import { CTAButton } from "@/components/CTAButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-start justify-center gap-8 px-6 pt-[160px] md:px-12 md:pt-[216px]">
      <div className="mono-label label-dash">Dossier not found</div>
      <h1 className="headline-display max-w-[18ch] text-[clamp(48px,7vw,96px)]">
        This page is not in the <em>ledger.</em>
      </h1>
      <p
        className="max-w-[52ch] text-[18px] leading-[1.6]"
        style={{ color: "var(--color-ink-soft)", fontWeight: 300 }}
      >
        It may have moved, or it may never have existed. The practice is still
        the right next step.
      </p>
      <div className="flex flex-wrap gap-4">
        <CTAButton href="/" variant="ghost">
          Home
        </CTAButton>
        <CTAButton href="/practice" variant="primary">
          View practice →
        </CTAButton>
      </div>
    </section>
  );
}
