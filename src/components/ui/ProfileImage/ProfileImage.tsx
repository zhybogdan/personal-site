"use client";

import Image from "next/image";
import type { MouseEvent } from "react";

import { animateIt } from "@/lib/animate";
import styles from "./profileimage.module.scss";

export default function ProfileImage({ alt = "" }: { alt?: string }) {
  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    animateIt(e);
  };

  return (
    <div className={styles.mainimage}>
      <Image
        className={`${styles.mainimage_img} ${styles.mainimage_front}`}
        src="/assets/mainimage-1.png"
        alt={alt}
        fill
        priority
        sizes="(max-width: 1200px) 100vw, 520px"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseMove}
      />
    </div>
  );
}
