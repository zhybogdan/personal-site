import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "uk"],
  defaultLocale: "en",
  // Both locales are prefixed (/en, /uk); the middleware redirects "/"
  // to the visitor's browser language (falling back to the default).
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
