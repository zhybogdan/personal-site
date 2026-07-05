import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

const routes = ["", "/portfolio"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${base}/${l}${route}`]),
        ),
      },
    })),
  );
}
