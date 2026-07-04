import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";

import "normalize.css";
import "./globals.scss";

import { siteConfig } from "@/config/site";
import Cursor from "@/components/layout/Cursor/Cursor";
import AppShell from "@/components/layout/AppShell/AppShell";

const sourceSans = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: "bogdan.starcoding.top" }],
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.png", sizes: "16x16", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    siteName: siteConfig.seo.title,
    locale: siteConfig.seo.locale,
    images: [siteConfig.seo.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#18181e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={sourceSans.variable}>
      <body>
        <Cursor />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
