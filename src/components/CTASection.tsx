import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { localePath } from "@/lib/paths";

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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: "radial-gradient(55% 120% at 88% 12%, rgba(198,161,91,0.14), transparent 60%)",
        }}
      />
      <div className="rule-gold absolute inset-x-0 top-0" aria-hidden />
      <div className="container-x relative py-section">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-headline text-sand-50">{dict.cta.protectHeadline}</h2>
            <p className="mt-5 font-serif text-[1.25rem] italic text-gold-300">
              {dict.footer.tagline}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={localePath(locale, "contact")} className="btn-gold">
              {dict.cta.contact}
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
