"use client";

import Image from "next/image";

import { useMagnetic } from "@/lib/useMagnetic";
import styles from "./profileimage.module.scss";

export default function ProfileImage({ alt = "" }: { alt?: string }) {
  const magneticRef = useMagnetic<HTMLImageElement>();

  return (
    <div className={styles.mainimage}>
      <Image
        ref={magneticRef}
        className={`${styles.mainimage_img} ${styles.mainimage_front}`}
        src="/assets/mainimage-1.png"
        alt={alt}
        fill
        priority
        sizes="(max-width: 1200px) 100vw, 520px"
      />
    </div>
  );
}
