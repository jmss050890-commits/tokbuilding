export const SITE_LANGUAGE_STORAGE_KEY = "svl.siteLanguage";

export const SITE_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "ar", label: "العربية" },
  { code: "pt", label: "Português" },
] as const;

export type SiteLanguageCode = (typeof SITE_LANGUAGES)[number]["code"];

export const DEFAULT_SITE_LANGUAGE: SiteLanguageCode = "en";

export const SITE_LANGUAGE_LOCALES: Record<SiteLanguageCode, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  ar: "ar-SA",
  pt: "pt-BR",
};

export function isValidSiteLanguage(value: string | null | undefined): value is SiteLanguageCode {
  return SITE_LANGUAGES.some((language) => language.code === value);
}

export function getSiteLanguageLabel(code: string | null | undefined) {
  return SITE_LANGUAGES.find((language) => language.code === code)?.label ?? "English";
}

export function resolveSiteLanguage(value: string | null | undefined): SiteLanguageCode {
  return isValidSiteLanguage(value) ? value : DEFAULT_SITE_LANGUAGE;
}

export function getSiteLanguageLocale(value: string | null | undefined) {
  return SITE_LANGUAGE_LOCALES[resolveSiteLanguage(value)];
}