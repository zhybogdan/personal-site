export type NavItem = { key: "home" | "portfolio"; href: string };
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

  nav: [
    { key: "home", href: "/" },
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
