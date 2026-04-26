/*
  Seven divisions — content per DESIGN_HANDOFF.md.

  Each division carries:
   - num/slug/name/color (chapter color, used only inside its detail page
     and as a small homepage stripe)
   - lede (homepage/division-card body)
   - blurb (division-page section h2)
   - programs[] (named programs that live inside this division)
   - icon (key for DivisionIcon component)
   - metrics[] (4 cells in the division-page meta strip)
*/

export type IconKind =
  | "circuit"
  | "vital"
  | "branch"
  | "pipeline"
  | "knit"
  | "wave"
  | "merge";

export type Division = {
  num: string;
  slug: string;
  name: string;
  color: string;
  lede: string;
  blurb: string;
  programs: string[];
  icon: IconKind;
  metrics: { lbl: string; val: string }[];
  /** Long-form copy for the division detail page (1-2 paragraphs) */
  longCopy: string[];
  /** Subject-matter experts on the bench for this discipline. Included
   *  in engagement rates; available independently at $100-$250/hr. */
  bench: string[];
};

export const DIVISIONS: Division[] = [
  {
    num: "01",
    slug: "strategy-advisory",
    name: "Strategy & Advisory",
    color: "#2a2a2c",
    lede: "Operating diagnostics, organizational design, and program governance for executives carrying real P&L weight.",
    blurb:
      "Where ops, finance and people decisions intersect — translated into programs that hold under pressure.",
    programs: [
      "Enterprise-Wide Education Program",
      "Operating Cadence Review",
      "Org & Span-of-Control Redesign",
    ],
    icon: "circuit",
    metrics: [
      { lbl: "Engagement length", val: "12–36 weeks" },
      { lbl: "Typical sponsor", val: "CEO / COO" },
      { lbl: "Industries", val: "Cross-sector" },
      { lbl: "Format", val: "Embedded operator" },
    ],
    longCopy: [
      "The Strategy & Advisory division is the cross-cutting layer of the firm. It picks up engagements that don't sit cleanly inside a single function — operating diagnostics that span ops, finance, and people decisions, organizational redesigns that need a hand on the cadence, and the program-governance work that decides whether a strategy survives its first quarter of contact.",
      "The work is operator-grade by construction. The Enterprise-Wide Education Program lives here — a curriculum and operating cadence designed to move the body of knowledge in a workforce, not a deck assembled and then forgotten.",
    ],
    bench: [
      "Operating-model architects",
      "Finance & FP&A partners",
      "Board-level facilitators",
      "Program governance leads",
    ],
  },
  {
    num: "02",
    slug: "healthcare-strategy",
    name: "Healthcare Strategy",
    color: "#0e6b5d",
    lede: "Operations and workforce strategy translated to healthcare priorities — for systems, clinics, and provider groups.",
    blurb:
      "Not academic healthcare strategy. The version that comes from running the workforce inside one.",
    programs: [
      "Service-line Operating Review",
      "Provider Capacity & Access Modeling",
      "Care-team Workforce Architecture",
    ],
    icon: "vital",
    metrics: [
      { lbl: "Settings", val: "Acute · Ambulatory · Home Health" },
      { lbl: "Sponsor", val: "CMO / VP Operations" },
      { lbl: "Stack", val: "Epic · Cerner adjacent" },
      { lbl: "Posture", val: "Honest, not boastful" },
    ],
    longCopy: [
      "Healthcare Strategy at C Highland Advisory is operations and workforce strategy translated to healthcare priorities. It is not an academic healthcare strategy practice; it is the version of healthcare strategy that comes from running workforce programs inside large, complex provider environments — and from understanding how the pieces actually move.",
      "The work spans service-line operating reviews, provider capacity and access modeling, and care-team workforce architecture. The posture is honest: where the operator track was the strongest, the strategy work draws directly from that. Where it wasn't, we say so.",
    ],
    bench: [
      "Clinical informatics specialists",
      "Revenue-cycle operators",
      "Payer-relations leads",
      "Quality & regulatory partners",
      "Care-team workforce architects",
    ],
  },
  {
    num: "03",
    slug: "home-health-operations",
    name: "Home Health Operations",
    color: "#b6482d",
    lede: "Visit-level operations, branch performance, and clinician productivity — built from inside the model, not from a deck.",
    blurb:
      "Branch ops, clinician productivity, payor mix, and the operational realities that don't show up in slides.",
    programs: [
      "Branch Performance Architecture",
      "Clinician Productivity Program",
      "Onboarding-to-Productive Time",
    ],
    icon: "branch",
    metrics: [
      { lbl: "Operator scope", val: "Branch · Region · Enterprise" },
      { lbl: "Levers", val: "Visits · Mix · Margin" },
      { lbl: "Time-to-impact", val: "1–2 quarters" },
      { lbl: "Sponsor", val: "VP Operations" },
    ],
    longCopy: [
      "Home Health Operations is the operator chair, codified. Branch performance architecture, clinician productivity programs, onboarding-to-productive time — the unglamorous, load-bearing operations work inside a model that punishes anyone who tries to fake their way through it.",
      "Engagements are usually quarter-paced and start at the branch level. The output is a performance architecture the regional and enterprise teams can run from, not a slide pack.",
    ],
    bench: [
      "OASIS coding specialists",
      "Branch operations leads",
      "Clinical leadership coaches",
      "Hospice & post-acute partners",
    ],
  },
  {
    num: "04",
    slug: "talent-acquisition",
    name: "Talent Acquisition & Workforce Strategy",
    color: "#b8862e",
    lede: "Hiring engines, contingent labor programs, and workforce architecture — for orgs whose growth is bottlenecked by people supply.",
    blurb:
      "Pipeline capacity, contingent strategy, and the unglamorous infrastructure that lets recruiters do their job.",
    programs: [
      "Contingent Labor Workforce Program",
      "Talent Acquisition Strategies",
      "Recruiter Capacity Model",
    ],
    icon: "pipeline",
    metrics: [
      { lbl: "Hire types", val: "Clinical · Skilled · Volume" },
      { lbl: "Modes", val: "RPO · MSP · Internal" },
      { lbl: "Sponsor", val: "CHRO / VP TA" },
      { lbl: "Output", val: "Programs, not slides" },
    ],
    longCopy: [
      "Talent Acquisition & Workforce Strategy is the people-supply infrastructure division. Two of the firm's named programs live here: the Contingent Labor Workforce Program and Talent Acquisition Strategies — the operating chassis behind a hiring engine that needs to scale faster than its workforce supply allows.",
      "The work covers recruiter-capacity modeling, contingent labor program design (RPO, MSP, and internal hybrids), and the workforce architecture that decides whether the operating model is hireable in the first place.",
    ],
    bench: [
      "RPO + MSP specialists",
      "Compensation strategists",
      "Workforce analytics partners",
      "Sourcing & employer-brand leads",
    ],
  },
  {
    num: "05",
    slug: "operational-hr",
    name: "Operational HR & Associate Engagement",
    color: "#6d2e4e",
    lede: "Retention, engagement, and the operational HR work that keeps the workforce intact between strategy decks.",
    blurb:
      "The day-to-day of keeping people; the systems and rituals that decide whether retention numbers move.",
    programs: [
      "Retention Strategy",
      "Associate Engagement Programs",
      "Operational HR Architecture",
    ],
    icon: "knit",
    metrics: [
      { lbl: "Focus", val: "Frontline retention" },
      { lbl: "Cadence", val: "Quarterly programs" },
      { lbl: "Sponsor", val: "CHRO / VP HR" },
      { lbl: "Form", val: "Operational, not survey-led" },
    ],
    longCopy: [
      "Operational HR & Associate Engagement is the day-to-day division — the operating layer of HR that decides whether retention numbers actually move between strategy decks. Two named programs live here: Retention Strategy and Associate Engagement Programs.",
      "We are skeptical of survey-led engagement work. The programs we design are operational by default — rituals, cadences, and management-system changes that the frontline can feel without being told they exist.",
    ],
    bench: [
      "Frontline manager-development partners",
      "Total rewards strategists",
      "Engagement & retention researchers",
      "Performance-management architects",
    ],
  },
  {
    num: "06",
    slug: "ai-practice",
    name: "AI Practice — Tools, Agents & Automation",
    color: "#1fa79c",
    lede: "Custom AI tools, chatbots, voice agents, workflow automation, and website-infused AI surfaces — applied inside real operating environments, audit-first by design.",
    blurb:
      "Applied AI inside live operating environments — the right shape for the use case (custom tool, chatbot, voice, automation, or web-embedded), observable at every layer.",
    programs: [
      "Custom AI Tool Development",
      "Conversational Interfaces (Chatbots + Voice)",
      "Workflow Automation Architecture",
      "Website-Infused AI Integration",
      "Operator-grade Eval Harness",
    ],
    icon: "wave",
    metrics: [
      { lbl: "Surfaces", val: "Tools · Agents · Automation · Web" },
      { lbl: "Stack", val: "Provider-agnostic" },
      { lbl: "Posture", val: "Audit-first" },
      { lbl: "Sponsor", val: "COO / CTO" },
    ],
    longCopy: [
      "The AI Practice is C Highland Advisory's applied-AI division — custom tools, chatbots, voice agents, workflow automation, and website-infused AI surfaces. Voice is a specialty here, but it's one shape among many; the work starts from the operating environment and chooses the AI form that fits the use case, not the other way around.",
      "The defining posture is audit-first. Whether the surface is a custom tool, a chatbot, a voice agent, a workflow automation, or an AI-infused website, every deliverable ships with eval harnesses, observable handoffs, and human checkpoints by default — because applied AI inside healthcare and workforce surfaces does not get to be unobservable.",
    ],
    bench: [
      "Custom AI tool engineers",
      "Conversational AI architects (chatbot + voice)",
      "LLM evaluation engineers",
      "AI policy & governance partners",
      "Integration specialists (EHR, CRM, scheduling)",
      "Mobile + web product engineers",
    ],
  },
  {
    num: "07",
    slug: "human-ai-workforce",
    name: "Human + AI Workforce Programs",
    color: "#4a5278",
    lede: "Workforce programs designed around human + AI integration — staffing models, roles, governance, and change posture.",
    blurb:
      "The workforce question AI created and won't answer by itself: who does what, with what oversight, on what timeline.",
    programs: [
      "Integrated Roles & RACI",
      "Change-management Architecture",
      "AI Workforce Governance",
    ],
    icon: "merge",
    metrics: [
      { lbl: "Output", val: "Roles · Cadence · Governance" },
      { lbl: "Sponsor", val: "CEO / COO / CHRO" },
      { lbl: "Horizon", val: "12–24 months" },
      { lbl: "Form", val: "Programmatic, not advisory" },
    ],
    longCopy: [
      "Human + AI Workforce Programs is the workforce-integration division — the discipline that designs around the question that applied AI created and won't answer by itself: who does what, with what oversight, on what timeline.",
      "Engagements are programmatic, not advisory. The output is a working set of integrated roles, a RACI that holds, a governance cadence that runs, and a change-management architecture sized to your actual workforce — not a generic AI-readiness deck.",
    ],
    bench: [
      "Change-management specialists",
      "RACI & role architects",
      "Adoption program leads",
      "AI workforce-governance partners",
    ],
  },
];

