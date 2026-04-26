export const FIRM = {
  name: "C Highland Advisory",
  legalName: "C Highland Advisory LLC",
  // Advising since 2023; LLC formed in 2026 but the operator track
  // long predates the entity. Single-source for "founded" + "Est."
  // anywhere on the site.
  founded: "2023",
  location: "Charleston, SC",
  founderFull: "Colin Highland, PT, DPT, CBA",
  founderName: "Colin Highland",
  founderCreds: "PT, DPT, CBA",
  discipline: "Strategy, operations & applied AI",
  portfolioUrl: "https://colinhighland.com",
  // Free Outlook inbox until a domain inbox is funded by revenue.
  // Single-source so the future domain switch is a one-line change.
  contactEmail: "colinhighland@outlook.com",
  siteUrl: "https://chighlandadvisory.com",
} as const;

export const SECTORS = [
  "Healthcare systems",
  "Medical & dental clinics",
  "Home health & hospice",
  "Government agencies",
  "Municipalities",
  "National home-service brands",
  "Hospitality groups",
  "Youth sports organizations",
  "Political operations",
] as const;
