import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import { buildMetadata } from "@/lib/seo";
import { localePath } from "@/lib/paths";
import { Section, SectionHeading, Tagline } from "@/components/Primitives";
import { USPGrid, ServicesGrid } from "@/components/Sections";
import CTASection from "@/components/CTASection";
import HeroRegister from "@/components/HeroRegister";

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

  const credentials =
    locale === "nl"
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
        ];

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-plum-900 text-sand-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 82% 30%, rgba(198,161,91,0.10), transparent 60%)",
          }}
        />
        <div className="container-x relative">
          <div className="grid items-center gap-y-12 pb-20 pt-20 sm:pt-24 lg:grid-cols-12 lg:gap-x-10 lg:pb-28 lg:pt-28">
            <div className="lg:col-span-7">
              <p className="label label-light">
                {locale === "nl" ? "Intellectueel eigendom \u2014 Suriname" : "Intellectual property \u2014 Suriname"}
              </p>
              <h1 className="mt-7 max-w-[15ch] text-display-lg text-sand-50 animate-rise">
                {hero.headline}
              </h1>
              <p className="mt-8 max-w-xl text-[1.15rem] leading-relaxed text-sand-200/85">
                {hero.subline}
              </p>
              <p className="mt-6 max-w-xl border-l border-gold-500/50 pl-5 text-[1rem] leading-relaxed text-sand-200/70">
                {hero.impact}
              </p>

              <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <Link href={localePath(locale, "contact")} className="btn-gold">
                  {dict.cta.contact}
                </Link>
                <Tagline text={dict.tagline} variant="light" className="text-[1.15rem]" />
              </div>
            </div>

            {/* The registered seal — interactive: type a brand, see it engraved */}
            <div className="lg:col-span-5">
              <HeroRegister
                inputLabel={
                  locale === "nl"
                    ? "Zie uw eigen merk in het zegel"
                    : "See your own brand in the seal"
                }
                placeholder={locale === "nl" ? "Voer uw merk in" : "Enter your brand"}
                action={locale === "nl" ? "Registreer het merk" : "See it registered"}
                confirm={
                  locale === "nl"
                    ? "{brand} \u2014 uw merk, in vakkundige handen."
                    : "{brand} \u2014 your mark, in qualified hands."
                }
              />
            </div>
          </div>
        </div>

        {/* Credential register — structural vertical rules, not a meta-dot string */}
        <div className="relative border-t border-sand-50/12 bg-plum-950/40">
          <div className="container-x">
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {credentials.map((c, i) => (
                <div
                  key={i}
                  className={[
                    "py-6",
                    i % 2 === 1 ? "" : "border-r border-sand-50/12",
                    "lg:border-r lg:last:border-r-0",
                    i < 2 ? "border-b border-sand-50/12 lg:border-b-0" : "",
                    "pl-0 pr-4 lg:pl-6",
                  ].join(" ")}
                >
                  <dt className="text-[0.74rem] font-semibold tracking-wide text-sand-200/50">
                    {c.k}
                  </dt>
                  <dd className="mt-1 font-serif text-[1.35rem] font-semibold text-gold-300">
                    {c.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- USP ---------------- */}
      <Section>
        <SectionHeading
          label={usp.heading}
          title={locale === "nl" ? "Waarom cli\u00EBnten wereldwijd op ons bouwen." : "Why clients worldwide rely on us."}
        />
        <div className="mt-14">
          <USPGrid items={usp.items} />
        </div>
      </Section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="border-y border-plum-100 bg-paper py-section">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading label={services.heading} title={services.closing} />
            <Link href={localePath(locale, "services")} className="link-gold self-start pb-1 md:self-auto">
              {locale === "nl" ? "Alle diensten bekijken" : "View all services"}
            </Link>
          </div>
          <div className="mt-12">
            <ServicesGrid items={services.items} />
          </div>
        </div>
      </section>

      {/* ---------------- CASE STUDIES ---------------- */}
      <Section>
        <SectionHeading
          label={locale === "nl" ? "Praktijk" : "Track record"}
          title={cases.heading}
        />
        <div className="mt-12 border-t border-plum-200">
          {cases.items.map((c, i) => (
            <div
              key={i}
              className="grid gap-3 border-b border-plum-200 py-8 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-3">
                <span className="font-serif text-[1.1rem] font-semibold italic text-gold-700">
                  {c.label}
                </span>
              </div>
              <p className="text-[1.05rem] leading-relaxed text-ink-600 md:col-span-9">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-between gap-4">
          <Tagline text={dict.tagline} variant="quiet" />
          <Link href={localePath(locale, "caseStudies")} className="link-gold">
            {locale === "nl" ? "Meer praktijkvoorbeelden" : "More case studies"}
          </Link>
        </div>
      </Section>

      <CTASection locale={locale} dict={dict} />
    </>
  );
}
