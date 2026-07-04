"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";
import { cn } from "@/lib/cn";

type SidebarProps = {
  handleNavigation: () => void;
  isOpen: boolean;
};

export default function Sidebar({ handleNavigation, isOpen }: SidebarProps) {
  const t = useTranslations("sidebar");

  return (
    <div className="sidebar">
      <div className="sidebar_wrapp">
        <Link href="/" className="logo hover-cursor">
          <span className="logo_el"></span>
          <span className="logo_el"></span>
          <span className="logo_el"></span>
        </Link>

        <button
          className={cn("navigation_btn", isOpen && "is-active")}
          onClick={handleNavigation}
        >
          {isOpen ? t("menuClose") : t("menuOpen")}
        </button>

        <div className="sidebar_bottom">
          <div className="sidebar_contact">
            <div className="sidebar_somelink">
              <h4>{t("emailLabel")}</h4>
              <a className="hover-cursor" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div className="sidebar_social">
            <h4>{t("findMe")}</h4>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
