import type { ReactNode } from "react";

import styles from "./tag.module.scss";

export default function Tag({ children }: { children: ReactNode }) {
  return <li className={styles.tag}>{children}</li>;
}
