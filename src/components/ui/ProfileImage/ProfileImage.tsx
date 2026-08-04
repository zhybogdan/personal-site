"use client";

import { useRef } from "react";
import Image from "next/image";

import { useDepthParallax } from "@/lib/useDepthParallax";
import { cn } from "@/lib/cn";
import styles from "./profileimage.module.scss";

// Flat photo for the <img>; the parallax layers are fetched separately and
// only when the effect actually runs.
const PHOTO = "/assets/mainimage-1.webp";
const LAYERS = {
  bg: "/assets/mainimage-1-bg.webp",
  person: "/assets/mainimage-1-person.webp",
  depth: "/assets/mainimage-1-depth.webp",
};

export default function ProfileImage({ alt = "" }: { alt?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // The <Image> below stays the LCP element and keeps rendering underneath;
  // the canvas only fades in once its textures are on the GPU, and never at
  // all for reduced motion / touch. So the photo is always there either way.
  const parallax = useDepthParallax(canvasRef, LAYERS);

  return (
    <div className={styles.mainimage}>
      <Image
        className={styles.mainimage_img}
        src={PHOTO}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1200px) 100vw, 520px"
      />
      <canvas
        ref={canvasRef}
        className={cn(styles.mainimage_canvas, parallax && styles.isLive)}
        aria-hidden="true"
      />
    </div>
  );
}
