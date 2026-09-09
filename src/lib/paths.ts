import type { Locale } from "@/i18n/config";

export type RouteKey =
  | "home"
  | "about"
  | "team"
  | "services"
  | "caseStudies"
  | "faq"
  | "contact"
  | "privacy"
  | "terms";

export const routeSlugs: Record<RouteKey, string> = {
  home: "",
  about: "about",
  team: "team",
  services: "services",
  caseStudies: "case-studies",
  faq: "faq",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
};

export function localePath(locale: Locale, route: RouteKey): string {
  const slug = routeSlugs[route];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}
