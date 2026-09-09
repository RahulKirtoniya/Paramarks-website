import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { localePath } from "@/lib/paths";
import { ArrowIcon } from "./icons/Icons";

export default function CTASection({
  locale,
  dict,
  showConsultation = true,
}: {
  locale: Locale;
  dict: Dictionary;
  showConsultation?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-plum-900 text-sand-50">
      {/* subtle gold radial + hairline accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 120% at 85% 10%, rgba(198,161,91,0.16), transparent 60%)",
        }}
      />
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="container-x relative py-section">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-headline text-sand-50">{dict.cta.protectHeadline}</h2>
            <p className="mt-4 font-serif text-lg italic text-gold-300">
              {dict.footer.tagline}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={localePath(locale, "contact")} className="btn-gold">
              {dict.cta.contact}
              <ArrowIcon className="h-4 w-4" />
            </Link>
            {showConsultation && (
              <Link href={localePath(locale, "contact")} className="btn-ghost-light">
                {dict.cta.consultation}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
