"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import Tag from "@/components/ui/Tag/Tag";
import HeroActions from "@/components/sections/Hero/HeroActions";
import { useReveal } from "@/lib/useReveal";
import styles from "./about.module.scss";

const STACK_GROUPS = ["mobile", "web", "tools"] as const;

export default function About() {
  const t = useTranslations("about");
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div className={styles.about} ref={rootRef}>
      <h1 className={styles.title}>{t("title")}</h1>

      {/* --- Intro --- */}
      <section className={styles.intro} data-reveal>
        <p className={styles.intro_lead}>{t("intro.heading")}</p>
        <p className={styles.intro_text}>{t("intro.p1")}</p>
        <p className={styles.intro_text}>{t("intro.p2")}</p>
        <p className={styles.intro_text}>{t("intro.p3")}</p>
      </section>

      {/* --- Experience tracks --- */}
      <section className={styles.block}>
        <h2 className={styles.block_heading} data-reveal>
          {t("experience.heading")}
        </h2>
        <div className={styles.tracks}>
          {siteConfig.experience.map((item) => (
            <div className={styles.track} key={item.key} data-reveal>
              <span className={styles.track_value}>
                {item.value}
                <span className={styles.track_unit}>
                  {t(`experience.${item.key}.unit`)}
                </span>
              </span>
              <div className={styles.track_body}>
                <p className={styles.track_label}>
                  {t(`experience.${item.key}.label`)}
                </p>
                <p className={styles.track_desc}>
                  {t(`experience.${item.key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Stack by category --- */}
      <section className={styles.block}>
        <h2 className={styles.block_heading} data-reveal>
          {t("stack.heading")}
        </h2>
        <div className={styles.groups}>
          {STACK_GROUPS.map((group) => (
            <div className={styles.group} key={group} data-reveal>
              <p className={styles.group_label}>{t(`stack.${group}`)}</p>
              <ul className={styles.group_tags}>
                {siteConfig.skills[group].map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* --- Principles --- */}
      <section className={styles.block}>
        <h2 className={styles.block_heading} data-reveal>
          {t("principles.heading")}
        </h2>
        <ol className={styles.principles}>
          {(t.raw("principles.items") as { title: string; text: string }[]).map(
            (item, i) => (
              <li className={styles.principle} key={item.title} data-reveal>
                <span className={styles.principle_num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className={styles.principle_title}>{item.title}</p>
                  <p className={styles.principle_text}>{item.text}</p>
                </div>
              </li>
            ),
          )}
        </ol>
      </section>

      {/* --- Beyond code --- */}
      <section className={styles.block}>
        <h2 className={styles.block_heading} data-reveal>
          {t("beyond.heading")}
        </h2>
        <p className={styles.beyond} data-reveal>
          {t("beyond.text")}
        </p>
      </section>

      {/* --- CTA (reuses the hero actions) --- */}
      <section className={styles.cta} data-reveal>
        <p className={styles.cta_line}>{t("ctaLine")}</p>
        <HeroActions />
      </section>
    </div>
  );
}
