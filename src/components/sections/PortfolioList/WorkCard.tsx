import type { Work } from "@content";

import styles from "./portfoliolist.module.scss";

export default function WorkCard({ data }: { data: Work }) {
  const { type, title, firstWord, typesofwork, image, link } = data;

  return (
    <div className={styles.portfolitm}>
      <a
        href={link}
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
        style={{ backgroundImage: `url('/assets/portfolio/${image}')` }}
      ></div>
    </div>
  );
}
