/*
  Fixed SVG noise tile at 180px repeats to feel like grain, not a smooth wash.
  Opacity is var-driven so dark sections can brighten the pass via .dark-section scope.
*/
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{
        opacity: "var(--grain-opacity, 0.06)",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "180px 180px",
        mixBlendMode: "multiply",
      }}
    />
  );
}
