import { site } from "@/lib/site";
import type { Locale } from "@/i18n/config";

/**
 * Emits Organization / LegalService structured data so search engines can
 * build rich results and Knowledge Panels. Rendered once in the locale layout.
 */
export default function JsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/${locale}`,
    foundingDate: site.foundingYear,
    email: site.contact.email,
    telephone: site.contact.phone,
    knowsLanguage: site.languages,
    areaServed: {
      "@type": "Country",
      name: site.areaServed,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.address.city,
      addressCountry: site.contact.address.countryCode,
    },
    memberOf: site.memberships.map((m) => ({ "@type": "Organization", name: m })),
    sameAs: [site.social.linkedin],
    slogan:
      locale === "nl" ? "Uw merk in vakkundige handen." : "Your brand in qualified hands.",
    description:
      locale === "nl"
        ? "Boutique IP-kantoor in Suriname, gespecialiseerd in merken en merkbescherming."
        : "Boutique IP firm in Suriname, specialized in trademarks and brand protection.",
  };

  return (
    <script
      type="application/ld+json"
      // Structured data must be raw JSON in a script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
