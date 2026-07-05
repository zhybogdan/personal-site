"use client";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button/Button";
import { cn } from "@/lib/cn";
import styles from "./heroActions.module.scss";

export default function HeroActions() {
  const t = useTranslations("hero");

  return (
    <div className={styles.actions}>
      <Button href="/portfolio" magnetic>
        {t("cta")}
      </Button>
      <a
        className={cn(styles.contact, "hover-cursor")}
        href={`mailto:${siteConfig.email}`}
      >
        {t("ctaContact")}
      </a>
    </div>
  );
}
