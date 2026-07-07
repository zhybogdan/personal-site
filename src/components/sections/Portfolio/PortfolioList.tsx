"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { works } from "@content";

import { useReveal } from "@/lib/useReveal";
import WorkCard from "./WorkCard/WorkCard";
import styles from "./portfolioList.module.scss";

export default function PortfolioList() {
  const t = useTranslations("portfolio");
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);
  const items = [...works].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.porfolio} ref={rootRef}>
      <div>
        <h1 className={styles.porfolio_title}>{t("title")}</h1>
        <div className={styles.porfolio_items}>
          <div className={styles.porfolio_list}>
            {items.map((item) => (
              <WorkCard key={item.slug} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
