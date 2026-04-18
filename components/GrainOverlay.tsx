/*
  Two stacked overlays handle both paper and ink surfaces:
  - multiply pass darkens grain on cream so it feels like paper fiber
  - overlay pass lightens grain on ink so dark sections still show texture
  A single fixed overlay with a --grain-opacity var can't target .dark-section
  scope (the overlay lives outside the section tree), so two blend modes
  let the compositor do the conditional rendering for us.
*/
export function GrainOverlay() {
  const tile =
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{
          opacity: 0.06,
          backgroundImage: tile,
          backgroundSize: "180px 180px",
          mixBlendMode: "multiply",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{
          opacity: 0.07,
          backgroundImage: tile,
          backgroundSize: "180px 180px",
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}
