import type { ReactNode } from "react";
import { FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import styles from "./socialLinks.module.scss";

const icons: Record<string, ReactNode> = {
  telegram: <FaTelegramPlane />,
  linkedin: <FaLinkedinIn />,
};

export default function SocialLinks() {
  const t = useTranslations("a11y");

  return (
    <div className={styles.social}>
      {siteConfig.socials.map((item) => (
        <a
          href={item.href}
          className={cn(styles.social_link, "hover-cursor")}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
          aria-label={`${item.name}, ${t("opensInNewTab")}`}
          key={item.name}
        >
          {icons[item.icon]}
        </a>
      ))}
    </div>
  );
}
