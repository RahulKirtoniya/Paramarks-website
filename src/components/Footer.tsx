import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { localePath, type RouteKey } from "@/lib/paths";
import { site } from "@/lib/site";
import Wordmark from "./Wordmark";
import FooterContact from "./FooterContact";

const FOOTER_NAV: { key: RouteKey; labelKey: keyof Dictionary["nav"] }[] = [
  { key: "about", labelKey: "about" },
  { key: "team", labelKey: "team" },
  { key: "services", labelKey: "services" },
  { key: "caseStudies", labelKey: "caseStudies" },
  { key: "faq", labelKey: "faq" },
  { key: "contact", labelKey: "contact" },
];

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-plum-950 text-sand-200/80">
      <FooterContact locale={locale} dict={dict} />
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + tagline */}
          <div className="md:col-span-5">
            <Wordmark locale={locale} light />
            <p className="mt-5 max-w-sm font-serif text-lg italic text-gold-300">
              {dict.footer.tagline}
            </p>
            <p className="mt-2 max-w-sm text-sm text-sand-200/60">
              {dict.footer.subTagline}
            </p>

            <p className="mt-7 text-[0.74rem] font-semibold tracking-wide text-sand-200/45">
              {dict.footer.membership}
            </p>
            <div className="mt-3 flex items-center gap-3" aria-hidden>
              {site.memberships.map((m) => (
                <span
                  key={m}
                  className="rounded border border-sand-200/20 px-3 py-1 text-xs font-semibold tracking-wide text-sand-200/70"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-[0.74rem] font-semibold tracking-wide text-sand-200/45">
              {dict.footer.nav}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={localePath(locale, item.key)}
                    className="text-sm text-sand-200/75 transition-colors hover:text-gold-300"
                  >
                    {dict.nav[item.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-[0.74rem] font-semibold tracking-wide text-sand-200/45">
              {dict.footer.contact}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-sand-200/75 transition-colors hover:text-gold-300"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                  className="text-sand-200/75 transition-colors hover:text-gold-300"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="text-sand-200/60">
                {site.contact.address.city}, {site.contact.address.country}
              </li>
            </ul>

            <p className="mt-6 font-serif text-base italic text-gold-300/90">
              {dict.footer.localCta}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-sand-200/10 pt-6 text-xs text-sand-200/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={localePath(locale, "privacy")}
              className="transition-colors hover:text-gold-300"
            >
              {locale === "nl" ? "Privacybeleid" : "Privacy Policy"}
            </Link>
            <span aria-hidden className="h-3 w-px bg-sand-200/20" />
            <Link
              href={localePath(locale, "terms")}
              className="transition-colors hover:text-gold-300"
            >
              {locale === "nl" ? "Algemene voorwaarden" : "Terms & Conditions"}
            </Link>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-4 text-center text-xs text-sand-200/40 sm:text-left">
          {locale === "nl" ? "Gemaakt door " : "Made by "}
          <a
            href="https://shaanark.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sand-200/60 transition-colors hover:text-gold-300"
          >
            Shaanark Ventures
          </a>
        </div>
      </div>
    </footer>
  );
}