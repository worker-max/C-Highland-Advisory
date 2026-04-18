type Props = {
  quote: string;
  attribution: string;
};

export function FounderQuote({ quote, attribution }: Props) {
  return (
    <div>
      <div
        className="founder-quote font-display italic"
        style={{
          fontWeight: 300,
          fontSize: "clamp(28px, 3.2vw, 44px)",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "var(--color-paper)",
        }}
      >
        {quote}
      </div>
      <div
        className="mt-8 font-mono text-[12px] uppercase"
        style={{
          color: "var(--color-paper)",
          opacity: 0.7,
          letterSpacing: "0.12em",
        }}
      >
        {attribution}
      </div>
      <style>{`
        .founder-quote::before {
          content: '"';
          color: var(--color-accent-soft);
          font-size: 1.2em;
          line-height: 0;
          position: relative;
          top: 0.15em;
          margin-right: 0.05em;
        }
        .founder-quote::after {
          content: '"';
          color: var(--color-accent-soft);
        }
      `}</style>
    </div>
  );
}
