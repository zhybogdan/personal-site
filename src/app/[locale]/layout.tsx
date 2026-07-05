import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import "normalize.css";
import "../globals.scss";

import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { localizedAlternates } from "@/lib/seo";
import Cursor from "@/components/layout/Cursor/Cursor";
import AppShell from "@/components/layout/AppShell/AppShell";

const sourceSans = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: "bogdan.starcoding.top" }],
    alternates: localizedAlternates(locale),
    manifest: "/manifest.json",
    icons: {
      icon: [{ url: "/favicon.png", sizes: "16x16", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}/${locale}`,
      title: t("title"),
      description: t("description"),
      siteName: t("title"),
      locale: locale === "uk" ? "uk_UA" : "en_US",
      images: [siteConfig.ogImage],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#18181e",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={sourceSans.variable}
      suppressHydrationWarning
    >
      <body>
        {/* Hide reveal targets before first paint so the entrance has no FOUC.
            Runs only with JS; no-JS users see everything unhidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('gsap-reveal')",
          }}
        />
        <NextIntlClientProvider>
          <Cursor />
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
