/*
  Homepage hero background: horizontal gradient across all 6 chapter hues.
  Opacity + softer blur tuned so the six hues read as a signature, not a
  washed-out rendering artifact.
*/
export function ChapterBand() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "linear-gradient(90deg, var(--color-ch-strategy) 0%, var(--color-ch-healthcare) 18%, var(--color-ch-homehealth) 36%, var(--color-ch-talent) 54%, var(--color-ch-hr) 72%, var(--color-ch-ai) 90%)",
        opacity: 0.3,
        filter: "blur(24px)",
      }}
    />
  );
}
