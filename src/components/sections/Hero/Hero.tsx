"use client";

import { useEffect } from "react";
import Typed from "typed.js";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import ProfileImage from "@/components/ui/ProfileImage/ProfileImage";
import Button from "@/components/ui/Button/Button";
import Tag from "@/components/ui/Tag/Tag";
import { cn } from "@/lib/cn";
import styles from "./hero.module.scss";

export default function Hero() {
  const t = useTranslations("hero");

  useEffect(() => {
    const typed = new Typed("#js-typed-init", {
      strings: t.raw("typed") as string[],
      loop: true,
      typeSpeed: 80,
      backSpeed: 50,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, [t]);

  return (
    <div className={styles.home}>
      <div className={styles.home_wrapp}>
        <ProfileImage alt={t("photoAlt")} />
        <div className={styles.maininfo}>
          <h2 className={styles.maininfo_name}>{t("name")}</h2>
          <h3 className={styles.maininfo_type}>{t("role")}</h3>

          <ul className={styles.maininfo_stack}>
            {siteConfig.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </ul>

          <div className={styles.maininfo_desc}>
            <p className={styles.maininfo_text}>{t("greeting")}</p>
            <p className={styles.maininfo_text}>
              {t.rich("introBuild", {
                typed: () => <span id="js-typed-init"></span>,
              })}
              <br />
              {t("introExperience")}
            </p>
            <p className={styles.maininfo_text}>{t("introApproach")}</p>
          </div>

          <div className={styles.maininfo_buttons}>
            <Button href="/portfolio" magnetic>
              {t("cta")}
            </Button>
            <a
              className={cn(styles.maininfo_contact, "hover-cursor")}
              href={`mailto:${siteConfig.email}`}
            >
              {t("ctaContact")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
