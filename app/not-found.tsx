import { Container } from "@/components/Container";
import { CTAButton } from "@/components/CTAButton";

export default function NotFound() {
  return (
    <section className="pt-[180px] pb-[100px] md:pt-[220px] md:pb-[140px]">
      <Container>
        <div className="eyebrow mb-6">Not found</div>
        <h1 className="display-lg max-w-[18ch]">
          This page is not in the ledger.        </h1>
        <p className="lead mt-8">
          It may have moved, or it may never have existed. The practice is still
          the right next step.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <CTAButton href="/" variant="secondary">
            Home
          </CTAButton>
          <CTAButton href="/practice" variant="primary">
            View practice
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
