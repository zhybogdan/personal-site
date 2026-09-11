"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import ProfileImage from "@/components/ui/ProfileImage/ProfileImage";
import { useReveal } from "@/lib/useReveal";
import StackList from "./StackList";
import HeroActions from "./HeroActions";
import Typewriter from "./Typewriter";
import styles from "./hero.module.scss";

export default function Hero() {
  const t = useTranslations("hero");
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div className={styles.home} ref={rootRef}>
      <div className={styles.home_wrapp}>
        <ProfileImage alt={t("photoAlt")} />
        <div className={styles.maininfo} data-reveal>
          <h1 className={styles.maininfo_headline}>{t("headline")}</h1>
          <p className={styles.maininfo_type}>{t("role")}</p>

          <StackList items={siteConfig.stack} more={t("stackMore")} />

          <div className={styles.maininfo_desc}>
            <p className={styles.maininfo_text}>{t("greeting")}</p>
            <p className={styles.maininfo_text}>
              {t.rich("introBuild", {
                typed: () => <Typewriter words={t.raw("typed") as string[]} />,
              })}
              <br />
              {t("introExperience")}
            </p>
            <p className={styles.maininfo_text}>{t("introApproach")}</p>
          </div>

          <HeroActions />
        </div>
      </div>
    </div>
  );
}
