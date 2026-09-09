import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import type { PageMeta } from "@/i18n/dictionaries/types";
import { site } from "@/lib/site";

/**
 * Build the localized path map for a route, used for hreflang alternates.
 * e.g. route "/about" -> { en: "/en/about", nl: "/nl/about" }
 */
function localizedPaths(route: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) {
    map[l] = route === "/" ? `/${l}` : `/${l}${route}`;
  }
  // x-default points at the default locale — good practice for international sites.
  map["x-default"] = route === "/" ? `/${defaultLocale}` : `/${defaultLocale}${route}`;
  return map;
}

interface BuildMetaArgs {
  locale: Locale;
  route: string; // e.g. "/", "/about"
  meta: PageMeta;
}

export function buildMetadata({ locale, route, meta }: BuildMetaArgs): Metadata {
  const canonicalPath = route === "/" ? `/${locale}` : `/${locale}${route}`;
  const canonical = `${site.url}${canonicalPath}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
      languages: localizedPaths(route),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      url: canonical,
      locale: locale === "nl" ? "nl_NL" : "en_US",
      alternateLocale: locale === "nl" ? ["en_US"] : ["nl_NL"],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}
