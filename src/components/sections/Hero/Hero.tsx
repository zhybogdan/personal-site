"use client";

import { useEffect } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import Typed from "typed.js";

import { siteConfig } from "@/config/site";
import ProfileImage from "@/components/ui/ProfileImage/ProfileImage";
import { animateIt } from "@/lib/animate";
import { cn } from "@/lib/cn";
import styles from "./hero.module.scss";

const TYPED_STRINGS = [
  "landing page",
  "многостраничные",
  "каталоги",
  "корпоративные",
  "квизы",
  "визитки",
  "порталы",
];

export default function Hero() {
  useEffect(() => {
    const typed = new Typed("#js-typed-init", {
      strings: TYPED_STRINGS,
      loop: true,
      typeSpeed: 80,
      backSpeed: 50,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    animateIt(e);
  };

  return (
    <div className={styles.home}>
      <div className={styles.home_wrapp}>
        <ProfileImage />
        <div className={styles.maininfo}>
          <h2 className={styles.maininfo_name}>{siteConfig.name}</h2>
          <h3 className={styles.maininfo_type}>{siteConfig.role}</h3>
          <div className={styles.maininfo_desc}>
            <p className={styles.maininfo_text}>Привет человечество!</p>
            <p className={styles.maininfo_text}>
              Я есть веб-разработчик с опытом больше 3+ лет.
              <br />
              Разрабатываю <span id="js-typed-init"></span> сайты и т.д.
              <br />
              Полный цикл работ, от идеи до реализации и поддержки.
            </p>
            <p className={styles.maininfo_text}>
              Работаю с предпринимателями и менеджерами компаний, которые хотят
              найти новых клиентов, представить себя как современную и успешную
              компанию, использовать новый вид рекламы или же просто обновить
              свой старый сайт с дизайном из 90-х.
            </p>
          </div>
          <div className={styles.maininfo_buttons}>
            <Link
              className={cn(styles.maininfo_btn, "m-button", "hover-cursor")}
              href="/portfolio"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseMove}
            >
              Портфолио
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
