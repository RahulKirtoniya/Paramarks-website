import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { Section, Tagline } from "@/components/Primitives";
import CTASection from "@/components/CTASection";
import Counter from "@/components/Counter";

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
        aside={
          <div className="lg:ml-auto lg:max-w-xs">
            <p className="label label-light">{locale === "nl" ? "In het kort" : "At a glance"}</p>
            <dl className="mt-6 divide-y divide-sand-50/12 border-y border-sand-50/12">
              {(locale === "nl"
                ? [
                  { k: "Opgericht", v: "1997" },
                  { k: "Vertrouwd door", v: "Fortune 500" },
                  { k: "Lidmaatschap", v: "INTA & ASIPI" },
                  { k: "Onderzoek", v: "Eigen afdeling" },
                ]
                : [
                  { k: "Founded", v: "1997" },
                  { k: "Trusted by", v: "Fortune 500" },
                  { k: "Members of", v: "INTA & ASIPI" },
                  { k: "Investigations", v: "In-house unit" },
                ]
              ).map((c, i) => (
                <div key={i} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-sm text-sand-200/70">{c.k}</dt>
                  <dd className="font-serif text-[1.15rem] font-semibold text-gold-300">{c.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
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
            <div className="relative overflow-hidden rounded-panel bg-plum-800 p-9 text-sand-50 shadow-lift">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(70% 90% at 90% 0%, rgba(198,161,91,0.16), transparent 60%)",
                }}
              />
              <div className="relative">
                <p className="label label-light">{mission.label}</p>
                <p className="mt-6 font-serif text-[1.4rem] leading-snug text-sand-50">
                  {mission.body}
                </p>
                <p className="mt-7 font-serif text-[1.15rem] italic text-gold-300">{dict.tagline}</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Stats */}
      <section className="bg-sand-100 py-section">
        <div className="container-x">
          <div className="grid grid-cols-2 border-t border-plum-200 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className={[
                  "py-9",
                  "border-b border-plum-200 lg:border-b-0",
                  i % 2 === 0 ? "border-r border-plum-200" : "",
                  "lg:border-r lg:last:border-r-0",
                  "pl-1 lg:pl-6",
                ].join(" ")}
              >
                <Counter
                  value={s.value}
                  className="block font-serif text-5xl font-semibold tabular-nums text-plum-700"
                />
                <div className="mt-2 text-[0.9rem] text-ink-400">{s.label}</div>
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