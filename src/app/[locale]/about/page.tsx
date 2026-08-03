import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { localizedAlternates, localizedOpenGraph } from "@/lib/seo";
import About from "@/components/sections/About/About";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates(locale, "/about"),
    openGraph: localizedOpenGraph({
      locale,
      route: "/about",
      title: t("title"),
      description: t("description"),
    }),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <About />;
}
