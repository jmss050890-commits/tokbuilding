import React from "react";
import { AGENTS } from "@/lib/lib/lib/agents";
import AgentClient from "./agent-client";

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = AGENTS[slug] || null;

  return <AgentClient slug={slug} initialAgent={agent} />;
}
