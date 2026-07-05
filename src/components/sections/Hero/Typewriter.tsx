"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

type TypewriterProps = {
  words: string[];
  /** Chars used while scrambling (dev/matrix vibe). */
  chars?: string;
  className?: string;
};

export default function Typewriter({
  words,
  chars = "01",
  className,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || words.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ repeat: -1 });
        words.forEach((word) => {
          tl.to(el, {
            duration: 1,
            scrambleText: { text: word, chars, speed: 0.5 },
          });
          tl.to({}, { duration: 1.4 }); // hold before the next term
        });
        return () => tl.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.textContent = words[0];
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [words] },
  );

  return <span ref={ref} className={className} aria-live="polite" />;
}
