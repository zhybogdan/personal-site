export type NavItem = { key: "home" | "portfolio"; href: string };
export type SocialItem = {
  name: string;
  href: string;
  icon: "telegram" | "linkedin";
};

// Structural, language-neutral config. All display text lives in messages/*.
export const siteConfig = {
  url: "https://bogdan.starcoding.top",
  email: "zhylkobogdan@gmail.com",
  ogImage: "/image-preview.png",

  nav: [
    { key: "home", href: "/" },
    { key: "portfolio", href: "/portfolio" },
  ] as NavItem[],

  socials: [
    { name: "telegram", href: "https://t.me/molochnyk", icon: "telegram" },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/bogdanzhylko/",
      icon: "linkedin",
    },
  ] as SocialItem[],
} as const;

export type SiteConfig = typeof siteConfig;
