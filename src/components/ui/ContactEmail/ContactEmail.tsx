"use client";

import { siteConfig } from "@/config/site";
import { useCopyEmail } from "@/lib/useCopyEmail";
import { cn } from "@/lib/cn";
import styles from "./contactEmail.module.scss";

type ContactEmailProps = {
  label: string;
  copiedLabel: string;
};

export default function ContactEmail({
  label,
  copiedLabel,
}: ContactEmailProps) {
  const { copied, copyEmail } = useCopyEmail();

  return (
    <div className={styles.somelink}>
      <h4>{label}</h4>
      <span className={styles.linkWrap}>
        <a
          className="hover-cursor"
          href={`mailto:${siteConfig.email}`}
          onClick={copyEmail}
        >
          {siteConfig.email}
        </a>
        <span
          className={cn(styles.copied, copied && styles.copiedShow)}
          aria-live="polite"
        >
          {copied ? copiedLabel : ""}
        </span>
      </span>
    </div>
  );
}
