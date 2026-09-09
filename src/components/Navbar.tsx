"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { localePath, type RouteKey } from "@/lib/paths";
import { site } from "@/lib/site";
import Wordmark from "./Wordmark";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_ITEMS: { key: RouteKey; labelKey: keyof Dictionary["nav"] }[] = [
  { key: "home", labelKey: "home" },
  { key: "about", labelKey: "about" },
  { key: "team", labelKey: "team" },
  { key: "services", labelKey: "services" },
  { key: "caseStudies", labelKey: "caseStudies" },
  { key: "faq", labelKey: "faq" },
  { key: "contact", labelKey: "contact" },
];

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (key: RouteKey) => pathname === localePath(locale, key);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-sand-50/90 shadow-[0_1px_0_rgba(46,27,75,0.08)] backdrop-blur-md"
          : "bg-sand-50/0",
      ].join(" ")}
    >
      {/* Utility bar — email & phone. Collapses on scroll to save space. */}
      <div
        className={[
          "hidden overflow-hidden border-b border-plum-100 transition-all duration-300 md:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
        ].join(" ")}
      >
        <div className="container-x">
          <div className="flex h-10 items-center justify-between text-xs">
            <p className="font-serif italic text-gold-700">{dict.tagline}</p>
            <div className="flex items-center gap-6 text-ink-500">
              <a
                href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-plum-700"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold-600" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 014.5 5.5a2 2 0 012-2Z" />
                </svg>
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-2 transition-colors hover:text-plum-700"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold-600" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 6.5h17v11h-17z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                {site.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Wordmark locale={locale} />

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-6 xl:flex"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={localePath(locale, item.key)}
                aria-current={isActive(item.key) ? "page" : undefined}
                className={[
                  "relative whitespace-nowrap text-sm font-medium transition-colors hover:text-plum-700",
                  isActive(item.key) ? "text-plum-700" : "text-ink-500",
                ].join(" ")}
              >
                {dict.nav[item.labelKey]}
                {isActive(item.key) && (
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-gold-500" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 xl:flex">
            <LanguageSwitcher current={locale} label={dict.nav.languageLabel} />
            <Link href={localePath(locale, "contact")} className="btn-gold whitespace-nowrap py-2.5 text-xs">
              {dict.nav.cta}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-plum-700 xl:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={[
                  "absolute left-0 top-0 h-[2px] w-6 bg-current transition-transform",
                  open ? "translate-y-[7px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[7px] h-[2px] w-6 bg-current transition-opacity",
                  open ? "opacity-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[14px] h-[2px] w-6 bg-current transition-transform",
                  open ? "-translate-y-[7px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={[
          "overflow-hidden border-t border-plum-100 bg-sand-50 xl:hidden",
          open ? "max-h-[520px]" : "max-h-0",
          "transition-[max-height] duration-300 ease-in-out",
        ].join(" ")}
      >
        <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={localePath(locale, item.key)}
              aria-current={isActive(item.key) ? "page" : undefined}
              className={[
                "rounded-lg px-3 py-3 text-base font-medium",
                isActive(item.key)
                  ? "bg-plum-100 text-plum-700"
                  : "text-ink-600 hover:bg-sand-100",
              ].join(" ")}
            >
              {dict.nav[item.labelKey]}
            </Link>
          ))}
          <div className="mt-3 flex items-center justify-between border-t border-plum-100 pt-4">
            <LanguageSwitcher current={locale} label={dict.nav.languageLabel} variant="inline" />
            <Link href={localePath(locale, "contact")} className="btn-gold whitespace-nowrap py-2.5 text-xs">
              {dict.nav.cta}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}