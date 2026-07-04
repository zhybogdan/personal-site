import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

/**
 * Build canonical + hreflang alternates for a route across all locales.
 * `route` is the path without the locale prefix, e.g. "" or "/portfolio".
 */
export function localizedAlternates(locale: string, route = "") {
  const url = (l: string) => `${siteConfig.url}/${l}${route}`;

  return {
    canonical: url(locale),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])),
      "x-default": url(routing.defaultLocale),
    },
  };
}
