import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import styles from "./logo.module.scss";

export default function Logo({ label }: { label?: string }) {
  return (
    <Link
      href="/"
      aria-label={label}
      className={cn(styles.logo, "hover-cursor")}
    >
      {/* Monogram: bold "b" + a red signature dot. Decorative — the accessible
          name comes from aria-label, so the mark itself is hidden from SR. */}
      <span className={styles.mark} aria-hidden="true">
        b<span className={styles.dot}>.</span>
      </span>
    </Link>
  );
}
