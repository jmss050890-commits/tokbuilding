import React from "react";
import { redirect } from "next/navigation";
import { AGENTS } from "@/lib/lib/lib/agents";
import { resolveAgentSlug } from "@/lib/agent-routing";
import AgentClient from "./agent-client";

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

  const agent = AGENTS[resolvedSlug];

  return <AgentClient slug={resolvedSlug} initialAgent={agent} />;
}
