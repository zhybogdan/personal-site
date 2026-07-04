"use client";

import { useEffect } from "react";
import type { MouseEvent } from "react";
import Typed from "typed.js";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import ProfileImage from "@/components/ui/ProfileImage/ProfileImage";
import { animateIt } from "@/lib/animate";
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

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    animateIt(e);
  };

  return (
    <div className={styles.home}>
      <div className={styles.home_wrapp}>
        <ProfileImage alt={t("photoAlt")} />
        <div className={styles.maininfo}>
          <h2 className={styles.maininfo_name}>{t("name")}</h2>
          <h3 className={styles.maininfo_type}>{t("role")}</h3>
          <div className={styles.maininfo_desc}>
            <p className={styles.maininfo_text}>{t("greeting")}</p>
            <p className={styles.maininfo_text}>
              {t("introExperience")}
              <br />
              {t.rich("introBuild", {
                typed: () => <span id="js-typed-init"></span>,
              })}
              <br />
              {t("introCycle")}
            </p>
            <p className={styles.maininfo_text}>{t("introClients")}</p>
          </div>
          <div className={styles.maininfo_buttons}>
            <Link
              className={cn(styles.maininfo_btn, "m-button", "hover-cursor")}
              href="/portfolio"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseMove}
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
