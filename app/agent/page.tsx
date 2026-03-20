"use client";

import Link from "next/link";
import { AGENTS, type AgentConfig } from "../../lib/lib/lib/agents";

export default function AgentHub() {
  const agents: AgentConfig[] = Object.values(AGENTS);

  const getAgentColor = (slug: string) => {
    const colors: Record<string, string> = {
      grace: "#d4a574",
      a1: "#6366f1",
      hatata: "#e05c1a",
      wisdom: "#0fa89e",
      "coach-daniels": "#2ecc71",
    };
    return colors[slug] || "#888";
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>SVL Agent Hub</h1>
        <p style={{ color: "#888" }}>Choose an agent to interact with</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {agents.map((agent) => {
          const accentColor = getAgentColor(agent.slug);
          return (
            <Link
              key={agent.slug}
              href={`/agent/${agent.slug}`}
              style={{
                padding: 24,
                border: `2px solid ${accentColor}`,
                borderRadius: 12,
                display: "block",
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "#1a1a1a",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = `${accentColor}15`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#1a1a1a";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#111",
                  }}
                >
                  {agent.avatar}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: 20 }}>{agent.name}</h2>
                </div>
              </div>
              <p style={{ margin: "8px 0", color: accentColor, fontSize: 12, fontWeight: 500 }}>
                {agent.defaultStatus}
              </p>
              <p style={{ margin: "12px 0 0 0", color: "#ccc", fontSize: 14, lineHeight: 1.5 }}>
                {agent.welcomeMessage}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
