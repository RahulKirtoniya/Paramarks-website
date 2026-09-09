export type IconName =
  | "university"
  | "globe"
  | "magnifier"
  | "clock"
  | "scales"
  | "shield";

export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
}

export interface Dictionary {
  meta: {
    home: PageMeta;
    about: PageMeta;
    team: PageMeta;
    services: PageMeta;
    caseStudies: PageMeta;
    faq: PageMeta;
    contact: PageMeta;
  };
  nav: {
    home: string;
    about: string;
    team: string;
    services: string;
    caseStudies: string;
    faq: string;
    contact: string;
    cta: string;
    languageLabel: string;
  };
  tagline: string;
  cta: {
    contact: string;
    consultation: string;
    protectHeadline: string;
    sendMessage: string;
  };
  home: {
    hero: { eyebrow: string; headline: string; subline: string; impact: string };
    usp: {
      heading: string;
      items: { icon: IconName; title: string; text: string }[];
    };
    services: {
      heading: string;
      closing: string;
      items: { title: string; text: string }[];
    };
    cases: {
      heading: string;
      items: { label: string; text: string }[];
    };
  };
  about: {
    hero: { headline: string; subline: string };
    intro: { heading: string; body: string; memberships: string };
    mission: { label: string; body: string };
    stats: { value: string; label: string }[];
  };
  team: {
    hero: { headline: string; subline: string };
    members: {
      name: string;
      role: string;
      credentials: string;
      bio: string;
      icon: IconName;
    }[];
    supporting: { title: string; text: string };
  };
  services: {
    hero: { headline: string; subline: string };
    grid: { title: string; text: string }[];
    supporting: { title: string; text: string };
  };
  caseStudies: {
    hero: { headline: string; subline: string };
    items: {
      area: string;
      icon: IconName;
      title: string;
      text: string;
      highlight?: boolean;
    }[];
  };
  faq: {
    hero: { headline: string; subline: string };
    items: { q: string; a: string }[];
  };
  contact: {
    hero: { headline: string; subline: string };
    form: {
      name: string;
      company: string;
      email: string;
      country: string;
      message: string;
      submit: string;
      success: string;
      required: string;
      invalidEmail: string;
    };
    details: {
      heading: string;
      emailLabel: string;
      phoneLabel: string;
      addressLabel: string;
    };
  };
  footer: {
    tagline: string;
    subTagline: string;
    membership: string;
    nav: string;
    contact: string;
    rights: string;
    localCta: string;
  };
}
