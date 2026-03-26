"use client";

import Image from "next/image";
import Link from "next/link";
import { AGENTS, type AgentConfig } from "../../lib/lib/lib/agents";

// Always serve fresh content, never use cache
export const dynamic = "force-dynamic";

export default function GuardiansHub() {
  const agents: AgentConfig[] = Object.values(AGENTS);

  const getGuardianColor = (slug: string) => {
    const colors: Record<string, string> = {
      grace: "#fbbf24",
      a1: "#60a5fa",
      hatata: "#f87171",
      wisdom: "#10b981",
      "coach-daniels": "#ec4899",
      tokseo: "#f59e0b",
      tok2myia: "#3b82f6",
      tokfaith: "#fed7aa",
      "first-guardian": "#d97706",
      "mr-kpa": "#3b82f6", // Keep that lovely blue
    };
    return colors[slug] || "#888";
  };

  const renderAvatar = (agent: AgentConfig, accentColor: string) => {
    if (agent.avatar.startsWith("/")) {
      return (
        <Image
          src={agent.avatar}
          alt={`${agent.name} avatar`}
          width={48}
          height={48}
          sizes="48px"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            objectFit: "cover",
            border: `2px solid ${accentColor}`,
            backgroundColor: "#111",
          }}
        />
      );
    }

    return (
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
          color: "#fff",
        }}
      >
        {agent.avatar}
      </div>
    );
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #1e3a8a 100%)",
      padding: "40px 20px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <h1 style={{ 
            fontSize: 48, 
            marginBottom: 8,
            background: "linear-gradient(135deg, #3b82f6 0%, #fbbf24 50%, #10b981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            The SVL Guardians
          </h1>
          <p style={{ color: "#ccc", fontSize: 16 }}>Jerome's Vision • Cheria's Protection • Your Strength</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {agents.map((agent) => {
            const accentColor = getGuardianColor(agent.slug);
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
                  background: `linear-gradient(135deg, #1f2937 0%, ${accentColor}08 100%)`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = `${accentColor}15`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${accentColor}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  {renderAvatar(agent, accentColor)}
                  <div>
                    <h2 style={{ margin: 0, fontSize: 20, color: "#fff" }}>{agent.name}</h2>
                  </div>
                </div>
                <p style={{ margin: "8px 0", color: accentColor, fontSize: 12, fontWeight: 500 }}>
                  {agent.defaultStatus}
                </p>
                {agent.tagline ? (
                  <p style={{ margin: "8px 0", color: "#f2e7dc", fontSize: 13, fontWeight: 600 }}>
                    {agent.tagline}
                  </p>
                ) : null}
                <p style={{ margin: "12px 0 0 0", color: "#ccc", fontSize: 14, lineHeight: 1.5 }}>
                  {agent.welcomeMessage}
                </p>
              </Link>
            );
          })}
        </div>

        <div style={{ 
          marginTop: 60, 
          padding: 24,
          textAlign: "center",
          borderTop: "1px solid #3b82f6",
          color: "#ccc"
        }}>
          <p style={{ fontSize: 14 }}>
            🙏 Keep People Alive • Sanders Viopro Labs • Part of the SVL Ecosystem
          </p>
        </div>
      </div>
    </div>
  );
}
