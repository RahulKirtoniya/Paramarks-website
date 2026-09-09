import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/paths";

/**
 * Wordmark. The registered-mark superscript ties the identity to the firm's
 * craft — protecting marks — without a decorative logo.
 */
export default function Wordmark({
  locale,
  light = false,
}: {
  locale: Locale;
  light?: boolean;
}) {
  return (
    <Link
      href={localePath(locale, "home")}
      className="group inline-flex items-baseline gap-2"
      aria-label="Paramarks PC — home"
    >
      <span
        className={[
          "font-serif text-[1.45rem] font-semibold leading-none tracking-tight",
          light ? "text-sand-50" : "text-plum-700",
        ].join(" ")}
      >
        Paramarks
        <sup className="ml-0.5 align-super font-sans text-[0.6rem] font-semibold text-gold-600 transition-colors group-hover:text-gold-500">
          &#174;
        </sup>
      </span>
      <span aria-hidden className={light ? "h-4 w-px bg-sand-50/25" : "h-4 w-px bg-plum-300"} />
      <span
        className={[
          "text-[0.7rem] font-semibold tracking-[0.22em] text-gold-600",
          light ? "text-gold-400" : "",
        ].join(" ")}
      >
        PC
      </span>
    </Link>
  );
}
