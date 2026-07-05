"use client";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button/Button";
import { useCopyEmail } from "@/lib/useCopyEmail";
import { cn } from "@/lib/cn";
import styles from "./heroActions.module.scss";

export default function HeroActions() {
  const t = useTranslations("hero");
  const { copied, copyEmail } = useCopyEmail();

  return (
    <div className={styles.actions}>
      <Button href="/portfolio" magnetic>
        {t("cta")}
      </Button>

      <span className={styles.contactWrap}>
        <a
          className={cn(styles.contact, "hover-cursor")}
          href={`mailto:${siteConfig.email}`}
          onClick={copyEmail}
        >
          {t("ctaContact")}
        </a>
        <span
          className={cn(styles.copied, copied && styles.copiedShow)}
          aria-live="polite"
        >
          {copied ? t("emailCopied") : ""}
        </span>
      </span>
    </div>
  );
}
