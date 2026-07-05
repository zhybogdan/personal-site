"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Nav from "@/components/layout/Nav/Nav";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./appShell.module.scss";

export default function AppShell({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(wrapperRef.current, {
        duration: 1,
        autoAlpha: 0,
        ease: "none",
        delay: 0.5,
      });
    },
    { scope: wrapperRef },
  );

  const handleNavigation = () => setIsOpen((open) => !open);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <Sidebar handleNavigation={handleNavigation} isOpen={isOpen} />
        <div className={styles.main}>{children}</div>
        <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
        <Footer />
      </div>
    </div>
  );
}
