import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/getDictionary";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import { Section, Tagline } from "@/components/Primitives";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({ locale: params.locale, route: "/contact", meta: dict.meta.contact });
}

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const { hero, form, details } = dict.contact;

  return (
    <>
      <PageHero
        eyebrow={locale === "nl" ? "Contact" : "Contact"}
        headline={hero.headline}
        subline={hero.subline}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm dict={form} />
          </div>

          {/* Details */}
          <aside className="lg:col-span-5 lg:pl-8">
            <div className="rounded-panel border border-plum-200 bg-paper p-8 shadow-card">
              <h2 className="text-title font-serif text-plum-700">{details.heading}</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-medium text-ink-400">{details.emailLabel}</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-plum-700 hover:text-gold-600"
                    >
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-ink-400">{details.phoneLabel}</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                      className="text-plum-700 hover:text-gold-600"
                    >
                      {site.contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-ink-400">{details.addressLabel}</dt>
                  <dd className="mt-1 text-ink-600">
                    {site.contact.address.city}, {site.contact.address.country}
                  </dd>
                </div>
              </dl>
              <div className="mt-8 border-t border-plum-100 pt-6">
                <Tagline text={dict.tagline} />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <CTASection locale={locale} dict={dict} />
    </>
  );
}
