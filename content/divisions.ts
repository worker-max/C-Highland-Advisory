export type EngagementModel = "Retainer" | "Project" | "Embedded" | "Build" | "Advisory";

export type ChapterKey =
  | "strategy"
  | "healthcare"
  | "homehealth"
  | "talent"
  | "hr"
  | "ai"
  | "humanai";

export type Division = {
  number: string;
  slug: string;
  name: string;
  shortName?: string;
  chapter: ChapterKey;
  positioning: string;
  shortDescription: string;
  services: string[];
  sectors: string[];
  engagementModels: EngagementModel[];
  thesis: string;
};

export const DIVISIONS: Division[] = [
  {
    number: "01",
    slug: "strategy-advisory",
    name: "Strategy & Advisory",
    chapter: "strategy",
    positioning:
      "Cross-sector strategic counsel for leaders making consequential decisions.",
    shortDescription:
      "Cross-sector strategic counsel for executives, founders, and public officials navigating growth, market entry, organizational redesign, or technology adoption. The connective tissue across every other division.",
    services: [
      "Strategic planning and market-entry advisory",
      "Organizational redesign and operating-model work",
      "Enterprise-Wide Education Program — design, rollout, manager enablement",
      "Technology adoption strategy (including but not limited to AI)",
      "Executive decision support and thought partnership",
      "Growth strategy and service-line evaluation",
      "Board and leadership-team advisory",
    ],
    sectors: [
      "Healthcare systems",
      "Medical & dental clinics",
      "Home health & hospice",
      "Government agencies",
      "Municipalities",
      "National home-service brands",
      "Hospitality groups",
      "Youth sports organizations",
      "Political operations",
    ],
    engagementModels: ["Retainer", "Project"],
    thesis:
      "Most strategy engagements fail because the strategist has never had to operate the thing they're advising on. We bring clinical discipline, operator-grade pragmatism, and a builder's instinct for what's actually shippable — so the strategy survives contact with reality.",
  },
  {
    number: "02",
    slug: "healthcare-strategy",
    name: "Healthcare Strategy",
    chapter: "healthcare",
    positioning:
      "Strategy built by someone who has actually been on the floor.",
    shortDescription:
      "Market positioning, service line evaluation, and growth strategy for provider organizations navigating reimbursement pressure, regulatory shift, and competitive consolidation.",
    services: [
      "Market positioning and competitive analysis",
      "Service line evaluation and portfolio strategy",
      "Reimbursement and regulatory navigation",
      "Growth strategy (organic and inorganic)",
      "Partnership and affiliation advisory",
      "Post-acute care strategy",
    ],
    sectors: [
      "Healthcare systems",
      "Medical & dental clinics",
      "Home health & hospice",
    ],
    engagementModels: ["Retainer", "Project"],
    thesis:
      "Healthcare strategy too often happens in rooms where no one has recently touched a patient. We combine the clinician's view of what's actually happening at the point of care with the operator's view of what's financially and operationally feasible — so the strategy works on both sides of the equation.",
  },
  {
    number: "03",
    slug: "home-health-operations",
    name: "Home Health Operations",
    chapter: "homehealth",
    positioning:
      "The unglamorous work that moves OASIS scores and margin in the same quarter.",
    shortDescription:
      "Operational diagnostics for home health and hospice agencies — census optimization, intake conversion, clinician utilization, and the unglamorous workflow audits that move OASIS scores and margin in the same quarter.",
    services: [
      "Census optimization and referral pipeline diagnostics",
      "Intake conversion analysis and redesign",
      "Clinician utilization and productivity audits",
      "Workflow mapping and operational redesign",
      "OASIS quality and outcomes improvement",
      "Revenue cycle and documentation integrity",
    ],
    sectors: ["Home health & hospice"],
    engagementModels: ["Embedded", "Project"],
    thesis:
      "Home health margins live in the operational details — intake speed, clinician routing, documentation completeness, utilization discipline. We do the embedded diagnostic work most consulting firms won't: ride-alongs, chart audits, intake call reviews. The answers are rarely where leadership thinks they are.",
  },
  {
    number: "04",
    slug: "talent-acquisition",
    name: "Talent Acquisition & Workforce Strategy",
    shortName: "Talent Acquisition",
    chapter: "talent",
    positioning: "Hiring architecture that survives the first six months.",
    shortDescription:
      "Hiring architecture for clinical, operational, and field-service roles. Pipeline design, sourcing systems, structured interviewing, and the workforce planning frameworks that survive the first six months post-engagement.",
    services: [
      "Talent Acquisition Strategies — pipeline design, sourcing systems, structured interviewing",
      "Contingent Labor Workforce Program — flex-roster architecture, vendor management, utilization",
      "Talent assessment frameworks",
      "Workforce planning and headcount modeling",
      "Compensation strategy",
      "Onboarding and ramp-time diagnostics",
    ],
    sectors: [
      "Healthcare systems",
      "National home-service brands",
      "Hospitality groups",
    ],
    engagementModels: ["Project", "Advisory"],
    thesis:
      "Most hiring problems are actually design problems — the wrong job description, the wrong screen, the wrong interview loop, the wrong compensation band. We build hiring systems the way an operator would: repeatable, measurable, and transferable to an internal team on exit.",
  },
  {
    number: "05",
    slug: "operational-hr",
    name: "Operational HR & Associate Engagement",
    shortName: "Operational HR",
    chapter: "hr",
    positioning: "Culture as a measurable asset, not a slogan.",
    shortDescription:
      "Manager development, retention systems, and the operational HR work that determines whether your culture is a slogan or a measurable asset. Built for organizations whose people strategy needs to catch up to their growth.",
    services: [
      "Retention Strategy — diagnostics, intervention design, longitudinal tracking",
      "Associate Engagement Programs — measurement, design, manager-rhythm cadence",
      "Manager development and frontline leadership training",
      "Performance management redesign",
      "Exit interview and sentiment systems",
      "Culture-as-asset measurement frameworks",
    ],
    sectors: [
      "Healthcare systems",
      "National home-service brands",
      "Hospitality groups",
      "Municipalities",
    ],
    engagementModels: ["Retainer", "Project"],
    thesis:
      "Engagement survey scores don't move without managers who know how to run 1:1s, handle performance issues, and build trust. We invest in the manager layer — the actual lever that moves retention, engagement, and discretionary effort — rather than the HR systems that only measure it.",
  },
  {
    number: "06",
    slug: "ai-practice",
    name: "AI Practice — Voice & Workflow Automation",
    shortName: "AI Practice",
    chapter: "ai",
    positioning: "Built by an operator, not a vendor.",
    shortDescription:
      "Voice AI deployment, workflow automation, and the modular prompting frameworks that make LLM systems reliable in regulated and operationally complex environments. Production deployments across healthcare, government, hospitality, home services, and political operations.",
    services: [
      "Voice AI deployment (intake, scheduling, qualification, follow-up)",
      "Workflow automation for regulated and operationally complex environments",
      "Modular prompting architecture and knowledge base design",
      "LLM reliability engineering — evaluation, guardrails, fallbacks",
      "Integration strategy (EHR, CRM, ticketing, scheduling platforms)",
      "AI policy, governance, and adoption frameworks",
    ],
    sectors: [
      "Healthcare systems",
      "Medical & dental clinics",
      "Government agencies",
      "Municipalities",
      "National home-service brands",
      "Hospitality groups",
      "Youth sports organizations",
      "Political operations",
    ],
    engagementModels: ["Build", "Advisory"],
    thesis:
      "Most AI deployments fail not because the models are inadequate, but because the surrounding system — the prompts, the knowledge, the guardrails, the integrations, the change management — wasn't built by someone who understood the domain. We build AI systems the way operators build software: measured, constrained, and accountable to the reality they're deployed into.",
  },
  {
    number: "07",
    slug: "human-ai-workforce",
    name: "Human + AI Workforce Programs",
    shortName: "Human + AI Programs",
    chapter: "humanai",
    positioning:
      "Designing the programs where human operators and AI teammates adopt each other — and stay integrated.",
    shortDescription:
      "Adoption and integration programs for organizations bringing AI teammates into existing operations — combining human-side change management with technical integration architecture so the workforce becomes one system, not two.",
    services: [
      "Adoption program design — rollout plan, manager enablement, frontline training",
      "Human-AI workflow integration architecture",
      "Change management frameworks specific to AI deployments",
      "Adoption diagnostics and post-launch monitoring",
      "Governance frameworks for human-and-AI collaboration",
      "Workforce program redesign for hybrid teams",
    ],
    sectors: [
      "Healthcare systems",
      "Home health & hospice",
      "Government agencies",
      "National home-service brands",
      "Hospitality groups",
      "Municipalities",
    ],
    engagementModels: ["Build", "Project", "Advisory"],
    thesis:
      "An AI deployment is not a tool drop — it's a workforce change. The programs that survive past pilot are the ones designed for the human side of integration from day one. We design AI adoption like an operational program, not a launch.",
  },
];

export const DIVISION_COUNT = DIVISIONS.length;

export function getDivision(slug: string) {
  return DIVISIONS.find((d) => d.slug === slug);
}
