import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/paths";

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
      {/* Gold monogram tick */}
      <span
        aria-hidden
        className="mr-1 inline-block h-5 w-[3px] translate-y-[2px] rounded-full bg-gold-500 transition-transform group-hover:scale-y-110"
      />
      <span
        className={[
          "font-serif text-xl font-semibold tracking-tight",
          light ? "text-sand-50" : "text-plum-700",
        ].join(" ")}
      >
        Paramarks
      </span>
      <span
        className={[
          "text-xs font-semibold uppercase tracking-[0.2em]",
          light ? "text-gold-400" : "text-gold-600",
        ].join(" ")}
      >
        PC
      </span>
    </Link>
  );
}
