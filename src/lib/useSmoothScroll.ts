"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Inertial page scrolling.
 *
 * Lenis scrolls the window itself instead of transforming a wrapper element,
 * so every `position: fixed` layer on the site — cursor, background, sidebar,
 * portfolio hover preview — keeps working untouched. Smoothing is wheel-only;
 * touch input stays native, where the OS momentum already feels right.
 *
 * The rAF loop is GSAP's ticker rather than Lenis' own, so Lenis and
 * ScrollTrigger read the same frame and never disagree about scroll position.
 *
 * Pass `paused` while an overlay owns the viewport (the mobile menu): Lenis
 * stops listening instead of fighting the body scroll lock.
 */
export function useSmoothScroll(paused = false) {
  const lenisRef = useRef<Lenis | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ autoRaf: false, duration: 1.05 });
      lenisRef.current = lenis;

      const raf = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => mm.revert();
  });

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (paused) lenis.stop();
    else lenis.start();
  }, [paused]);
}
