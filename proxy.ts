import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SUBDOMAIN_REDIRECT_MAP: Record<string, string> = {
  "tokhealth.sandersvioprolabs.com": "https://tokhealth-mobile.emergent.host",
};

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
