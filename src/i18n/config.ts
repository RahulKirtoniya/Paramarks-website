export const locales = ["en", "nl"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  nl: "NL",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
};

// hreflang codes emitted in <link rel="alternate">
export const localeHreflang: Record<Locale, string> = {
  en: "en",
  nl: "nl",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
