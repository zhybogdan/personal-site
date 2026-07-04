import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import styles from "./notfound.module.scss";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className={styles.nomatch}>
      <div>
        <div>
          <h2 className={styles.nomatch_title}>{t("title")}</h2>
          <p className={styles.nomatch_text}>
            {t.rich("back", {
              link: (chunks: ReactNode) => (
                <Link href="/" className={styles.nomatch_linkhome}>
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
