import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { Section, Tagline } from "@/components/Primitives";
import CTASection from "@/components/CTASection";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({ locale: params.locale, route: "/about", meta: dict.meta.about });
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const { hero, intro, mission, stats } = dict.about;

  return (
    <>
      <PageHero
        eyebrow={locale === "nl" ? "Over Paramarks" : "About Paramarks"}
        headline={hero.headline}
        subline={hero.subline}
      />

      {/* Intro */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-headline text-plum-700">{intro.heading}</h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-600">
              {intro.body}
            </p>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-500">
              {intro.memberships}
            </p>
            <div className="mt-8">
              <Tagline text={dict.tagline} />
            </div>
          </div>

          {/* Mission card */}
          <aside className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl bg-plum-800 p-8 text-sand-50 shadow-lift">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(70% 90% at 90% 0%, rgba(198,161,91,0.18), transparent 60%)",
                }}
              />
              <div className="relative">
                <p className="eyebrow text-gold-400">
                  <span className="h-px w-6 bg-gold-500/70" aria-hidden />
                  {mission.label}
                </p>
                <p className="mt-5 font-serif text-xl leading-snug text-sand-50">
                  {mission.body}
                </p>
                <p className="mt-6 font-serif italic text-gold-300">{dict.tagline}</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Stats */}
      <section className="bg-sand-100 py-section">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-plum-100 bg-plum-100 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-sand-50 px-6 py-10 text-center">
                <div className="font-serif text-4xl font-semibold text-plum-700 sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-medium uppercase tracking-wide text-ink-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Tagline text={dict.tagline} variant="quiet" className="inline-block" />
          </div>
        </div>
      </section>

      <CTASection locale={locale} dict={dict} />
    </>
  );
}
