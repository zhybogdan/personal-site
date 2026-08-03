import type { Metadata } from "next";

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

/**
 * Open Graph card for a single route.
 *
 * Next merges metadata shallowly: a page that declares `openGraph` replaces the
 * layout's object outright rather than extending it. So every page builds the
 * whole card here — otherwise a child route silently loses the image, site name
 * and locale, or keeps the home page's title on its own URL.
 */
export function localizedOpenGraph({
  locale,
  route = "",
  title,
  description,
}: {
  locale: string;
  route?: string;
  title: string;
  description: string;
}): Metadata["openGraph"] {
  return {
    type: "website",
    url: `${siteConfig.url}/${locale}${route}`,
    title,
    description,
    siteName: siteConfig.brand,
    locale: locale === "uk" ? "uk_UA" : "en_US",
    images: [siteConfig.ogImage],
  };
}
