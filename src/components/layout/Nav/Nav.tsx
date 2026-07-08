"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";
import LangSwitcher from "@/components/ui/LangSwitcher/LangSwitcher";
import useScrollBlock from "@/lib/useScrollBlock";
import { cn } from "@/lib/cn";
import styles from "./nav.module.scss";

type NavProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Nav({ isOpen, setIsOpen }: NavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (isOpen) blockScroll();
    else allowScroll();
  }, [isOpen, blockScroll, allowScroll]);

  return (
    <div
      id="primary-nav"
      className={cn(styles.navigation, isOpen && styles["is-open-nav"])}
    >
      <nav className={styles.navigation_nav}>
        <ul className={styles.navigation_menu}>
          {siteConfig.nav.map((item) => (
            <li className={styles.navigation_menu_item} key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  styles.navigation_menu_link,
                  "hover-cursor",
                  pathname === item.href && styles.active,
                )}
                onClick={() => setIsOpen(false)}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.navigation_dopinfo}>
        <div className={styles.navigation_lang}>
          <LangSwitcher />
        </div>
        <SocialLinks />
      </div>
    </div>
  );
}
