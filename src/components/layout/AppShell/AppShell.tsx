"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Nav from "@/components/layout/Nav/Nav";
import Footer from "@/components/layout/Footer/Footer";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import styles from "./appShell.module.scss";

export default function AppShell({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("a11y");

  // The open mobile menu already locks the body; pausing here keeps Lenis
  // from animating a scroll that can no longer happen.
  useSmoothScroll(isOpen);

  const handleNavigation = () => setIsOpen((open) => !open);

  return (
    <div className={styles.container}>
      <a href="#main-content" className={styles.skipLink}>
        {t("skipToContent")}
      </a>
      <div className={styles.wrapper}>
        <Sidebar handleNavigation={handleNavigation} isOpen={isOpen} />
        <main id="main-content" className={styles.main} tabIndex={-1}>
          {children}
        </main>
        <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
        <Footer />
      </div>
    </div>
  );
}
