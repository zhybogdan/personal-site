"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Fades in every `[data-reveal]` descendant of `scope` as it scrolls into
 * view. The hidden start state lives in CSS (`.gsap-reveal [data-reveal]`),
 * gated by a class set before first paint, so there is no FOUC. Opacity-only
 * on purpose — a transform would create a containing block and break the
 * `position: fixed` portfolio hover preview.
 *
 * Pass `dependencies` when the revealed set can change while mounted (e.g. a
 * filtered list): the previous triggers are reverted and rebuilt, so freshly
 * mounted nodes don't stay stuck at the hidden start state.
 */
export function useReveal(
  scope: RefObject<HTMLElement | null>,
  dependencies?: unknown[],
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const els = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        els.forEach((el, i) => {
          gsap.to(el, {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: (i % 4) * 0.08,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope, dependencies, revertOnUpdate: true },
  );
}
