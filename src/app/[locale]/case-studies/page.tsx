import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Primitives";
import { Icon } from "@/components/icons/Icons";
import CTASection from "@/components/CTASection";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    locale: params.locale,
    route: "/case-studies",
    meta: dict.meta.caseStudies,
  });
}

export default async function CaseStudiesPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const { hero, items } = dict.caseStudies;

  const standard = items.filter((c) => !c.highlight);
  const featured = items.find((c) => c.highlight);

  return (
    <>
      <PageHero
        eyebrow={locale === "nl" ? "Praktijkvoorbeelden" : "Case studies"}
        headline={hero.headline}
        subline={hero.subline}
      />

      {/* Editorial entries, ruled — reads like a register of matters */}
      <Section>
        <div className="border-t border-plum-200">
          {standard.map((c, i) => (
            <article
              key={i}
              className="grid gap-4 border-b border-plum-200 py-10 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-4">
                <div className="flex items-center gap-3">
                  <Icon name={c.icon} className="h-5 w-5 text-gold-600" />
                  <span className="font-serif text-[1.05rem] font-semibold italic text-gold-700">
                    {c.area}
                  </span>
                </div>
                <h2 className="mt-4 font-serif text-[1.6rem] font-semibold leading-tight text-plum-700">
                  {c.title}
                </h2>
              </div>
              <p className="text-[1.05rem] leading-relaxed text-ink-600 md:col-span-8 md:pt-1">
                {c.text}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Featured — the in-house investigation unit, given its own plum plate */}
      {featured && (
        <section className="relative overflow-hidden bg-plum-900 py-section text-sand-50">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(50% 110% at 88% 15%, rgba(198,161,91,0.14), transparent 60%)",
            }}
          />
          <div className="rule-gold absolute inset-x-0 top-0" aria-hidden />
          <div className="container-x relative">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="inline-flex items-center gap-3 rounded-[3px] border border-gold-400/40 bg-gold-500/10 px-4 py-2 text-sm font-semibold text-gold-300">
                  <Icon name="magnifier" className="h-4 w-4" />
                  {locale === "nl" ? "Eigen onderzoeksafdeling" : "In-house investigation unit"}
                </span>
                <p className="mt-6 font-serif text-[1.1rem] italic text-gold-300/90">
                  {locale === "nl"
                    ? "De enige in Suriname."
                    : "The only one of its kind in Suriname."}
                </p>
              </div>
              <div className="lg:col-span-8">
                <span className="font-serif text-[1.05rem] font-semibold italic text-gold-400">
                  {featured.area}
                </span>
                <h2 className="mt-3 text-headline text-sand-50">{featured.title}</h2>
                <p className="mt-5 max-w-prose text-[1.1rem] leading-relaxed text-sand-200/85">
                  {featured.text}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <CTASection locale={locale} dict={dict} />
    </>
  );
}
