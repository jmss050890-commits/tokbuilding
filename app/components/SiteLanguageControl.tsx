"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  addSiteLanguagePrefix,
  DEFAULT_SITE_LANGUAGE,
  getSiteLanguageLabel,
  getPathSiteLanguage,
  resolveSiteLanguage,
  SITE_LANGUAGE_COOKIE_KEY,
  SITE_LANGUAGES,
  SITE_LANGUAGE_STORAGE_KEY,
  type SiteLanguageCode,
} from "@/lib/site-language";
import { getSiteCopy, type SiteCopy } from "@/lib/site-copy";

type SiteLanguageContextValue = {
  language: SiteLanguageCode;
  setLanguage: (language: SiteLanguageCode) => void;
};

const SiteLanguageContext = createContext<SiteLanguageContextValue | null>(null);

export function SiteLanguageProvider({
  children,
  initialLanguage = DEFAULT_SITE_LANGUAGE,
}: {
  children: ReactNode;
  initialLanguage?: SiteLanguageCode;
}) {
  const pathname = usePathname();
  const pathnameLanguage = getPathSiteLanguage(pathname);
  const [preferredLanguage, setPreferredLanguage] = useState<SiteLanguageCode | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // On client mount, handle language state
  useEffect(() => {
    // If URL has no language prefix, ignore any non-default initialLanguage (forces English)
    if (!pathnameLanguage && initialLanguage !== DEFAULT_SITE_LANGUAGE) {
      // The URL is default (no language), so we should use default language
      // This fixes the issue where cookie persists from previous session
      setPreferredLanguage(DEFAULT_SITE_LANGUAGE);
    } else if (!pathnameLanguage) {
      // If URL has no language prefix, only restore from localStorage if it was explicitly set
      const storedLanguage = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
      if (storedLanguage && storedLanguage !== initialLanguage) {
        setPreferredLanguage(storedLanguage as SiteLanguageCode);
      }
    } else {
      // If URL has language in pathname, clear any stored preference to respect the URL
      window.localStorage.removeItem(SITE_LANGUAGE_STORAGE_KEY);
    }
    setIsHydrated(true);
  }, [pathnameLanguage, initialLanguage]);

  const language = pathnameLanguage ?? preferredLanguage ?? initialLanguage;

  useEffect(() => {
    if (!isHydrated) return;
    
    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-site-language", language);
    
    // Only store non-default languages in localStorage and cookies
    if (language !== DEFAULT_SITE_LANGUAGE) {
      window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, language);
      document.cookie = `${SITE_LANGUAGE_COOKIE_KEY}=${language}; path=/; max-age=31536000; samesite=lax`;
    } else {
      // Clear storage when returning to default language
      window.localStorage.removeItem(SITE_LANGUAGE_STORAGE_KEY);
      document.cookie = `${SITE_LANGUAGE_COOKIE_KEY}=; path=/; max-age=0`;
    }
  }, [language, isHydrated]);

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage: setPreferredLanguage,
    }),
    [language],
  );

  return <SiteLanguageContext.Provider value={contextValue}>{children}</SiteLanguageContext.Provider>;
}

export function useSiteLanguage() {
  const context = useContext(SiteLanguageContext);

  if (!context) {
    throw new Error("useSiteLanguage must be used within a SiteLanguageProvider.");
  }

  return context;
}

export function useSiteCopy(): SiteCopy {
  const { language } = useSiteLanguage();

  return getSiteCopy(language);
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const copy = useSiteCopy();

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
          padding: "1rem",
          borderBottom: "1px solid #333",
        }}
      >
        <h1 style={{ margin: 0 }}>Sanders Viopro Labs</h1>
        <SiteLanguageSelector />
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
        {copy.layout.banner}
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
            {copy.layout.missionTitle}
          </p>
          <p style={{ margin: "0.5rem 0" }}>{copy.layout.missionBody1}</p>
          <p style={{ margin: "0.5rem 0" }}>{copy.layout.missionBody2}</p>
          <p style={{ margin: "0.5rem 0", color: "#d7d7d7", fontWeight: 700 }}>{copy.layout.protocolTitle}</p>
          <p style={{ margin: "0.5rem 0" }}>{copy.layout.protocolBody}</p>
          <p style={{ margin: "1rem 0 0.5rem 0", color: "#d7d7d7", fontWeight: 700, letterSpacing: "0.03em" }}>
            {copy.layout.footerTagline}
          </p>
          <p style={{ margin: "1rem 0 0.5rem 0" }}>{copy.layout.footerMedical}</p>
          <p style={{ margin: "1.5rem 0 0 0" }}>
            <a href="/legal-disclaimer" style={{ color: "#7ee787", fontWeight: 700, textDecoration: "underline" }}>
              Legal & Disclaimers
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export function SiteLanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, setLanguage } = useSiteLanguage();
  const copy = useSiteCopy();

  const handleLanguageChange = (nextLanguage: SiteLanguageCode) => {
    setLanguage(nextLanguage);

    const nextPathname = addSiteLanguagePrefix(pathname, nextLanguage);
    const search = searchParams.toString();
    const nextUrl = search ? `${nextPathname}?${search}` : nextPathname;

    router.push(nextUrl);
  };

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "#d9d9d9",
        fontSize: "0.85rem",
      }}
    >
      <span style={{ whiteSpace: "nowrap", letterSpacing: "0.02em" }}>{copy.common.language}</span>
      <select
        aria-label="Select site language"
        value={language}
        onChange={(event) => handleLanguageChange(resolveSiteLanguage(event.target.value))}
        title={`Current language: ${getSiteLanguageLabel(language)}`}
        style={{
          backgroundColor: "#18181b",
          color: "#f4f4f5",
          border: "1px solid #3f3f46",
          borderRadius: "999px",
          padding: "0.45rem 0.8rem",
          fontSize: "0.85rem",
          outline: "none",
        }}
      >
        {SITE_LANGUAGES.map((siteLanguage) => (
          <option key={siteLanguage.code} value={siteLanguage.code}>
            {siteLanguage.label}
          </option>
        ))}
      </select>
    </label>
  );
}