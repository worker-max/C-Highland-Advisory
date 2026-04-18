import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-start justify-center gap-8 px-6 pt-[140px] md:px-12 md:pt-[180px]">
      <div className="mono-label label-dash">404 · Off the map</div>
      <h1 className="headline-display max-w-[16ch] text-[clamp(48px,7vw,96px)]">
        This page isn&apos;t where we thought it was.
      </h1>
      <p
        className="max-w-[50ch] text-[18px] leading-[1.6]"
        style={{ color: "var(--color-ink-soft)" }}
      >
        It may have moved, or it may have never existed. Either way, the
        practice is two clicks away.
      </p>
      <div className="flex flex-wrap gap-4">
        <CTAButton href="/" variant="ghost">
          Back to home
        </CTAButton>
        <CTAButton href="/practice" variant="primary">
          View practice →
        </CTAButton>
      </div>
    </section>
  );
}
