"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, localeNames, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({
  current,
  label,
  light = false,
}: {
  current: Locale;
  label: string;
  light?: boolean;
}) {
  const pathname = usePathname();

  // Swap the first path segment (the locale) while keeping the rest of the URL.
  function pathFor(locale: Locale): string {
    const segments = pathname.split("/");
    segments[1] = locale; // segments[0] is "" before the leading slash
    return segments.join("/") || `/${locale}`;
  }

  const idle = light ? "text-sand-200/70" : "text-ink-400";
  const active = light ? "text-gold-300" : "text-plum-700";

  return (
    <div
      className="flex items-center gap-1 text-sm font-semibold"
      role="group"
      aria-label={label}
    >
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && <span className={`mx-1 ${idle}`} aria-hidden>·</span>}
          <Link
            href={pathFor(locale)}
            hrefLang={locale}
            aria-label={localeNames[locale]}
            aria-current={locale === current ? "true" : undefined}
            className={[
              "rounded px-1 transition-colors hover:text-gold-500",
              locale === current ? active : idle,
            ].join(" ")}
          >
            {localeLabels[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
