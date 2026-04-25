/*
  CLIENTS — names only marquee data. Per DESIGN_HANDOFF: no logos.

  SECTORS — 9 cells in the window-pane grid below the marquee.
*/

export type ClientEntry = { name: string; tag: string };

export const CLIENTS: ClientEntry[] = [
  { name: "Humana", tag: "Payor / Provider" },
  { name: "CenterWell Home Health", tag: "Home Health" },
  { name: "South Carolina DHHS", tag: "Government" },
  { name: "Charleston County", tag: "Municipal" },
  { name: "Atrium Health Affiliates", tag: "Health System" },
  { name: "Lowcountry Dental Group", tag: "Dental" },
  { name: "Hospice Care of the Lowcountry", tag: "Hospice" },
  { name: "Coastal Home Services", tag: "Home Services" },
  { name: "Charleston Hospitality Group", tag: "Hospitality" },
  { name: "Lowcountry Youth Sports", tag: "Youth Sports" },
  { name: "Palmetto State Strategy", tag: "Political Ops" },
  { name: "Highland Brothers", tag: "Sibling Brand" },
];

export type SectorEntry = { num: string; name: string; count: string };

export const SECTORS: SectorEntry[] = [
  { num: "01", name: "Healthcare systems", count: "Active" },
  { num: "02", name: "Medical & dental clinics", count: "Active" },
  { num: "03", name: "Home health & hospice", count: "Active" },
  { num: "04", name: "Government agencies", count: "Active" },
  { num: "05", name: "Municipalities", count: "Active" },
  { num: "06", name: "National home-service brands", count: "Active" },
  { num: "07", name: "Hospitality groups", count: "Active" },
  { num: "08", name: "Youth sports orgs", count: "Active" },
  { num: "09", name: "Political operations", count: "Active" },
];
