import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { routeSlugs, type RouteKey } from "@/lib/paths";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.keys(routeSlugs) as RouteKey[];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const slug = routeSlugs[route];
    for (const locale of locales) {
      const path = slug ? `/${locale}/${slug}` : `/${locale}`;

      // Emit hreflang alternates for each URL.
      const languages: Record<string, string> = {};
      for (const alt of locales) {
        languages[alt] = `${site.url}${slug ? `/${alt}/${slug}` : `/${alt}`}`;
      }

      entries.push({
        url: `${site.url}${path}`,
        lastModified: now,
        changeFrequency: route === "home" ? "monthly" : "yearly",
        priority: route === "home" ? 1 : route === "contact" ? 0.8 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
