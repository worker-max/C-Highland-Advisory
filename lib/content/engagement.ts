/*
  The four engagement tiers — content per Colin's review (2026-04-26).

  Tier 1: Embedded Program (the existing 3-step diagnose/design/run)
  Tier 2: Charleston Symposium (in-person working session + city experience)
  Tier 3: Virtual Advisory (fully remote, any scope/length)
  Tier 4: Small Business Co-op (free consultation + AI Tool Co-op + partner network)

  Each tier renders a sub-page under /engagement/[slug] and a card on
  every discipline page's "Engagement" section.
*/

export type Tier = {
  num: string;
  slug: string;
  name: string;
  shortName: string;
  oneLiner: string;
  /** ~1 paragraph on the discipline-page card */
  body: string;
  /** Longer body for the dedicated /engagement/[slug] page */
  longBody: string[];
  /** Meta-strip cells for the dedicated page */
  meta: { lbl: string; val: string }[];
  /** Bullet inclusions for the dedicated page */
  inclusions: string[];
  /** Pricing language */
  pricingNote: string;
};

export const TIERS: Tier[] = [
  {
    num: "T1",
    slug: "program",
    name: "Embedded Program",
    shortName: "Program",
    oneLiner:
      "Diagnose, design, run — embedded operator engagement.",
    body: "Two weeks inside the operation, then a designed program, then a quarter or three of embedded execution. Built to be operated by your team after we leave.",
    longBody: [
      "The Embedded Program is the firm's flagship engagement format. It moves through three deliberate beats — operating diagnostic, program architecture, embedded execution — with the same operator on the chair from start to handover.",
      "It is sized to the engagement, not the deck. Pricing scales with scope and company size, and where the operating problem warrants it, we will run reduced-fee or retainer-only structures. The output is a program that survives the people who built it.",
    ],
    meta: [
      { lbl: "Length", val: "12–36 weeks" },
      { lbl: "Format", val: "Embedded operator" },
      { lbl: "Sponsor", val: "CEO / COO" },
      { lbl: "Posture", val: "Operator-grade" },
    ],
    inclusions: [
      "Two-week operating diagnostic with on-site or near-site presence",
      "Program architecture — roles, cadence, instrumentation, governance",
      "Embedded execution alongside the team that will own it after",
      "SME bench access included at engagement rate",
      "Custom AI tool integration where indicated",
      "HIPAA / SOC 2-ready architecture available where required",
    ],
    pricingNote:
      "Pricing scales to scope and company size. Reduced-fee and retainer-only structures available where the problem warrants. Quote within 24 hours of a brief.",
  },
  {
    num: "T2",
    slug: "symposium",
    name: "Charleston Symposium",
    shortName: "Symposium",
    oneLiner:
      "Two- or five-day in-person working symposium — innovation + culture reset.",
    body: "Solo operator or full leadership team. Hosted in Charleston, SC, or we travel to you. Charleston package includes a custom AI concierge, a curated city VIP experience, and a half-day on the company boat.",
    longBody: [
      "The Charleston Symposium is a two- or five-day in-person working session designed as a deliberate point-in-time reset for the operating team. It works for the solo operator or the full leadership team, and the format is the same: structured working blocks paired with a reset rhythm built around the city itself.",
      "Hosted at our Charleston, SC base, the package includes a custom Charleston-based AI concierge that travels with the team for the duration of the stay, a curated VIP city experience built to your group, and one non-working half-day on the company boat — the rhythm-shift that separates a working trip from a reset. Weekend extensions are available.",
      "Or we travel to you. The on-site-with-client format is less expensive, faster to schedule, and runs the same operating cadence — without the boat.",
    ],
    meta: [
      { lbl: "Format", val: "In-person · 2 or 5 day" },
      { lbl: "Audience", val: "Solo operator or full leadership team" },
      { lbl: "Hosted", val: "Charleston, SC · or we come to you" },
      { lbl: "Posture", val: "Working session + reset rhythm" },
    ],
    inclusions: [
      "Two- or five-day structured working agenda, designed pre-trip",
      "Charleston package: custom AI concierge agent for the duration of the stay",
      "Charleston package: curated VIP city experience, sized to the group",
      "Charleston package: one non-working half-day on the company boat",
      "Optional weekend extension",
      "All deliverables documented + handed back at session close",
    ],
    pricingNote:
      "Charleston package and at-client packages priced separately. The Charleston package is the lower of the two when accounting for travel. Quote within 24 hours of a brief.",
  },
  {
    num: "T3",
    slug: "virtual",
    name: "Virtual Advisory",
    shortName: "Virtual",
    oneLiner:
      "Fully remote advisory — any scope, any length.",
    body: "Cadence and scope flexible to client need. Standing weekly retainer or as-needed engagements both supported. Same SME bench access; same AI integration capability where indicated.",
    longBody: [
      "Virtual Advisory is the lightest-touch engagement format the firm offers — fully remote, sized to the cadence and scope a client actually needs. It is the right format for organizations whose operating problem doesn't require an embedded operator but does require an on-call thinking partner.",
      "Standing-retainer and as-needed structures are both supported. The same SME bench is accessible at the same engagement rate, and custom AI tool integration is available on the same delivery cadence.",
    ],
    meta: [
      { lbl: "Format", val: "Fully remote" },
      { lbl: "Cadence", val: "Retainer or as-needed" },
      { lbl: "Length", val: "Any" },
      { lbl: "Posture", val: "Thinking partner on call" },
    ],
    inclusions: [
      "Standing weekly or as-needed advisory cadence",
      "SME bench access at engagement rate",
      "AI tool integration where indicated",
      "Async written counsel between sessions",
    ],
    pricingNote:
      "Hourly, retainer, or scoped-engagement structures supported. Quote within 24 hours of a brief.",
  },
  {
    num: "T4",
    slug: "co-op",
    name: "Small Business Co-op",
    shortName: "Co-op",
    oneLiner:
      "Free consultation + AI Tool Co-op + innovation-partner network.",
    body: "For small businesses. Free or discounted access to shared tools, branding/marketing/sales/PR/automation partners, and a retainer-based innovation relationship sized to the business.",
    longBody: [
      "The Small Business Co-op is a deliberate departure from the firm's other tiers. It exists because small businesses need the same operator-grade thinking as enterprises, and the conventional advisory pricing models don't fit. We've built one that does.",
      "Membership in the Co-op includes a free initial consultation, optional access to the AI Tool Co-op (a growing library of pre-fabricated and semi-custom tools shared at minimal cost), and a retainer-based innovation relationship priced to the business size and scope. Members also receive free access to our innovation-partner network — specialists in branding, marketing, sales, public relations, automation, and adjacent disciplines who work alongside us at member-friendly rates.",
    ],
    meta: [
      { lbl: "Format", val: "Co-op membership" },
      { lbl: "Initial", val: "Free consultation" },
      { lbl: "Tools", val: "AI Tool Co-op access" },
      { lbl: "Network", val: "Innovation partners included" },
    ],
    inclusions: [
      "Free initial consultation",
      "Optional AI Tool Co-op access — pre-fab and semi-custom tools at minimal cost",
      "Retainer-based innovation relationship, priced to business size",
      "Discounted advisory hours and tool development",
      "Free access to innovation partners (branding, marketing, sales, PR, automation, etc.)",
    ],
    pricingNote:
      "Co-op membership and retainer rates are sized to the business. Free or discounted structures are the default. Quote within 24 hours of an introductory conversation.",
  },
];

export function getTierBySlug(slug: string) {
  return TIERS.find((t) => t.slug === slug);
}
