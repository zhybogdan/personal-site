import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { localizedAlternates } from "@/lib/seo";
import PortfolioList from "@/components/sections/PortfolioList/PortfolioList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.portfolio" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates(locale, "/portfolio"),
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PortfolioList />;
}
