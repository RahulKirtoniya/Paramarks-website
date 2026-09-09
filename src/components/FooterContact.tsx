"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { localePath } from "@/lib/paths";
import { site } from "@/lib/site";
import ContactForm from "./ContactForm";

/**
 * Contact band shown at the top of the footer site-wide, turning every page
 * into a point of contact. The form sits on a light panel so it stays legible
 * against the dark footer. Hidden on the Contact page itself to avoid showing
 * the same form twice.
 */
export default function FooterContact({
    locale,
    dict,
}: {
    locale: Locale;
    dict: Dictionary;
}) {
    const pathname = usePathname();
    if (pathname === localePath(locale, "contact")) return null;

    const c = dict.contact;

    return (
        <div className="border-b border-sand-200/10">
            <div className="container-x py-16 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Invitation */}
                    <div className="lg:pt-2">
                        <p className="label label-light">{locale === "nl" ? "Contact" : "Contact"}</p>
                        <h2 className="mt-5 text-headline text-sand-50">{c.hero.headline}</h2>
                        <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-sand-200/75">
                            {c.hero.subline}
                        </p>

                        <div className="mt-8 space-y-2.5 text-sm">
                            <a
                                href={`mailto:${site.contact.email}`}
                                className="block text-sand-200/80 transition-colors hover:text-gold-300"
                            >
                                {site.contact.email}
                            </a>
                            <a
                                href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                                className="block text-sand-200/80 transition-colors hover:text-gold-300"
                            >
                                {site.contact.phone}
                            </a>
                            <p className="text-sand-200/60">
                                {site.contact.address.city}, {site.contact.address.country}
                            </p>
                        </div>

                        <p className="mt-7 font-serif text-lg italic text-gold-300">{dict.tagline}</p>
                    </div>

                    {/* Form on a light panel */}
                    <div className="rounded-panel border border-plum-100 bg-paper p-6 shadow-lift sm:p-8">
                        <ContactForm dict={c.form} />
                    </div>
                </div>
            </div>
        </div>
    );
}