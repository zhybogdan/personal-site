"use client";

import { useTranslations } from "next-intl";

import Logo from "@/components/ui/Logo/Logo";
import ContactEmail from "@/components/ui/ContactEmail/ContactEmail";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";
import styles from "./sidebar.module.scss";

type SidebarProps = {
  handleNavigation: () => void;
  isOpen: boolean;
};

export default function Sidebar({ handleNavigation, isOpen }: SidebarProps) {
  const t = useTranslations("sidebar");

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_wrapp}>
        <Logo />

        <button className={styles.menuBtn} onClick={handleNavigation}>
          {isOpen ? t("menuClose") : t("menuOpen")}
        </button>

        <div className={styles.sidebar_bottom}>
          <div>
            <ContactEmail label={t("emailLabel")} />
          </div>
          <div className={styles.sidebar_social}>
            <h4>{t("findMe")}</h4>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
