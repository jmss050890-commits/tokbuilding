import type { Metadata, Viewport } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import { cookies, headers } from "next/headers";
import PwaRegistration from "./PwaRegistration";
import BirthdayBanner from "./components/BirthdayBanner";
import { SiteFrame, SiteLanguageProvider } from "./components/SiteLanguageControl";
import { ArchitectSeal } from "./components/ArchitectSeal";
<<<<<<< HEAD
import VoiceStyleSpeaker from "./components/VoiceStyleSpeaker";
=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  resolveSiteLanguage,
  DEFAULT_SITE_LANGUAGE,
  SITE_LANGUAGE_COOKIE_KEY,
  SITE_LANGUAGE_REQUEST_HEADER,
} from "@/lib/site-language";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
<<<<<<< HEAD
  "https://sandersvioprolabsllc.com";
=======
  "https://sandersvioprolabs.com";
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "APP_ID";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
<<<<<<< HEAD
  title: "Sanders Viopro Labs LLC - Keep People Alive (KPA)",
  description: "SVL: Sanders Viopro Labs LLC, built by Jerome Sanders. A shared Next.js project for Jerome, you, and the Keep People Alive mission. TokAway, TokHealth, TokSmart, TokThru, and more.",
  applicationName: "Sanders Viopro Labs LLC",
=======
  title: "Sanders Viopro Labs - Keep People Alive (KPA)",
  description: "SVL: Sanders Viopro Labs, built by Jerome Sanders. A shared Next.js project for Jerome, you, and the Keep People Alive mission. TokAway, TokHealth, TokSmart, TokThru, and more.",
  applicationName: "Sanders Viopro Labs",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
<<<<<<< HEAD
    title: "Sanders Viopro Labs LLC",
=======
    title: "Sanders Viopro Labs",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2713602662373618');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2713602662373618&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>
        <div id="fb-root" />
        <Script
          async
          defer
          crossOrigin="anonymous"
          src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v25.0&appId=${facebookAppId}`}
          strategy="afterInteractive"
        />
        <SiteLanguageProvider initialLanguage={initialLanguage}>
          <BirthdayBanner />
          <PwaRegistration />
          <SiteFrame>{children}</SiteFrame>
          <ArchitectSeal />
          <footer style={{marginTop: 32, textAlign: 'center', color: '#bbb', fontSize: 14}}>
            <div>
              <strong>Sanders Viopro Labs Growth 2026:</strong> Expanding the SVL-KPA Universe, empowering more communities, and advancing AI-driven safety and wellness.
            </div>
            <div style={{marginTop: 8}}>Sanders Viopro Labs LLC</div>
            <div style={{marginTop: 8}}>
              <span style={{display: 'block', fontWeight: 'bold', color: '#7ee787', marginBottom: 4}}>
                Kaptain Planet Arrives with a Key Performance Alert to Keep People Alive
              </span>
              <a href="/legal-disclaimer" style={{color: '#7ee787', textDecoration: 'underline'}}>
                Legal & Disclaimers
              </a>
            </div>
            <div style={{marginTop: 24, fontWeight: 'bold', fontSize: 18, color: '#7ee787'}}>
              #I #LOVE #BEING #A #CHILD #OF #GOD #AMEN<br />
              #ILOVEBEINGACHILDOFGODAMEN<br />
              #AMENBYAMEN
            </div>
            <div style={{marginTop: 12, display: 'flex', justifyContent: 'center', gap: 16}}>
              <VoiceStyleSpeaker
                text="#I #LOVE #BEING #A #CHILD #OF #GOD #AMEN. I love being a child of God. Amen."
                speakLabel="Speak Hashtag"
                stopLabel="Stop Hashtag"
                speakTitle="Listen to hashtag message"
                stopTitle="Stop hashtag message"
              />
              <VoiceStyleSpeaker
                text="#ILOVEBEINGACHILDOFGODAMEN. I love being a child of God. Amen."
                speakLabel="Speak Hashtag 2"
                stopLabel="Stop Hashtag 2"
                speakTitle="Listen to hashtag message 2"
                stopTitle="Stop hashtag message 2"
              />
              <VoiceStyleSpeaker
                text="#AMENBYAMEN. Amen by Amen."
                speakLabel="Speak AmenByAmen"
                stopLabel="Stop AmenByAmen"
                speakTitle="Listen to AmenByAmen"
                stopTitle="Stop AmenByAmen"
              />
            </div>
          </footer>
          <SpeedInsights />
        </SiteLanguageProvider>
      </body>
    </html>
  );
}

