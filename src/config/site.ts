export type NavItem = { key: "home" | "about" | "portfolio"; href: string };
export type ExperienceItem = { key: "web" | "mobile"; value: string };
export type SocialItem = {
  name: string;
  href: string;
  icon: "telegram" | "linkedin";
};

// Structural, language-neutral config. All display text lives in messages/*.
export const siteConfig = {
  url: "https://justbogdan.netlify.app",
  email: "zhylkobogdan@gmail.com",
  ogImage: "/image-preview.png",

  // Brand / person name — used for OG siteName and metadata authors.
  author: "Bohdan Zhylko",

  // Featured tech (language-neutral proper nouns).
  stack: ["Flutter", "Dart", "React", "Next.js", "TypeScript"],

  // Skills grouped by area (About page). Language-neutral proper nouns.
  skills: {
    mobile: ["Flutter", "Dart"],
    web: ["React", "Next.js", "TypeScript", "JavaScript", "SCSS"],
    tools: ["Git", "Figma", "REST APIs", "GSAP", "Netlify"],
  },

  // Experience tracks (About page). `value` is a language-neutral duration;
  // the unit/label/description live in messages/*.
  experience: [
    { key: "web", value: "3+" },
    { key: "mobile", value: "1.5" },
  ] as ExperienceItem[],

  nav: [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "portfolio", href: "/portfolio" },
  ] as NavItem[],

  socials: [
    { name: "telegram", href: "https://t.me/zhy_bogdan", icon: "telegram" },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/bogdanzhylko/",
      icon: "linkedin",
    },
  ] as SocialItem[],
} as const;

export type SiteConfig = typeof siteConfig;
