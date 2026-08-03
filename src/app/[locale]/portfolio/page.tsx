import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { localizedAlternates, localizedOpenGraph } from "@/lib/seo";
import PortfolioList from "@/components/sections/Portfolio/PortfolioList";

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
    openGraph: localizedOpenGraph({
      locale,
      route: "/portfolio",
      title: t("title"),
      description: t("description"),
    }),
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
