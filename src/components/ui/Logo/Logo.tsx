import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import styles from "./logo.module.scss";

export default function Logo() {
  return (
    <Link href="/" className={cn(styles.logo, "hover-cursor")}>
      <span className={styles.logo_el}></span>
      <span className={styles.logo_el}></span>
      <span className={styles.logo_el}></span>
    </Link>
  );
}
