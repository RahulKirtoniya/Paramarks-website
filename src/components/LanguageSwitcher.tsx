"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, localeLabels, localeNames, type Locale } from "@/i18n/config";
import { GlobeIcon, ChevronDownIcon } from "./icons/Icons";

/**
 * Language switcher.
 * - "dropdown" (default): a globe button that opens a small menu — used in the
 *   desktop header where there's room and no clipping.
 * - "inline": the locales shown side-by-side as tappable pills — used in the
 *   mobile menu, where a dropdown would be clipped by the menu's overflow.
 */
export default function LanguageSwitcher({
  current,
  label,
  light = false,
  variant = "dropdown",
}: {
  current: Locale;
  label: string;
  light?: boolean;
  variant?: "dropdown" | "inline";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function pathFor(locale: Locale): string {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* ---------------- Inline (mobile) ---------------- */
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-1.5" role="group" aria-label={label}>
        <GlobeIcon className="h-4 w-4 text-gold-600" />
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <Link
              key={locale}
              href={pathFor(locale)}
              hrefLang={locale}
              aria-label={localeNames[locale]}
              aria-current={active ? "true" : undefined}
              className={[
                "rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
                active ? "bg-plum-100 text-plum-700" : "text-ink-500 hover:text-plum-700",
              ].join(" ")}
            >
              {localeLabels[locale]}
            </Link>
          );
        })}
      </div>
    );
  }

  /* ---------------- Dropdown (desktop) ---------------- */
  const trigger = light
    ? "border-sand-50/25 text-sand-50 hover:border-gold-400"
    : "border-plum-200 text-plum-700 hover:border-gold-500";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        className={[
          "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
          trigger,
        ].join(" ")}
      >
        <GlobeIcon className="h-4 w-4 text-gold-600" />
        {localeLabels[current]}
        <ChevronDownIcon
          className={["h-3.5 w-3.5 transition-transform", open ? "rotate-180" : ""].join(" ")}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[60] mt-2 min-w-[168px] overflow-hidden rounded-card border border-plum-100 bg-paper py-1.5 shadow-lift"
        >
          {locales.map((locale) => {
            const active = locale === current;
            return (
              <Link
                key={locale}
                role="menuitem"
                href={pathFor(locale)}
                hrefLang={locale}
                aria-current={active ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={[
                  "flex items-center justify-between gap-4 px-4 py-2 text-sm transition-colors",
                  active
                    ? "font-semibold text-plum-700"
                    : "text-ink-500 hover:bg-sand-100 hover:text-plum-700",
                ].join(" ")}
              >
                <span>{localeNames[locale]}</span>
                <span className={active ? "text-gold-600" : "text-ink-400"}>
                  {localeLabels[locale]}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}