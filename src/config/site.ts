export type NavItem = { name: string; href: string };
export type SocialItem = {
  name: string;
  href: string;
  icon: "telegram" | "linkedin";
};

export const siteConfig = {
  name: "Богдан",
  role: "Freelancer | Frontend / Web Developer",
  url: "https://bogdan.starcoding.top",
  email: "zhylkobogdan@gmail.com",
  slogan: "Разработка сайтов под ключ",

  seo: {
    title: "Богдан | Разработка сайтов под ключ",
    description: "Разработка реактивных сайтов под ключ",
    keywords: [
      "Создание продающих сайтов",
      "создание сайта с нуля",
      "создание и продвижение сайтов",
      "создание интернет сайта",
      "wordpress",
      "создание сайтов под ключ",
      "стоимость создания сайта",
      "заказать создание сайта",
      "заказать лендинг пейдж",
      "заказать landing page",
      "Разработка Landing page",
    ],
    ogTitle: "Разработка реактивных сайтов под ключ",
    ogDescription: "Разработка сайтов под ключ от маркетинга до деплоя",
    ogImage: "/image-preview.png",
    locale: "ru_RU",
  },

  nav: [
    { name: "Главная", href: "/" },
    { name: "Портфолио", href: "/portfolio" },
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
