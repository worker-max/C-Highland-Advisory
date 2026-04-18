type Props = {
  quote: string;
  attribution: string;
};

/*
  Curly quotation marks are rendered in the content string (\u201C and \u201D)
  so typography sees them as real punctuation instead of paired pseudos.
  Hanging indent shifts the opening quote into the margin for a proper
  editorial pull-quote treatment.
*/
export function FounderQuote({ quote, attribution }: Props) {
  return (
    <div>
      <div
        className="founder-quote"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          fontVariationSettings: '"opsz" 72',
          fontSize: "clamp(26px, 3vw, 40px)",
          lineHeight: 1.22,
          letterSpacing: "-0.025em",
          color: "var(--color-paper)",
          textIndent: "-0.45em",
          paddingLeft: "0.45em",
        }}
      >
        {`\u201C${quote}\u201D`}
      </div>
      <div
        className="mt-8 mono-label"
        style={{
          color: "var(--color-accent-soft)",
          letterSpacing: "0.14em",
          fontSize: 11,
        }}
      >
        {attribution}
      </div>
    </div>
  );
}
