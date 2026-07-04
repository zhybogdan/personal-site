import type { Metadata } from "next";

import PortfolioList from "@/components/sections/PortfolioList/PortfolioList";

export const metadata: Metadata = {
  title: "Портфолио | Богдан — разработка сайтов под ключ",
  description:
    "Коммерческие проекты: landing page, корпоративные сайты, визитки.",
};

export default function PortfolioPage() {
  return <PortfolioList />;
}
