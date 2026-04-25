/*
  Two strips of brand marks for the homepage:

   1. OPERATOR_ROLES — places where Colin held the operator title (employee).
      Sits above the clients strip; labeled distinctly so it's never confused
      with advisory engagements.

   2. CLIENTS — advisory engagements / clients / affiliations of C Highland
      Advisory. The cross-industry portfolio.

  Order in CLIENTS is deliberate: the most recognizable national / sector-
  anchor brands occupy Row 1 (5 cells on desktop) so the eye reads breadth
  and credibility before reading detail. Subsequent rows mix sectors per row.

  Logo sourcing:
    Primary  — https://logo.uplead.com/{domain}      (returns real brand logo)
    Fallback — https://icons.duckduckgo.com/ip3/{domain}.ico  (favicon)
    Final    — text fallback rendering the brand name in mono uppercase
*/

export type Client = {
  name: string;
  /** Domain used for default logo lookup. */
  domain: string;
  /** Canonical site URL — opens in new tab on logo click. */
  url: string;
  /** Optional override for the primary logo image source. */
  logoSrc?: string;
  /** Sector tag — used later for filterable views. */
  sector?:
    | "national-services"
    | "government"
    | "healthcare"
    | "hospitality"
    | "ai"
    | "sports"
    | "communications";
};

export const OPERATOR_ROLES: Client[] = [
  { name: "Humana",                domain: "humana.com",                  url: "https://www.humana.com/",                 sector: "healthcare" },
  { name: "CenterWell Home Health", domain: "centerwellhomehealth.com",    url: "https://www.centerwellhomehealth.com/",   sector: "healthcare" },
];

export const CLIENTS: Client[] = [
  // Row 1 — recognizable national / anchor brands
  { name: "Servpro",            domain: "servpro.com",          url: "https://www.servpro.com/",          sector: "national-services" },
  { name: "CertaPro Painters",  domain: "certapro.com",         url: "https://www.certapro.com/",         sector: "national-services" },
  { name: "City of Denver",     domain: "denvergov.org",        url: "https://www.denvergov.org/Home",    sector: "government" },
  { name: "Arlington, TX",      domain: "arlingtontx.gov",      url: "https://www.arlingtontx.gov/Home",  sector: "government" },
  { name: "Suncadia",           domain: "suncadia.com",         url: "https://suncadia.com/",             sector: "hospitality" },

  // Row 2 — civic + government breadth
  { name: "Lancaster, CA",      domain: "cityoflancasterca.org", url: "https://www.cityoflancasterca.org/", sector: "government" },
  { name: "KCMO BizCare",       domain: "kcmo.gov",             url: "https://bizcare.kcmo.gov/contactbizcare", sector: "government" },
  { name: "Mt. Pleasant, SC",   domain: "tompsc.com",           url: "https://www.tompsc.com/",           sector: "government" },
  { name: "Cobb Mosquito",      domain: "mosquitoes.org",       url: "https://www.mosquitoes.org/",       sector: "government" },
  { name: "Citibot",            domain: "citibot.io",           url: "https://www.citibot.io/",           sector: "ai" },

  // Row 3 — healthcare + tech-services
  { name: "Syracuse Family Dentist", domain: "syracusefamilydentist.com", url: "https://syracusefamilydentist.com/", sector: "healthcare" },
  { name: "Denteek",            domain: "denteek.com",          url: "https://www.denteek.com/",          sector: "healthcare" },
  { name: "IHLTH",              domain: "ihlth.org",            url: "https://www.ihlth.org/",            sector: "healthcare" },
  { name: "Call Experts",       domain: "callexperts.com",      url: "https://callexperts.com/",          sector: "communications" },
  { name: "eGroup-US",          domain: "egroup-us.com",        url: "https://www.egroup-us.com/",        sector: "communications" },

  // Row 4 — hospitality + sports + emerging AI
  { name: "Cane & Barrel",      domain: "caneandbarrelstpete.com", url: "https://www.caneandbarrelstpete.com/", sector: "hospitality" },
  { name: "New England Surf",   domain: "newenglandsurf.com",   url: "https://newenglandsurf.com/",       sector: "sports" },
  { name: "Global Sports Experiences", domain: "globalsportsexperiences.com", url: "https://globalsportsexperiences.com/", sector: "sports" },
  { name: "LouLou.ai",          domain: "loulou.ai",            url: "https://www.loulou.ai/",            sector: "ai" },
  { name: "Loved Ones Voice",   domain: "lovedonesvoice.com",   url: "https://lovedonesvoice.com/",       sector: "ai" },
];

/** Primary logo URL — returns a real brand logo for ~65% of domains. */
export function clientLogoSrc(c: Client): string {
  return c.logoSrc ?? `https://logo.uplead.com/${c.domain}`;
}

/** Fallback when the primary 404s — falls back to the site's favicon. */
export function clientLogoFallback(c: Client): string {
  return `https://icons.duckduckgo.com/ip3/${c.domain}.ico`;
}
