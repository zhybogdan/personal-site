"use client";

import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { useMagnetic } from "@/lib/useMagnetic";
import { cn } from "@/lib/cn";
import styles from "./button.module.scss";

type ButtonProps = {
  href: string;
  children: ReactNode;
  /** Render a plain <a> (external / mailto) instead of the localized <Link>. */
  external?: boolean;
  /** Enable the magnetic (cursor-follow) hover effect. */
  magnetic?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  external = false,
  magnetic = false,
  className,
}: ButtonProps) {
  const magneticRef = useMagnetic<HTMLAnchorElement>();
  const ref = magnetic ? magneticRef : undefined;

  const classes = cn(styles.button, "hover-cursor", className);

  if (external) {
    return (
      <a href={href} ref={ref} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} ref={ref} className={classes}>
      {children}
    </Link>
  );
}
