export type NavItem = { key: "home" | "about" | "portfolio"; href: string };
export type ExperienceItem = { key: "web" | "mobile"; value: string };
export type SocialItem = {
  name: string;
  href: string;
  icon: "telegram" | "linkedin";
};

// Structural, language-neutral config. All display text lives in messages/*.
export const siteConfig = {
  url: "https://shipsharp.netlify.app",
  email: "zhylkobogdan@gmail.com",
  ogImage: "/image-preview.jpg",

  // Brand the site publishes under (OG siteName, PWA manifest, matches the
  // domain). Kept separate from `author`: the site has a brand, the work has
  // a person behind it.
  brand: "shipsharp",

  // Real person — used for the `authors` metadata field.
  author: "Bohdan Zhylko",

  // Featured tech (language-neutral proper nouns).
  stack: ["Flutter", "Dart", "React", "Next.js", "TypeScript"],

  // Skills grouped by area (About page). Language-neutral proper nouns.
  skills: {
    mobile: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Bloc",
      "Dio",
      "Retrofit",
      "shared_preferences",
      "Drift",
      "go_router",
      "get_it",
      "Freezed",
      "json_serializable",
      "Firebase",
      "Supabase",
    ],
    web: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Vite",
      "Node.js",
      "Tailwind CSS",
      "SCSS",
      "CSS Modules",
      "Styled Components",
      "Redux Toolkit",
      "Zustand",
      "React Query",
      "Zod",
      "React Hook Form",
      "React Router",
    ],
    tools: [
      "Git",
      "GitHub",
      "GitLab",
      "Figma",
      "REST APIs",
      "Postman",
      "GSAP",
      "Netlify",
      "ESLint",
      "Prettier",
      "Vitest",
      "Storybook",
      "Jira",
    ],
  },

  // Experience tracks (About page). `value` is a language-neutral duration;
  // the unit/label/description live in messages/*.
  experience: [
    { key: "web", value: "3+" },
    { key: "mobile", value: "1.5+" },
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
