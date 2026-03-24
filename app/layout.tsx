import type { Metadata, Viewport } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import PwaRegistration from "./PwaRegistration";

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

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
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

        <div
          style={{
            padding: "0.65rem 1rem",
            borderBottom: "1px solid #26262b",
            backgroundColor: "#131318",
            color: "#cfcfcf",
            fontSize: "0.8rem",
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          The result of Next.JS meeting God's Vision Through SVL to KPA
        </div>

        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            borderTop: "1px solid #333",
            padding: "2rem 1rem",
            backgroundColor: "#0d0d0f",
            color: "#999",
            fontSize: "0.85rem",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <p style={{ margin: "0.5rem 0", color: "#d7d7d7", fontWeight: 700, letterSpacing: "0.04em" }}>
              THE MISSION — WHY KPA
            </p>
            <p style={{ margin: "0.5rem 0" }}>
              Keep People Alive is not a slogan. It is the standard every SVL product is held to.
            </p>
            <p style={{ margin: "0.5rem 0" }}>
              Safety through TokThru. Health through TokHealth. Prosperity through TokBuilding. The only override any KPA product can perform on its user is to Keep People Alive.
            </p>
            <p style={{ margin: "0.5rem 0", color: "#d7d7d7", fontWeight: 700 }}>
              KPA Protocol Enabled
            </p>
            <p style={{ margin: "0.5rem 0" }}>
              Every SVL product is engineered with non-negotiable KPA safety guardrails.
            </p>
            <p style={{ margin: "1rem 0 0.5rem 0", color: "#d7d7d7", fontWeight: 700, letterSpacing: "0.03em" }}>
              The result of Next.JS meeting God's Vision Through SVL to KPA
            </p>
            <p style={{ margin: "1rem 0 0.5rem 0" }}>
              SVL - Mr. KPA. Approved est. 1-31-2026 from Spoken Thought to Reality. SVL products provide medical guidance to facilitate coordination with qualified healthcare professionals and are not medical advisors or substitutes for professional medical services.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
