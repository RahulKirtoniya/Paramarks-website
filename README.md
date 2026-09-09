# Paramarks PC — Website

Bilingual (English / Dutch) marketing website for **Paramarks PC**, a boutique
IP & trademark law firm in Suriname. Built with **Next.js 14 (App Router)**,
**TypeScript**, and **Tailwind CSS**, with SEO built in from the ground up.

Tagline throughout: _“Your brand in qualified hands.” / “Uw merk in vakkundige handen.”_

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /en or /nl)
```

Build & run production:

```bash
npm run build
npm run start
```

Before deploying, set your real domain in **`.env`** (copy from `.env.example`):

```
NEXT_PUBLIC_SITE_URL=https://www.paramarks.com
```

Canonical URLs, `hreflang` alternates and the sitemap all derive from this value.

---

## Languages (i18n)

- URLs are locale-prefixed: `/en/...` and `/nl/...`.
- `src/middleware.ts` redirects `/` to the best locale using the visitor’s
  `Accept-Language` header (falls back to English).
- All copy lives in typed dictionaries: `src/i18n/dictionaries/en.ts` and
  `nl.ts`. They share the `Dictionary` type in `types.ts`, so if you add a key to
  one language TypeScript forces you to add it to the other.
- The language switcher (top-right of the nav) swaps only the locale segment and
  keeps the visitor on the same page.

**To edit text:** change the two dictionary files. No component edits needed.
**To add a language:** add it to `locales` in `src/i18n/config.ts`, create a new
dictionary file, and register it in `src/lib/getDictionary.ts`.

---

## SEO — what’s included

| Feature | Where |
|---|---|
| Locale-prefixed indexable URLs | `src/middleware.ts`, `app/[locale]/…` |
| `hreflang` alternates (`en`, `nl`, `x-default`) + canonical per page | `src/lib/seo.ts` → `generateMetadata` on every page |
| Native localized `<title>` / meta description / keywords | `meta` block in each dictionary |
| Open Graph + Twitter cards, `og:locale` | `src/lib/seo.ts` |
| `LegalService` / Organization structured data | `src/components/JsonLd.tsx` |
| `FAQPage` structured data (rich results) | `app/[locale]/faq/page.tsx` |
| `sitemap.xml` with all localized URLs + alternates | `src/app/sitemap.ts` |
| `robots.txt` | `src/app/robots.ts` |
| Semantic headings, skip-link, keyboard focus, reduced-motion | layout + `globals.css` |

After deploy: submit `https://your-domain/sitemap.xml` in Google Search Console,
and set the business’s real NAP details in `src/lib/site.ts` (also powers the
structured data — keep it consistent with Google Business Profile).

---

## Design system

Defined once in `tailwind.config.ts`:

- **Purple** (`plum.*`) — headings, navigation, footer, hero/CTA bands.
- **Gold** (`gold.*`) — CTA buttons, icons, hairline accents (used sparingly).
- **Neutrals** (`sand.*`, `ink.*`) — backgrounds and body text.
- **Type** — _Fraunces_ (serif) for headings, _Manrope_ (sans) for body/UI.

### Fonts

Fonts load via a `<link>` to Google Fonts in `app/[locale]/layout.tsx`. To
**self-host** instead (better privacy + no layout shift): download the Fraunces
and Manrope `woff2` files into `src/app/fonts/`, switch to `next/font/local`, and
keep the same `--font-fraunces` / `--font-manrope` CSS variables — nothing else
changes.

---

## Project structure

```
src/
├── middleware.ts                 # locale detection + redirect
├── app/
│   ├── globals.css               # Tailwind layers, tokens, base styles
│   ├── robots.ts                 # robots.txt
│   ├── sitemap.ts                # sitemap.xml (all locales)
│   └── [locale]/
│       ├── layout.tsx            # <html lang>, fonts, nav, footer, JSON-LD
│       ├── page.tsx              # Home
│       ├── about/page.tsx
│       ├── team/page.tsx
│       ├── services/page.tsx
│       ├── case-studies/page.tsx
│       ├── faq/page.tsx
│       └── contact/page.tsx
├── components/
│   ├── Navbar.tsx  Footer.tsx  Wordmark.tsx  LanguageSwitcher.tsx
│   ├── PageHero.tsx  CTASection.tsx  Primitives.tsx  Sections.tsx
│   ├── FAQAccordion.tsx  ContactForm.tsx  JsonLd.tsx
│   └── icons/Icons.tsx
├── i18n/
│   ├── config.ts                 # locales, labels, hreflang codes
│   └── dictionaries/{en,nl,types}.ts
└── lib/
    ├── site.ts                   # business facts (NAP, memberships) for SEO
    ├── seo.ts                    # metadata + hreflang builder
    ├── getDictionary.ts
    └── paths.ts                  # locale-aware routing helpers
```

---

## Pages

Home · About · Team · Services · Case Studies · FAQ · Contact — each in EN and NL,
each with the recurring tagline, the Fortune 500 claim surfaced prominently, and
the in-house investigation-unit USP highlighted (Team + Case Studies).

---

## Notes & next steps

- **Contact form** currently opens the visitor’s mail client (front-end only).
  For production, POST to an API route or a service (Resend, Formspree, etc.);
  the submit handler in `src/components/ContactForm.tsx` is the single place to change.
- **Team photos** use styled placeholders — drop real portraits into the
  `TeamGrid` component in `src/components/Sections.tsx`.
- **Member logos (INTA / ASIPI)** render as text chips in the footer; swap for
  real SVG/PNG logos when available.
- Replace the placeholder phone/address in `src/lib/site.ts`.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint |
