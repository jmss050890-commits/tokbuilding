import { AGENTS } from "@/lib/lib/lib/agents";

const AGENT_ALIAS_MAP: Record<string, string> = {
  "agent/hatata": "hatata",
  "agent/mr-kpa": "mr-kpa",
  "agent/tok2myia": "tok2myia",
  "agent/tokfaith": "tokfaith",
<<<<<<< HEAD
  "agent/portable-hydroponic-plant": "portable-hydroponic-plant",
  "hydroponics": "portable-hydroponic-plant",
  "portable-hydroponics": "portable-hydroponic-plant",
  "portable-hydroponic-plant": "portable-hydroponic-plant",
  "svl-portable-hydroponic-plant": "portable-hydroponic-plant",
=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
  "faith": "tokfaith",
  "tokfaith": "tokfaith",
  "agent/first-guardian": "first-guardian",
  "agent/michelle": "first-guardian",
  "michelle": "first-guardian",
  "the-first-guardian": "first-guardian",
  "guardian-of-the-home": "first-guardian",
  "svl-foundation": "first-guardian",
  "sanders-viopro-labs": "hatata",
  "sanders-viopro-labs/agent": "hatata",
  "sandersvioprolabs": "hatata",
  "sandersvioprolabs/agent": "hatata",
  "svl": "hatata",
  "svl/agent": "hatata",
};

function normalizeAgentSlug(slug: string) {
  return slug
    .trim()
    .toLowerCase()
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "");
}

export function resolveAgentSlug(slug: string) {
  let normalizedSlug = normalizeAgentSlug(slug);

  try {
    normalizedSlug = normalizeAgentSlug(decodeURIComponent(normalizedSlug));
  } catch {
    // Keep the normalized input when the slug is not URI-encoded.
  }

  if (normalizedSlug in AGENTS) {
    return normalizedSlug;
  }

  const aliasMatch = AGENT_ALIAS_MAP[normalizedSlug];
  if (aliasMatch) {
    return aliasMatch;
  }

  const segments = normalizedSlug.split("/").filter(Boolean);
  const matchedSegment = [...segments].reverse().find((segment) => segment in AGENTS);

  return matchedSegment ?? null;
}
