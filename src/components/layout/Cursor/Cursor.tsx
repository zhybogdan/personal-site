"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      // Hide off-screen until the first pointer move.
      gsap.set(cursor, { x: -100, y: -100 });

      const mm = gsap.matchMedia();

      // `duration` is the follow lag: eased trail for most users, instant
      // (0) when reduced motion is preferred.
      const setup = (duration: number) => {
        const xTo = gsap.quickTo(cursor, "x", { duration, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          xTo(e.clientX - cursor.offsetWidth / 2);
          yTo(e.clientY - cursor.offsetHeight / 2);

          const target = e.target as HTMLElement;
          cursor.classList.toggle(
            "app-cursor-hover",
            !!target.classList?.contains("hover-cursor"),
          );
        };

        const onLeave = () => cursor.classList.add("app-cursor-leave");
        const onEnter = () => cursor.classList.remove("app-cursor-leave");

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);

        return () => {
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseleave", onLeave);
          document.removeEventListener("mouseenter", onEnter);
        };
      };

      mm.add("(prefers-reduced-motion: no-preference)", () => setup(0.5));
      mm.add("(prefers-reduced-motion: reduce)", () => setup(0));

      return () => mm.revert();
    },
    { scope: cursorRef },
  );

  return <div className="app-cursor" ref={cursorRef} aria-hidden="true"></div>;
}
