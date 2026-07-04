"use client";

import type { MouseEvent } from "react";

import { animateIt } from "@/lib/animate";
import styles from "./profileimage.module.scss";

export default function ProfileImage({ alt = "" }: { alt?: string }) {
  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    animateIt(e);
  };

  return (
    <div className={styles.mainimage}>
      <img
        className={`${styles.mainimage_img} ${styles.mainimage_front}`}
        src="/assets/mainimage-1.png"
        alt={alt}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseMove}
      />
    </div>
  );
}
