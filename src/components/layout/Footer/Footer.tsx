import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import styles from "./footer.module.scss";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_wrapp}>
        <p className={styles.footer_slog}>
          {t.rich("slogan", {
            b: (chunks: ReactNode) => <span>{chunks}</span>,
          })}
        </p>
        <p className={styles.footer_copy}>
          {t("rights", { year: String(new Date().getFullYear()) })}
        </p>
      </div>
    </footer>
  );
}
