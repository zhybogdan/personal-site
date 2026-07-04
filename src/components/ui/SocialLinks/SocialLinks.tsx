import type { ReactNode } from "react";
import { FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";

import { siteConfig } from "@/config/site";

const icons: Record<string, ReactNode> = {
  telegram: <FaTelegramPlane />,
  linkedin: <FaLinkedinIn />,
};

export default function SocialLinks() {
  return (
    <div className="social">
      {siteConfig.socials.map((item) => (
        <a
          href={item.href}
          className="social_link hover-cursor"
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
          key={item.name}
        >
          {icons[item.icon]}
        </a>
      ))}
    </div>
  );
}
