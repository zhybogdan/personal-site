import Link from "next/link";

import styles from "./notfound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.nomatch}>
      <div>
        <div>
          <h2 className={styles.nomatch_title}>
            К сожалению такой страницы не существует
          </h2>
          <p className={styles.nomatch_text}>
            Вернуться на{" "}
            <Link href="/" className={styles.nomatch_linkhome}>
              главную
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
