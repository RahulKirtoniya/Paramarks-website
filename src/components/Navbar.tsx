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

  // Lock body scroll while the drawer is open; close on Escape.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

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
      {/* Utility bar — email & phone. Stays pinned with the header on desktop. */}
      <div className="hidden border-b border-plum-100 md:block">
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

      {/* Mobile drawer + backdrop (kept mounted so open AND close animate) */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-[55] bg-plum-950/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={[
          "fixed right-0 top-0 z-[60] flex h-full w-[min(86vw,360px)] flex-col bg-sand-50 shadow-2xl xl:hidden",
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between gap-3 border-b border-plum-100 bg-sand-100 px-6 py-4">
          <div>
            <Wordmark locale={locale} />
            <p className="mt-1.5 text-xs text-ink-400">
              {locale === "nl"
                ? "Merken- & IP-advocaten \u00B7 Suriname"
                : "Trademark & IP attorneys \u00B7 Suriname"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-plum-200 text-plum-700 transition-colors hover:border-gold-500"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Links — large serif rows with chevrons and hairline dividers */}
        <nav className="flex-1 overflow-y-auto px-6" aria-label="Mobile">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.key}
              href={localePath(locale, item.key)}
              aria-current={isActive(item.key) ? "page" : undefined}
              style={{ transitionDelay: open ? `${70 + i * 40}ms` : "0ms" }}
              className={[
                "flex items-center justify-between gap-4 border-b border-plum-100 py-5 transition-all duration-300",
                open ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0",
              ].join(" ")}
            >
              <span
                className={[
                  "font-serif text-[1.6rem] leading-none",
                  isActive(item.key) ? "text-gold-700" : "text-plum-700",
                ].join(" ")}
              >
                {dict.nav[item.labelKey]}
              </span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none text-plum-300" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Bottom: language + prominent CTA */}
        <div className="border-t border-plum-100 px-6 py-5">
          <div className="mb-4 flex justify-center">
            <LanguageSwitcher current={locale} label={dict.nav.languageLabel} variant="inline" />
          </div>
          <Link href={localePath(locale, "contact")} className="btn-gold w-full">
            {dict.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}