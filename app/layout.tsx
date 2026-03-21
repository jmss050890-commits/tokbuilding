import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import type { ReactNode } from "react";
import PwaRegistration from "./PwaRegistration";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3001");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sanders Viopro Labs - Keep People Alive (KPA)",
  description: "SVL: Sanders Viopro Labs. Keep People Alive (KPA) mission-driven AI agents, safety tools, and wellness solutions. TokAway, TokHealth, TokSmart, TokThru, and more.",
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

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          nonce=""
          id="sa-dynamic-optimization"
          data-uuid="d01dcf5c-f1ce-4524-8a37-89af478d0bb5"
          src="data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gImQwMWRjZjVjLWYxY2UtNDUyNC04YTM3LTg5YWY0NzhkMGJiNSI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="
          strategy="afterInteractive"
        />
      </head>
      <body
        style={{
          margin: 0,
          backgroundColor: "#111",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <PwaRegistration />
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            borderBottom: "1px solid #333",
          }}
        >
          <h1 style={{ margin: 0 }}>Sanders Viopro Labs</h1>
        </header>

        <main>{children}</main>

        <footer
          style={{
            borderTop: "1px solid #333",
            padding: "2rem 1rem",
            marginTop: "3rem",
            backgroundColor: "#0d0d0f",
            color: "#999",
            fontSize: "0.85rem",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "0.5rem 0", maxWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
            SVL - Mr. KPA. Approved est. 1-31-2026 from Spoken Thought to Reality. SVL products provide medical guidance to facilitate coordination with qualified healthcare professionals and are not medical advisors or substitutes for professional medical services. All SVL AI agents are engineered with KPA (Keep People Alive) guardrails to ensure responsible, ethical, and human-centered operation.
          </p>
        </footer>
      </body>
    </html>
  );
}
