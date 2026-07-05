import { siteConfig } from "@/config/site";
import styles from "./contactEmail.module.scss";

export default function ContactEmail({ label }: { label: string }) {
  return (
    <div className={styles.somelink}>
      <h4>{label}</h4>
      <a className="hover-cursor" href={`mailto:${siteConfig.email}`}>
        {siteConfig.email}
      </a>
    </div>
  );
}
