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
    route: "/terms",
    meta: {
      title: nl ? "Algemene voorwaarden | Paramarks PC" : "Terms & Conditions | Paramarks PC",
      description: nl
        ? "De voorwaarden voor het gebruik van de website van Paramarks PC."
        : "The terms that govern your use of the Paramarks PC website.",
      keywords: nl ? ["algemene voorwaarden"] : ["terms and conditions", "terms of use"],
    },
  });
}

type Sec = { heading: string; body: string[] };

function content(nl: boolean): { intro: string; sections: Sec[] } {
  if (nl) {
    return {
      intro:
        "Door deze website te gebruiken, gaat u akkoord met de onderstaande voorwaarden. Lees ze zorgvuldig door.",
      sections: [
        {
          heading: "Geen juridisch advies",
          body: [
            "De informatie op deze website is uitsluitend van algemene aard en vormt geen juridisch advies. Aan de inhoud kunnen geen rechten worden ontleend.",
            "Het gebruik van deze website of het versturen van een bericht schept geen advocaat-cliëntrelatie. Een dergelijke relatie ontstaat pas na een uitdrukkelijke, schriftelijke opdrachtbevestiging.",
          ],
        },
        {
          heading: "Gebruik van de website",
          body: [
            "U mag de website gebruiken voor rechtmatige doeleinden. Het is niet toegestaan de website te gebruiken op een wijze die schade kan toebrengen aan Paramarks PC, andere gebruikers of derden.",
          ],
        },
        {
          heading: "Intellectueel eigendom",
          body: [
            "Alle inhoud op deze website, waaronder teksten, vormgeving, logo's en merken, is eigendom van Paramarks PC of haar licentiegevers en is beschermd. Verveelvoudiging zonder voorafgaande toestemming is niet toegestaan.",
          ],
        },
        {
          heading: "Links van derden",
          body: [
            "De website kan verwijzingen naar websites van derden bevatten. Paramarks PC is niet verantwoordelijk voor de inhoud of het beleid van die websites.",
          ],
        },
        {
          heading: "Aansprakelijkheid",
          body: [
            "De website wordt aangeboden 'zoals hij is'. Hoewel wij streven naar juistheid, aanvaardt Paramarks PC geen aansprakelijkheid voor eventuele onjuistheden of voor schade die voortvloeit uit het gebruik van de website.",
          ],
        },
        {
          heading: "Toepasselijk recht",
          body: [
            "Op deze voorwaarden is het recht van Suriname van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Suriname.",
          ],
        },
        {
          heading: "Wijzigingen en contact",
          body: [
            "Wij kunnen deze voorwaarden van tijd tot tijd wijzigen. Voor vragen kunt u contact met ons opnemen via " +
              site.contact.email +
              ".",
          ],
        },
      ],
    };
  }
  return {
    intro:
      "By using this website, you agree to the terms below. Please read them carefully.",
    sections: [
      {
        heading: "No legal advice",
        body: [
          "The information on this website is general in nature and does not constitute legal advice. No rights can be derived from its content.",
          "Using this website or sending a message does not create an attorney-client relationship. Such a relationship arises only after an express, written engagement.",
        ],
      },
      {
        heading: "Use of the website",
        body: [
          "You may use the website for lawful purposes only. You may not use it in any way that could harm Paramarks PC, other users, or third parties.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "All content on this website — including text, design, logos, and marks — is owned by Paramarks PC or its licensors and is protected. Reproduction without prior permission is not permitted.",
        ],
      },
      {
        heading: "Third-party links",
        body: [
          "The website may contain links to third-party sites. Paramarks PC is not responsible for the content or policies of those sites.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "The website is provided \u201Cas is.\u201D While we aim for accuracy, Paramarks PC accepts no liability for any inaccuracies or for damages arising from use of the website.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of Suriname. Any disputes will be submitted to the competent court in Suriname.",
        ],
      },
      {
        heading: "Changes and contact",
        body: [
          "We may update these terms from time to time. For questions, contact us at " + site.contact.email + ".",
        ],
      },
    ],
  };
}

export default function TermsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const nl = locale === "nl";
  const { intro, sections } = content(nl);

  return (
    <>
      <PageHero
        eyebrow={nl ? "Juridisch" : "Legal"}
        headline={nl ? "Algemene voorwaarden" : "Terms & Conditions"}
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
