import {
  SITE_LANGUAGE_COOKIE_KEY,
  SITE_LANGUAGE_REQUEST_HEADER,
} from "@/lib/site-language";

const SUPPORTED_SITE_LANGUAGES = new Set([
  "en",
  "es",
  "fr",
  "de",
  "it",
  "zh",
  "ja",
  "ko",
  "ar",
  "pt",
]);

const SITE_LANGUAGE_NAMES = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  zh: "Simplified Chinese",
  ja: "Japanese",
  ko: "Korean",
  ar: "Arabic",
  pt: "Portuguese",
};

function readCookie(cookieHeader, cookieName) {
  if (!cookieHeader) {
    return null;
  }

  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (rawName === cookieName) {
      return decodeURIComponent(rawValue.join("="));
    }
  }

  return null;
}

function normalizeSiteLanguageCode(value) {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim().toLowerCase();
  if (!normalizedValue) {
    return null;
  }

  const [baseLanguage] = normalizedValue.split(/[-_]/);
  return SUPPORTED_SITE_LANGUAGES.has(baseLanguage) ? baseLanguage : null;
}

export function getRequestSiteLanguage(request, body) {
  const headerLanguage = normalizeSiteLanguageCode(
    request?.headers?.get?.(SITE_LANGUAGE_REQUEST_HEADER),
  );
  const bodyLanguage = normalizeSiteLanguageCode(body?.language);
  const cookieLanguage = readCookie(
    request?.headers?.get?.("cookie"),
    SITE_LANGUAGE_COOKIE_KEY,
  );

  return bodyLanguage ?? headerLanguage ?? normalizeSiteLanguageCode(cookieLanguage) ?? "en";
}

export function getResponseLanguageSystemMessage(language) {
  const resolvedLanguage = normalizeSiteLanguageCode(language) ?? "en";

  if (resolvedLanguage === "en") {
    return null;
  }

  return `Respond in ${SITE_LANGUAGE_NAMES[resolvedLanguage]}. Keep the full reply in ${SITE_LANGUAGE_NAMES[resolvedLanguage]}, including any urgent safety steps and any supportive handoff line. Preserve every SVL and KPA safety boundary, escalation rule, and role boundary. Keep product and brand names such as Sanders Viopro Labs LLC, SVL, TokBuilding, TokHealth, TokFaith, TokSEO, Tok2Myia, HATATA, Mr. KPA, Grace, Wisdom, Coach Daniels, and The First Guardian in their original form unless the user explicitly asks for translation.`;
  return `Respond in ${SITE_LANGUAGE_NAMES[resolvedLanguage]}. Keep the full reply in ${SITE_LANGUAGE_NAMES[resolvedLanguage]}, including any urgent safety steps and any supportive handoff line. Preserve every SVL and KPA safety boundary, escalation rule, and role boundary. Keep product and brand names such as Sanders Viopro Labs, SVL, TokBuilding, TokHealth, TokFaith, TokSEO, Tok2Myia, HATATA, Mr. KPA, Grace, Wisdom, Coach Daniels, and The First Guardian in their original form unless the user explicitly asks for translation.`;
}
