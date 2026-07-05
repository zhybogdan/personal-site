"use client";

import { useState, type ReactNode } from "react";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Nav from "@/components/layout/Nav/Nav";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./appShell.module.scss";

export default function AppShell({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = () => setIsOpen((open) => !open);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Sidebar handleNavigation={handleNavigation} isOpen={isOpen} />
        <div className={styles.main}>{children}</div>
        <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
        <Footer />
      </div>
    </div>
  );
}
