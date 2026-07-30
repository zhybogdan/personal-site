import type { ReactNode } from "react";

import styles from "./tag.module.scss";

export default function Tag({
  children,
  muted = false,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <li className={`${styles.tag}${muted ? ` ${styles.tag_muted}` : ""}`}>
      {children}
    </li>
  );
}
