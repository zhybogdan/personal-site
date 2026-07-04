"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { siteConfig } from "@/config/site";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";
import useScrollBlock from "@/lib/useScrollBlock";
import { cn } from "@/lib/cn";

type NavProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Nav({ isOpen, setIsOpen }: NavProps) {
  const pathname = usePathname();
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (isOpen) blockScroll();
    else allowScroll();
  }, [isOpen, blockScroll, allowScroll]);

  return (
    <div className={cn("navigation", isOpen && "is-open-nav")}>
      <nav className="navigation_nav">
        <ul className="navigation_menu">
          {siteConfig.nav.map((item) => (
            <li className="navigation_menu_item" key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "navigation_menu_link hover-cursor",
                  pathname === item.href && "active",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="navigation_dopinfo">
        <SocialLinks />
      </div>
    </div>
  );
}
