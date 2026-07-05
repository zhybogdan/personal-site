"use client";

import { useRef, useState } from "react";

import { siteConfig } from "@/config/site";

/**
 * Copies the site email to the clipboard and exposes a short-lived `copied`
 * flag for confirmation UI. Pair with a `mailto:` href so users with a mail
 * client still get the compose window.
 */
export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyEmail = () => {
    navigator.clipboard
      ?.writeText(siteConfig.email)
      .then(() => {
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return { copied, copyEmail };
}
