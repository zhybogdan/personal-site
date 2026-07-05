"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

const STRENGTH = 10; // max pull in px

/**
 * Magnetic cursor-follow effect. Returns a ref to attach to the element that
 * should be pulled toward the cursor. Skipped when the user prefers reduced
 * motion (handled via gsap.matchMedia).
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width; // 0..1
          const relY = (e.clientY - rect.top) / rect.height;
          xTo(relX * STRENGTH * 2 - STRENGTH);
          yTo(relY * STRENGTH * 2 - STRENGTH);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);

        return () => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
}
