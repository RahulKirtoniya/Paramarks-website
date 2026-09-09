import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Primitives";
import { ServicesGrid } from "@/components/Sections";
import CTASection from "@/components/CTASection";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({ locale: params.locale, route: "/services", meta: dict.meta.services });
}

export default async function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const { hero, grid, supporting } = dict.services;

  return (
    <>
      <PageHero
        eyebrow={locale === "nl" ? "Diensten" : "Services"}
        headline={hero.headline}
        subline={hero.subline}
      />

      <Section>
        <ServicesGrid items={grid} />
      </Section>

      {/* Supporting */}
      <section className="relative overflow-hidden bg-plum-900 py-section text-sand-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(50% 100% at 15% 20%, rgba(198,161,91,0.14), transparent 55%)",
          }}
        />
        <div className="container-x relative">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <h2 className="text-headline text-sand-50">{supporting.title}</h2>
            <div>
              <p className="max-w-prose text-lg leading-relaxed text-sand-200/85">
                {supporting.text}
              </p>
              <p className="mt-6 font-serif text-lg italic text-gold-300">
                {dict.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection locale={locale} dict={dict} />
    </>
  );
}
