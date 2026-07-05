import { useLocale } from "next-intl";

import type { Work } from "@content";
import styles from "./workCard.module.scss";

export default function WorkCard({ data }: { data: Work }) {
  const locale = useLocale() as "en" | "uk";

  const title = data.title[locale];
  const firstWord = data.firstWord[locale];
  const type = data.type[locale];
  const typesofwork = data.typesofwork[locale];

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
          {" | "}
          <span>{typesofwork}</span>
        </div>
      </a>
      <div
        className={styles.portpreview}
        style={{
          backgroundImage: `url('/assets/portfolio/${data.image}')`,
        }}
      ></div>
    </div>
  );
}
