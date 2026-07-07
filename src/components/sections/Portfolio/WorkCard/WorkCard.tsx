import { useLocale, useTranslations } from "next-intl";

import type { Work } from "@content";
import styles from "./workCard.module.scss";

export default function WorkCard({ data }: { data: Work }) {
  const locale = useLocale() as "en" | "uk";
  const t = useTranslations("a11y");

  const title = data.title[locale];
  const firstWord = data.firstWord[locale];
  const type = data.type[locale];
  const typesofwork = data.typesofwork[locale];

  // Comma-separated string → trimmed list. Show up to 5; if more, a "+N" chip
  // hints at the rest without crowding the card.
  const MAX_TECHS = 5;
  const techs = data.technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);
  const shownTechs = techs.slice(0, MAX_TECHS);
  const extraTechs = techs.length - shownTechs.length;

  return (
    <div className={styles.portfolitm} data-reveal>
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.portfolitm_link}
      >
        <span
          className={`hover-cursor ${styles.portfolitm_link_title}`}
          data-text={firstWord}
        >
          {title}
        </span>
        <div className={styles.portfolitm_info}>
          / <span>{type}</span>
          {" — "}
          <span>{typesofwork}</span>
        </div>
        <span className="sr-only"> ({t("opensInNewTab")})</span>
      </a>
      {shownTechs.length > 0 && (
        <ul className={styles.portfolitm_techs}>
          {shownTechs.map((tech) => (
            <li className={styles.tech} key={tech}>
              {tech}
            </li>
          ))}
          {extraTechs > 0 && (
            <li className={`${styles.tech} ${styles.techMore}`}>
              +{extraTechs}
            </li>
          )}
        </ul>
      )}
      <div
        className={styles.portpreview}
        style={{
          backgroundImage: `url('/assets/portfolio/${data.image}')`,
        }}
      ></div>
    </div>
  );
}
