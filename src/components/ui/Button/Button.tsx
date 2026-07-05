"use client";

import type { MouseEvent, ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { animateIt } from "@/lib/animate";
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
  const handleMouse = magnetic
    ? (e: MouseEvent<HTMLAnchorElement>) => animateIt(e)
    : undefined;

  const classes = cn(styles.button, "hover-cursor", className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouse}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouse}
    >
      {children}
    </Link>
  );
}