/** Per-program copy used on division detail pages. Keyed by program name substring. */
export const PROGRAM_COPY: { match: string; body: string }[] = [
  {
    match: "Education",
    body: "A curriculum and operating cadence that moves the body of knowledge in a workforce — designed to be operated, not assembled and forgotten.",
  },
  {
    match: "Contingent",
    body: "The operating chassis behind a contingent labor program — supplier governance, mix economics, and the cadence that decides whether the program is performant.",
  },
  {
    match: "Talent Acquisition Strategies",
    body: "Recruiter-capacity modeling and pipeline architecture — the unglamorous infrastructure that lets a hiring engine actually scale.",
  },
  {
    match: "Retention",
    body: "Operational retention work — rituals and management-system changes the frontline can feel, without being told they exist.",
  },
  {
    match: "Associate Engagement",
    body: "Engagement programs designed operationally, not survey-led. Cadences, recognitions, and listening loops that integrate with how the work actually runs.",
  },
  {
    match: "Operating Cadence",
    body: "A read on how the operating cadence actually runs — escalation paths, decision points, and the load-bearing meetings nobody admits to.",
  },
  {
    match: "Org",
    body: "Span-of-control, layering, and reporting redesign — sized to the operating model, not to an org-chart aesthetic.",
  },
  {
    match: "Service-line",
    body: "A service-line operating review focused on the levers that actually move volume, margin, and access — across acute and ambulatory surfaces.",
  },
  {
    match: "Provider Capacity",
    body: "Provider capacity and access modeling — the kind that holds when the schedule template hits real-world demand.",
  },
  {
    match: "Care-team",
    body: "Care-team workforce architecture — roles, ratios, and the operating cadence that lets a clinical model run at scale.",
  },
  {
    match: "Branch Performance",
    body: "Branch-level performance architecture — the operating system inside a national home-health platform.",
  },
  {
    match: "Clinician Productivity",
    body: "Clinician productivity programs — designed operationally, with the clinicians, not at them.",
  },
  {
    match: "Onboarding",
    body: "Onboarding-to-productive time — the metric that decides whether your home-health hiring engine is paying for itself.",
  },
  {
    match: "Recruiter Capacity",
    body: "A recruiter-capacity model that ties pipeline math to the operating model it's hiring for.",
  },
  {
    match: "Operational HR Architecture",
    body: "The operating system of HR — cadence, escalation, and the management-system layer beneath it.",
  },
  {
    match: "Custom AI Tool",
    body: "Custom AI tools sized to the operating model — pre-fab, semi-custom, or fully bespoke. Eval harnesses + audit logs included; the tool is yours, not ours.",
  },
  {
    match: "Conversational",
    body: "Chatbots and voice agents designed for the use case, not the demo. Conversational design + eval + escalation + human-in-the-loop architecture so the surface lives in production.",
  },
  {
    match: "Workflow Automation",
    body: "Workflow automation architecture — observable, auditable, and designed to live inside an existing operating environment.",
  },
  {
    match: "Website-Infused",
    body: "AI surfaces embedded directly into web product — search, summarization, retrieval, in-flow agents. Designed to feel native to the site, not bolted on.",
  },
  {
    match: "Voice Agent",
    body: "Voice agent operating model — eval harness, escalation, and the human-in-the-loop architecture that lets voice live in production.",
  },
  {
    match: "Eval Harness",
    body: "An operator-grade eval harness — because applied AI inside healthcare and workforce surfaces does not get to be unobservable.",
  },
  {
    match: "Integrated Roles",
    body: "Integrated human + AI roles and the RACI to hold them — designed around the actual workforce, not the AI.",
  },
  {
    match: "Change-management",
    body: "Change-management architecture sized to your real workforce — phased, observable, and reversible.",
  },
  {
    match: "Governance",
    body: "AI workforce governance — the operating layer that decides what AI is allowed to do, when, and with whose sign-off.",
  },
];

export function programCopy(name: string): string {
  for (const entry of PROGRAM_COPY) {
    if (name.includes(entry.match)) return entry.body;
  }
  return "";
}

export function getDivisionBySlug(slug: string) {
  return DIVISIONS.find((d) => d.slug === slug);
}

export function getNextDivision(slug: string) {
  const idx = DIVISIONS.findIndex((d) => d.slug === slug);
  if (idx === -1) return DIVISIONS[0];
  return DIVISIONS[(idx + 1) % DIVISIONS.length];
}
