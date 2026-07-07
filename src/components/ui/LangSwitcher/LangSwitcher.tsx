"use client";

import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import styles from "./langSwitcher.module.scss";

// Short display labels per locale (avoids the "uk" = United Kingdom mix-up).
const labels: Record<string, string> = {
  en: "EN",
  uk: "UA",
};

// Accessible-name keys per locale (the visible "EN"/"UA" gives no context).
const switchKeys: Record<string, string> = {
  en: "switchToEn",
  uk: "switchToUk",
};

export default function LangSwitcher() {
  const pathname = usePathname();
  const active = useLocale();
  const t = useTranslations("a11y");

  return (
    <div className={styles.lang}>
      {routing.locales.map((locale, index) => (
        <Fragment key={locale}>
          {index > 0 && (
            <span className={styles.lang_sep} aria-hidden="true">
              ·
            </span>
          )}

          {locale === active ? (
            <span
              className={cn(styles.lang_link, styles.active)}
              aria-current="true"
              lang={locale}
            >
              {labels[locale] ?? locale.toUpperCase()}
            </span>
          ) : (
            <Link
              href={pathname}
              locale={locale}
              className={cn(styles.lang_link, "hover-cursor")}
              lang={locale}
              title={labels[locale] ?? locale.toUpperCase()}
              aria-label={t(switchKeys[locale] ?? "switchToEn")}
            >
              {labels[locale] ?? locale.toUpperCase()}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
}
