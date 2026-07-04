"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.style.transform = "translate3d(-20px, -20px, 0)";

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList?.contains("hover-cursor")) {
        cursor.classList.add("app-cursor-hover");
      }

      const { clientX, clientY } = e;
      const mouseX = clientX - cursor.clientWidth / 2;
      const mouseY = clientY - cursor.clientHeight / 2;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList?.contains("hover-cursor")) {
        cursor.classList.remove("app-cursor-hover");
      }
    };

    const handleMouseLeave = () => cursor.classList.add("app-cursor-leave");
    const handleMouseEnter = () => cursor.classList.remove("app-cursor-leave");

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return <div className="app-cursor" ref={cursorRef}></div>;
}
