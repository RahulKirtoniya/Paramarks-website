import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Primitives";

const LAST_UPDATED = "January 2026";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<Metadata> {
    if (!isLocale(params.locale)) return {};
    const nl = params.locale === "nl";
    return buildMetadata({
        locale: params.locale,
        route: "/privacy",
        meta: {
            title: nl ? "Privacybeleid | Paramarks PC" : "Privacy Policy | Paramarks PC",
            description: nl
                ? "Hoe Paramarks PC omgaat met uw gegevens: welke informatie wij verzamelen, waarvoor en welke rechten u heeft."
                : "How Paramarks PC handles your data: what we collect, why, and the rights you have.",
            keywords: nl ? ["privacybeleid", "gegevensbescherming"] : ["privacy policy", "data protection"],
        },
    });
}

type Sec = { heading: string; body: string[] };

function content(nl: boolean): { intro: string; sections: Sec[] } {
    if (nl) {
        return {
            intro:
                "Paramarks PC hecht waarde aan uw privacy. Dit beleid legt uit welke persoonsgegevens wij verzamelen wanneer u onze website gebruikt of contact met ons opneemt, waarvoor wij deze gebruiken en welke rechten u heeft.",
            sections: [
                {
                    heading: "Gegevens die wij verzamelen",
                    body: [
                        "Wanneer u ons contactformulier invult of ons benadert via e-mail of WhatsApp, verwerken wij de gegevens die u verstrekt, zoals uw naam, bedrijf, e-mailadres, land en de inhoud van uw bericht.",
                        "Daarnaast verzamelen wij beperkte technische gegevens die uw browser automatisch verstuurt, zoals uw IP-adres en algemene gebruiksstatistieken, om de website te beveiligen en te verbeteren.",
                    ],
                },
                {
                    heading: "Waarvoor wij gegevens gebruiken",
                    body: [
                        "Wij gebruiken uw gegevens uitsluitend om op uw vraag te reageren, onze diensten te verlenen, wettelijke verplichtingen na te komen en de werking van de website te verbeteren.",
                        "Als advocatenkantoor behandelen wij alle correspondentie met de gepaste vertrouwelijkheid.",
                    ],
                },
                {
                    heading: "Delen met derden",
                    body: [
                        "Wij verkopen uw gegevens niet. Wij delen gegevens uitsluitend met dienstverleners die ons ondersteunen bij het beheer van de website en e-mail, of wanneer dit wettelijk vereist is.",
                    ],
                },
                {
                    heading: "Bewaring",
                    body: [
                        "Wij bewaren uw gegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld, of zolang de wet dit vereist.",
                    ],
                },
                {
                    heading: "Cookies en analyse",
                    body: [
                        "De website kan gebruikmaken van functionele en analytische cookies om het gebruik te meten en de ervaring te verbeteren. U kunt cookies beheren via de instellingen van uw browser.",
                    ],
                },
                {
                    heading: "Uw rechten",
                    body: [
                        "U heeft het recht op inzage, correctie en verwijdering van uw persoonsgegevens. Neem hiervoor contact met ons op.",
                    ],
                },
                {
                    heading: "Beveiliging",
                    body: [
                        "Wij nemen passende maatregelen om uw gegevens te beschermen tegen verlies en ongeoorloofde toegang.",
                    ],
                },
                {
                    heading: "Wijzigingen en contact",
                    body: [
                        "Wij kunnen dit beleid van tijd tot tijd aanpassen. Voor vragen over dit privacybeleid kunt u contact met ons opnemen via " +
                        site.contact.email +
                        ".",
                    ],
                },
            ],
        };
    }
    return {
        intro:
            "Paramarks PC respects your privacy. This policy explains what personal data we collect when you use our website or contact us, why we use it, and the rights you have.",
        sections: [
            {
                heading: "Information we collect",
                body: [
                    "When you complete our contact form or reach us by email or WhatsApp, we process the details you provide — such as your name, company, email address, country, and the content of your message.",
                    "We also collect limited technical data your browser sends automatically, such as your IP address and general usage statistics, to keep the website secure and to improve it.",
                ],
            },
            {
                heading: "How we use your information",
                body: [
                    "We use your information solely to respond to your inquiry, provide our services, meet legal obligations, and improve how the website works.",
                    "As a law firm, we treat all correspondence with the appropriate confidentiality.",
                ],
            },
            {
                heading: "Sharing with third parties",
                body: [
                    "We do not sell your data. We share it only with service providers who help us operate the website and email, or where required by law.",
                ],
            },
            {
                heading: "Retention",
                body: [
                    "We keep your data no longer than necessary for the purposes for which it was collected, or as required by law.",
                ],
            },
            {
                heading: "Cookies and analytics",
                body: [
                    "The website may use functional and analytics cookies to measure usage and improve the experience. You can manage cookies through your browser settings.",
                ],
            },
            {
                heading: "Your rights",
                body: [
                    "You have the right to access, correct, and delete your personal data. Contact us to exercise these rights.",
                ],
            },
            {
                heading: "Security",
                body: [
                    "We take appropriate measures to protect your data against loss and unauthorized access.",
                ],
            },
            {
                heading: "Changes and contact",
                body: [
                    "We may update this policy from time to time. For questions about this privacy policy, contact us at " +
                    site.contact.email +
                    ".",
                ],
            },
        ],
    };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
    if (!isLocale(params.locale)) notFound();
    const locale = params.locale as Locale;
    const nl = locale === "nl";
    const { intro, sections } = content(nl);

    return (
        <>
            <PageHero
                eyebrow={nl ? "Juridisch" : "Legal"}
                headline={nl ? "Privacybeleid" : "Privacy Policy"}
                subline={intro}
            />
            <Section>
                <div className="max-w-prose">
                    <p className="text-sm text-ink-400">
                        {nl ? "Laatst bijgewerkt: " : "Last updated: "}
                        {LAST_UPDATED}
                    </p>
                    <div className="mt-10 space-y-12">
                        {sections.map((s, i) => (
                            <div key={i}>
                                <h2 className="font-serif text-[1.5rem] font-semibold text-plum-700">{s.heading}</h2>
                                <div className="mt-4 space-y-4">
                                    {s.body.map((p, j) => (
                                        <p key={j} className="text-[1.02rem] leading-relaxed text-ink-600">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
}