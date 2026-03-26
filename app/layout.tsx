import type { Metadata, Viewport } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import PwaRegistration from "./PwaRegistration";
import { SiteFrame, SiteLanguageProvider } from "./components/SiteLanguageControl";
import {
  resolveSiteLanguage,
  DEFAULT_SITE_LANGUAGE,
  SITE_LANGUAGE_COOKIE_KEY,
  SITE_LANGUAGE_REQUEST_HEADER,
} from "@/lib/site-language";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3001");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sanders Viopro Labs - Keep People Alive (KPA)",
  description: "SVL: Sanders Viopro Labs, built by Jerome Sanders. A shared Next.js project for Jerome, you, and the Keep People Alive mission. TokAway, TokHealth, TokSmart, TokThru, and more.",
  applicationName: "Sanders Viopro Labs",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sanders Viopro Labs",
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0d0f",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const requestHeaders = await headers();
  const cookieStore = await cookies();
  
  // Always start with the default language, then override only if there's a language header
  // (set by middleware based on the URL pathname)
  let initialLanguage = DEFAULT_SITE_LANGUAGE;
  const headerLanguage = requestHeaders.get(SITE_LANGUAGE_REQUEST_HEADER);
  const cookieLanguage = cookieStore.get(SITE_LANGUAGE_COOKIE_KEY)?.value;
  
  if (headerLanguage) {
    // If we have an explicit language header from middleware (URL path had language), use it
    initialLanguage = resolveSiteLanguage(headerLanguage);
  } else if (cookieLanguage && cookieLanguage !== DEFAULT_SITE_LANGUAGE) {
    // Only use cookie if it's NOT the default language (preserves user preference for non-default languages)
    initialLanguage = resolveSiteLanguage(cookieLanguage);
  }

  return (
    <html lang={initialLanguage}>
      <head />
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#111",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <SiteLanguageProvider initialLanguage={initialLanguage}>
          <PwaRegistration />
          <SiteFrame>{children}</SiteFrame>
        </SiteLanguageProvider>
      </body>
    </html>
  );
}
