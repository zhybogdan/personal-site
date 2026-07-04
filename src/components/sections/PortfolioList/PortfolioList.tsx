import { useTranslations } from "next-intl";
import { works } from "@content";

import WorkCard from "./WorkCard";
import styles from "./portfoliolist.module.scss";

export default function PortfolioList() {
  const t = useTranslations("portfolio");
  const items = [...works].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.porfolio}>
      <div>
        <h2 className={styles.porfolio_title}>{t("title")}</h2>
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
