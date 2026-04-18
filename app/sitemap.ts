import type { MetadataRoute } from "next";
import { DIVISIONS } from "@/content/divisions";
import { FIRM } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = FIRM.siteUrl;
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [
    "",
    "/practice",
    "/founder",
    "/engagement",
    "/transmissions",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  DIVISIONS.forEach((d) => {
    routes.push({
      url: `${base}/practice/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  });

  return routes;
}
