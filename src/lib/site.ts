// Central place for business facts. Update these to the firm's real details.
// Used across metadata, JSON-LD structured data, footer, and contact page.

export const site = {
  name: "Paramarks PC",
  legalName: "Paramarks PC",
  // IMPORTANT: set this to the production domain before deploy — SEO alternates,
  // canonicals and the sitemap all derive from it.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.paramarks.com",
  foundingYear: "1997",
  areaServed: "Suriname",
  languages: ["English", "Dutch"],
  memberships: ["INTA", "ASIPI"],
  tagline: {
    en: "Your brand in qualified hands.",
    nl: "Uw merk in vakkundige handen.",
  },
  contact: {
    email: "info@paramarks.com",
    phone: "+597 000 0000",
    address: {
      street: "Paramaribo",
      city: "Paramaribo",
      country: "Suriname",
      countryCode: "SR",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/paramarks",
  },
} as const;

export type SiteConfig = typeof site;
