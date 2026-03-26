import React from "react";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { AGENTS } from "@/lib/lib/lib/agents";
import { resolveAgentSlug } from "@/lib/agent-routing";
import { getSiteCopy } from "@/lib/site-copy";
import { resolveSiteLanguage, SITE_LANGUAGE_COOKIE_KEY, SITE_LANGUAGE_REQUEST_HEADER } from "@/lib/site-language";
import AgentClient from "./agent-client";

// Always serve fresh content, never use cache
export const revalidate = 0;

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolvedSlug = resolveAgentSlug(slug);

  if (!resolvedSlug) {
    redirect("/agent");
  }

  if (resolvedSlug !== slug) {
    redirect(`/agent/${resolvedSlug}`);
  }

  const requestHeaders = await headers();
  const cookieStore = await cookies();
  const language = resolveSiteLanguage(
    requestHeaders.get(SITE_LANGUAGE_REQUEST_HEADER) ?? cookieStore.get(SITE_LANGUAGE_COOKIE_KEY)?.value,
  );
  const copy = getSiteCopy(language);
  const baseAgent = AGENTS[resolvedSlug];
  const localizedShell = copy.agentShells[resolvedSlug as keyof typeof copy.agentShells];
  const agent =
    resolvedSlug === "first-guardian"
      ? {
          ...baseAgent,
          tagline: copy.firstGuardianPage.tagline,
          protocolLabel: copy.firstGuardianPage.protocolLabel,
          welcomeTitle: copy.firstGuardianPage.welcomeTitle,
          welcomeMessage: copy.firstGuardianPage.welcomeMessage,
          legacyStory: copy.firstGuardianPage.legacyStory,
          suggestions: copy.firstGuardianPage.quickLinks,
          presenceNotes: copy.firstGuardianPage.presenceNotes,
          signatureLines: copy.firstGuardianPage.signatureLines,
          safetyCardTitle: copy.firstGuardianPage.safetyCardTitle,
          safetyCardBullets: copy.firstGuardianPage.safetyCardBullets,
        }
      : localizedShell
        ? {
            ...baseAgent,
            defaultStatus: localizedShell.defaultStatus,
            welcomeTitle: localizedShell.welcomeTitle,
            welcomeMessage: localizedShell.welcomeMessage,
            suggestions: localizedShell.suggestions,
          }
      : baseAgent;

  return <AgentClient slug={resolvedSlug} initialAgent={agent} />;
}
