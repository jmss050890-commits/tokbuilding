<<<<<<< HEAD
﻿import type { NextRequest } from "next/server";
=======
import type { NextRequest } from "next/server";
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
import { NextResponse } from "next/server";
import {
  addSiteLanguagePrefix,
  DEFAULT_SITE_LANGUAGE,
  getPathSiteLanguage,
  removeSiteLanguagePrefix,
  resolveSiteLanguage,
  SITE_LANGUAGE_COOKIE_KEY,
  SITE_LANGUAGE_REQUEST_HEADER,
} from "@/lib/site-language";

const SUBDOMAIN_REDIRECT_MAP: Record<string, string> = {
<<<<<<< HEAD
  "tokhealth.sandersvioprolabsllc.com": "https://tokhealth-mobile.emergent.host",
};

const TRAINING_SUBDOMAINS = new Set([
  "training.sandersvioprolabs.com",
  "training.sandersvioprolabsllc.com",
]);

=======
  "tokhealth.sandersvioprolabs.com": "https://tokhealth-mobile.emergent.host",
};

>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
const AGENT_SLUGS = new Set([
  "a1",
  "coach-daniels",
  "first-guardian",
  "grace",
  "hatata",
  "mr-kpa",
  "tok2myia",
  "tokfaith",
  "tokseo",
  "wisdom",
]);

const AGENT_ALIAS_MAP: Record<string, string> = {
  "agent/hatata": "hatata",
  "agent/first-guardian": "first-guardian",
  "agent/michelle": "first-guardian",
  "agent/mr-kpa": "mr-kpa",
  "agent/tok2myia": "tok2myia",
  "agent/tokfaith": "tokfaith",
  "faith": "tokfaith",
  "tokfaith": "tokfaith",
  "guardian-of-the-home": "first-guardian",
  "michelle": "first-guardian",
  "sanders-viopro-labs": "hatata",
  "sanders-viopro-labs/agent": "hatata",
  "sandersvioprolabs": "hatata",
  "sandersvioprolabs/agent": "hatata",
  "svl-foundation": "first-guardian",
  "svl": "hatata",
  "svl/agent": "hatata",
  "the-first-guardian": "first-guardian",
};

function normalizeAgentSlug(slug: string) {
  return slug
    .trim()
    .toLowerCase()
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "");
}

function resolveProxyAgentSlug(slug: string) {
  let normalizedSlug = normalizeAgentSlug(slug);

  try {
    normalizedSlug = normalizeAgentSlug(decodeURIComponent(normalizedSlug));
  } catch {
    // Keep the original value if it is not URI-encoded.
  }

  if (AGENT_SLUGS.has(normalizedSlug)) {
    return normalizedSlug;
  }

  const aliasMatch = AGENT_ALIAS_MAP[normalizedSlug];
  if (aliasMatch) {
    return aliasMatch;
  }

  const segments = normalizedSlug.split("/").filter(Boolean);
  const matchedSegment = [...segments].reverse().find((segment) => AGENT_SLUGS.has(segment));

  return matchedSegment ?? null;
}

function getRequestHost(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const directHost = request.headers.get("host");
  const host = forwardedHost || directHost || "";
  return host.toLowerCase().split(",")[0].trim().split(":")[0];
}

function shouldBypassLocaleRouting(pathname: string) {
  return pathname.startsWith("/_next") || pathname.startsWith("/api") || /\.[^/]+$/.test(pathname);
}

function withLanguageRequestHeader(request: NextRequest, language: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(SITE_LANGUAGE_REQUEST_HEADER, language);
  return requestHeaders;
}

function withLanguageCookie(response: NextResponse, language: string) {
  response.cookies.set(SITE_LANGUAGE_COOKIE_KEY, language, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const host = getRequestHost(request);
  const subdomainRedirect = host ? SUBDOMAIN_REDIRECT_MAP[host] : undefined;

  if (subdomainRedirect) {
    const redirectUrl = new URL(subdomainRedirect);
    redirectUrl.pathname = nextUrl.pathname;
    redirectUrl.search = nextUrl.search;
    return NextResponse.redirect(redirectUrl, 308);
  }

<<<<<<< HEAD
  // Handle training subdomain - rewrite to training-center page
  if (host && TRAINING_SUBDOMAINS.has(host) && nextUrl.pathname === "/") {
    const rewriteUrl = nextUrl.clone();
    rewriteUrl.pathname = "/training-center";
    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: withLanguageRequestHeader(request, DEFAULT_SITE_LANGUAGE),
      },
    });
  }

=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
  const pathname = nextUrl.pathname;
  const pathnameLanguage = getPathSiteLanguage(pathname);
  const localeBypassed = shouldBypassLocaleRouting(pathname);

  if (!localeBypassed && pathnameLanguage) {
    const internalPathname = removeSiteLanguagePrefix(pathname);

    if (internalPathname.startsWith("/agent/")) {
      const rawSlug = internalPathname.slice("/agent/".length);
      const resolvedSlug = resolveProxyAgentSlug(rawSlug);

      if (!resolvedSlug) {
        return withLanguageCookie(
          NextResponse.redirect(new URL(addSiteLanguagePrefix("/agent", pathnameLanguage), request.url)),
          pathnameLanguage,
        );
      }

      if (resolvedSlug !== rawSlug) {
        return withLanguageCookie(
          NextResponse.redirect(new URL(addSiteLanguagePrefix(`/agent/${resolvedSlug}`, pathnameLanguage), request.url)),
          pathnameLanguage,
        );
      }
    }

    const rewriteUrl = nextUrl.clone();
    rewriteUrl.pathname = internalPathname;

    return withLanguageCookie(
      NextResponse.rewrite(rewriteUrl, {
        request: {
          headers: withLanguageRequestHeader(request, pathnameLanguage),
        },
      }),
      pathnameLanguage,
    );
  }

  if (!localeBypassed && !pathnameLanguage) {
    const preferredLanguage = resolveSiteLanguage(request.cookies.get(SITE_LANGUAGE_COOKIE_KEY)?.value);

    if (preferredLanguage !== DEFAULT_SITE_LANGUAGE) {
      const redirectUrl = nextUrl.clone();
      redirectUrl.pathname = addSiteLanguagePrefix(pathname, preferredLanguage);
      return withLanguageCookie(NextResponse.redirect(redirectUrl), preferredLanguage);
    }
  }

  if (nextUrl.pathname.startsWith("/agent/")) {
    const rawSlug = nextUrl.pathname.slice("/agent/".length);
    const resolvedSlug = resolveProxyAgentSlug(rawSlug);

    if (!resolvedSlug) {
      return NextResponse.redirect(new URL("/agent", request.url));
    }

    if (resolvedSlug !== rawSlug) {
      return NextResponse.redirect(new URL(`/agent/${resolvedSlug}`, request.url));
    }
  }

  return withLanguageCookie(
    NextResponse.next({
      request: {
        headers: withLanguageRequestHeader(request, DEFAULT_SITE_LANGUAGE),
      },
    }),
    DEFAULT_SITE_LANGUAGE,
  );
}

export const config = {
  matcher: ["/:path*"],
};
<<<<<<< HEAD

=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
