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

  return (
    <>
      <PageHero
        eyebrow={locale === "nl" ? "Praktijkvoorbeelden" : "Case studies"}
        headline={hero.headline}
        subline={hero.subline}
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((c, i) => (
            <article
              key={i}
              className={[
                "relative flex flex-col overflow-hidden rounded-2xl border p-8 shadow-card",
                c.highlight
                  ? "border-gold-300 bg-gradient-to-br from-gold-100/70 to-sand-50"
                  : "border-plum-100 bg-sand-50",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    c.highlight
                      ? "bg-gold-500 text-plum-950"
                      : "bg-plum-700 text-gold-400",
                  ].join(" ")}
                >
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">
                  {c.area}
                </span>
              </div>

              <h2 className="mt-6 text-title font-serif text-plum-700">{c.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">{c.text}</p>

              {c.highlight && (
                <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-plum-700">
                  <Icon name="magnifier" className="h-4 w-4 text-gold-600" />
                  {locale === "nl"
                    ? "Via onze eigen onderzoeksafdeling"
                    : "Handled by our in-house investigation unit"}
                </p>
              )}
            </article>
          ))}
        </div>
      </Section>

      <CTASection locale={locale} dict={dict} />
    </>
  );
}
