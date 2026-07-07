"use client";

import { useEffect, useRef } from "react";

import styles from "./background.module.scss";

// Colors mirror the design tokens (globals.scss). The wide spotlight lifts
// dots in plain ink so it stays calm behind text; a tight red core adds the
// accent "spark" right at the cursor without spilling across lines.
const DOT_COLOR = "24, 24, 30"; // ink-800
const ACCENT_COLOR = "216, 62, 62"; // red-500

const SPACING = 40; // px between dots
const DOT_RADIUS = 1.4;
const PARALLAX = 12; // max grid shift opposite the cursor (depth)
const INFLUENCE = 140; // radius of the wide, calm ink lift
const SPARK = 60; // tight radius of the red accent core

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduced motion → static grid, no loop. Coarse pointer (touch) → no
    // cursor interaction to spare battery; we still paint a faint static grid.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const interactive = !reduced && !coarse;

    let width = 0;
    let height = 0;

    // Eased parallax offset (ox/oy) chasing a cursor-driven target (tx/ty).
    let ox = 0;
    let oy = 0;
    let tx = 0;
    let ty = 0;
    // Cursor position in CSS px; null when off-canvas / unknown.
    let mx: number | null = null;
    let my: number | null = null;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      // Base dots batched into one path + one fill for speed.
      ctx.fillStyle = `rgba(${DOT_COLOR}, 0.07)`;
      ctx.beginPath();

      const highlights: { x: number; y: number; t: number }[] = [];

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING - SPACING + ox;
          const y = j * SPACING - SPACING + oy;

          if (mx !== null && my !== null) {
            const dx = x - mx;
            const dy = y - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < INFLUENCE * INFLUENCE) {
              const t = 1 - Math.sqrt(d2) / INFLUENCE; // 1 at cursor → 0 at edge
              highlights.push({ x, y, t });
              continue;
            }
          }

          ctx.moveTo(x + DOT_RADIUS, y);
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // Cursor-lit dots: a wide, gentle ink lift (calm behind text) plus a
      // tight red spark hugging the cursor tip for the accent.
      for (const h of highlights) {
        const r = DOT_RADIUS + h.t * 0.9;
        const a = 0.07 + h.t * 0.13;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${DOT_COLOR}, ${a})`;
        ctx.arc(h.x, h.y, r, 0, Math.PI * 2);
        ctx.fill();

        const dist = (1 - h.t) * INFLUENCE;
        if (dist < SPARK) {
          const s = 1 - dist / SPARK; // 1 at cursor → 0 at spark edge
          ctx.beginPath();
          ctx.fillStyle = `rgba(${ACCENT_COLOR}, ${0.1 + s * 0.4})`;
          ctx.arc(h.x, h.y, r + s * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!interactive) draw(); // one static paint; no rAF below
    };

    let raf = 0;
    const tick = () => {
      ox += (tx - ox) * 0.08;
      oy += (ty - oy) * 0.08;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      tx = (0.5 - e.clientX / width) * PARALLAX;
      ty = (0.5 - e.clientY / height) * PARALLAX;
    };
    const onLeave = () => {
      mx = null;
      my = null;
      tx = 0;
      ty = 0;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (interactive) start();
    };

    window.addEventListener("resize", resize);
    resize();

    if (interactive) {
      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className={styles.bg} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.grid} />
      <div className={styles.grain} />
    </div>
  );
}
