import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import { buildMetadata } from "@/lib/seo";
import { localePath } from "@/lib/paths";
import { Section, SectionHeading, Tagline } from "@/components/Primitives";
import { USPGrid, ServicesGrid } from "@/components/Sections";
import CTASection from "@/components/CTASection";
import { ArrowIcon } from "@/components/icons/Icons";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({ locale: params.locale, route: "/", meta: dict.meta.home });
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const { hero, usp, services, cases } = dict.home;

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-plum-900 text-sand-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 90% at 78% 8%, rgba(198,161,91,0.18), transparent 55%)",
          }}
        />
        {/* Faint concentric rings, right side */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 md:block"
        >
          <div className="h-[560px] w-[560px] rounded-full border border-gold-500/12" />
          <div className="absolute inset-16 rounded-full border border-gold-500/10" />
          <div className="absolute inset-32 rounded-full border border-gold-500/8" />
        </div>

        <div className="container-x relative grid gap-12 pb-20 pt-20 sm:pt-28 lg:grid-cols-12 lg:gap-8 lg:pb-28">
          <div className="lg:col-span-8">
            <p className="eyebrow text-gold-400">
              <span className="h-px w-6 bg-gold-500/70" aria-hidden />
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 max-w-[16ch] text-display-lg text-sand-50 animate-rise">
              {hero.headline}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-sand-200/85">
              {/* Fortune 500 made prominent, per brief */}
              Led by credentialed IP attorneys,{" "}
              <span className="font-semibold text-gold-300">
                trusted by Fortune 500 companies worldwide.
              </span>
            </p>
            <p className="mt-5 max-w-xl border-l-2 border-gold-500/60 pl-4 text-base leading-relaxed text-sand-200/70">
              {hero.impact}
            </p>

            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Link href={localePath(locale, "contact")} className="btn-gold">
                {dict.cta.contact}
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <Tagline text={dict.tagline} variant="light" className="text-lg" />
            </div>
          </div>
        </div>
        <div className="hairline absolute inset-x-0 bottom-0" aria-hidden />
      </section>

      {/* ---------------- USP ---------------- */}
      <Section>
        <SectionHeading
          eyebrow={usp.heading}
          title={
            locale === "nl"
              ? "Waarom cliënten wereldwijd op ons bouwen."
              : "Why clients worldwide rely on us."
          }
        />
        <div className="mt-12">
          <USPGrid items={usp.items} />
        </div>
      </Section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="bg-sand-100 py-section">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow={services.heading}
              title={services.closing}
            />
            <Link
              href={localePath(locale, "services")}
              className="btn-outline self-start md:self-auto"
            >
              {dict.nav.services}
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <ServicesGrid items={services.items} />
          </div>
          <div className="mt-10">
            <Tagline text={dict.tagline} variant="quiet" className="text-base" />
          </div>
        </div>
      </section>

      {/* ---------------- CASE STUDIES ---------------- */}
      <Section>
        <SectionHeading
          eyebrow={locale === "nl" ? "Praktijk" : "Track record"}
          title={cases.heading}
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-plum-100 bg-plum-100 md:grid-cols-2">
          {cases.items.map((c, i) => (
            <div key={i} className="bg-sand-50 p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">
                {c.label}
              </span>
              <p className="mt-4 text-base leading-relaxed text-ink-600">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-between gap-4">
          <Tagline text={dict.tagline} variant="quiet" />
          <Link
            href={localePath(locale, "caseStudies")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-plum-700 hover:text-gold-600"
          >
            {dict.nav.caseStudies}
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CTASection locale={locale} dict={dict} />
    </>
  );
}
