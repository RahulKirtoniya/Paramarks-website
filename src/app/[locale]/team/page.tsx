import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { Section, Tagline } from "@/components/Primitives";
import { TeamGrid } from "@/components/Sections";
import { Icon } from "@/components/icons/Icons";
import CTASection from "@/components/CTASection";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({ locale: params.locale, route: "/team", meta: dict.meta.team });
}

export default async function TeamPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const { hero, members, supporting } = dict.team;

  return (
    <>
      <PageHero
        eyebrow={locale === "nl" ? "Het team" : "The team"}
        headline={hero.headline}
        subline={hero.subline}
      >
        {/* Investigation-unit USP made visually prominent */}
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-300">
          <Icon name="magnifier" className="h-4 w-4" />
          {locale === "nl"
            ? "Enige kantoor in Suriname met eigen onderzoeksafdeling"
            : "Only firm in Suriname with an in-house investigation unit"}
        </span>
      </PageHero>

      <Section>
        <TeamGrid members={members} />
      </Section>

      {/* Supporting */}
      <section className="bg-sand-100 py-section">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-headline text-plum-700">{supporting.title}</h2>
            <p className="mx-auto mt-6 max-w-prose text-lg leading-relaxed text-ink-600">
              {supporting.text}
            </p>
            <div className="mt-8">
              <Tagline text={dict.tagline} className="inline-block text-lg" />
            </div>
          </div>
        </div>
      </section>

      <CTASection locale={locale} dict={dict} />
    </>
  );
}
