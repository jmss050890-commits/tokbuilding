"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VCCHub() {
  const router = useRouter();

  const products = [
    {
      id: "tokhealth",
      name: "TokHealth",
      icon: "🏥",
      role: "AI Health Coach & Facebook Live Cohost",
      description: "Voice-powered wellness platform with nutrition matrix, Wisdom AI Coach, community challenges, and emergency safety integration. Co-host your Facebook Lives with Wisdom.",
      color: "#0fa89e",
      textColor: "#2dd4c8",
      bgGradient: "rgba(15, 168, 158, 0.1)",
      url: "/tokhealth",
      mission: "Health is community. Empower families together.",
      features: ["Nutrition Coaching", "Facebook Live Integration", "Family Challenges", "Emergency Safety"]
    },
    {
      id: "tokthru",
      name: "TokThru / KPA",
      icon: "🆘",
      role: "Personal Safety & Crisis AI",
      description: "Keeping People Alive. AI-guided emergency coaching, fake emergency call, silent SOS with live location sharing. Life-safety first platform.",
      color: "#e05c1a",
      textColor: "#e8c76a",
      bgGradient: "rgba(224, 92, 26, 0.1)",
      url: "/tokthru",
      mission: "Protect lives. Empower in crisis.",
      features: ["Emergency Coaching", "Silent SOS", "Live Location", "Fake Call"]
    },
    {
      id: "tokbuilding",
      name: "TokBuilding",
      icon: "🤖",
      role: "AI Agent Builder Platform",
      description: "White-label AI agent platform. Guide prospects through agent design, generate specs, review, and send to production. Build custom AI agents in minutes.",
      color: "#6366f1",
      textColor: "#a5b4fc",
      bgGradient: "rgba(99, 102, 241, 0.1)",
      url: "/tokbuilding",
      mission: "Democratize AI. Build agents, scale impact.",
      features: ["Agent Designer", "Specs Generator", "Review Dashboard", "Production Ready"]
    },
    {
      id: "toksmart",
      name: "TokSmart",
      icon: "✨",
      role: "AI-Powered Study & Success Assistant",
      description: "Dedicated to McKenzie. Intelligently routes questions to Scholar GPT, Gemini, ChatGPT, and Claude. For high school, college, and working students seeking academic excellence and career growth.",
      color: "#a855f7",
      textColor: "#d8b4fe",
      bgGradient: "rgba(168, 85, 247, 0.1)",
      url: "/toksmart",
      mission: "McKenzie, you've been my world. Now TokSmart is all of ours.",
      features: ["Smart Question Routing", "Multi-AI Comparison", "Academic Support", "Career Guidance"]
    },
    {
      id: "tokstore",
      name: "Tok Store",
      icon: "🏪",
      role: "App Distribution & Management Platform",
      description: "Central hub for discovering, downloading, and managing all Tok ecosystem apps. Rate apps, write reviews, track installations, and access app support.",
      color: "#10b981",
      textColor: "#86efac",
      bgGradient: "rgba(16, 185, 129, 0.1)",
      url: "/tokstore",
      mission: "One platform. All your tools. Seamless integration.",
      features: ["App Discovery", "Download Management", "Reviews & Ratings", "App Support"]
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#08080a", color: "#e8e8f0", overflow: "hidden" }}>
      {/* Grid background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header/Nav */}
      <header
        style={{
          padding: "20px 30px",
          borderBottom: "1px solid #1e1e2a",
          background: "rgba(8, 8, 10, 0.95)",
          backdropFilter: "blur(10px)",
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #c9a84c, #e05c1a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "#08080a",
            }}
          >
            ◆
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2 }}>SVL</div>
            <div style={{ fontSize: 10, color: "#5a5a72", letterSpacing: 1, marginTop: 2 }}>
              AGENT HUB
            </div>
          </div>
        </div>
        <Link
          href="/agent"
          style={{
            fontSize: 12,
            letterSpacing: 2,
            color: "#c9a84c",
            textDecoration: "none",
            border: "1px solid #1e1e2a",
            padding: "8px 16px",
            borderRadius: 4,
            transition: "all 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#c9a84c";
            e.currentTarget.style.background = "rgba(201, 168, 76, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#1e1e2a";
            e.currentTarget.style.background = "transparent";
          }}
        >
          SVL AGENTS →
        </Link>
      </header>

      {/* Hero Section */}
      <section style={{ padding: "80px 40px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: "#5a5a72", textTransform: "uppercase", marginBottom: 20 }}>
            Sanders Viopro Labs · Product Suite
          </div>
          <h1
            style={{
              fontSize: "clamp(48px, 8vw, 72px)",
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: 6,
              lineHeight: 1,
              marginBottom: 20,
              background: "linear-gradient(135deg, #e8c76a, #e05c1a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            VCC HUB
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#5a5a72",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              marginBottom: 30,
            }}
          >
            Voice Command Centers • AI Agents • Safety Tech
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: "#5a5a72",
              maxWidth: 600,
              margin: "0 auto 40px",
            }}
          >
            Three powerful platforms under the SVL seal. Protect lives. Empower communities. Build the future.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ padding: "40px", maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 30,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#14141c",
                border: `1px solid #1e1e2a`,
                borderRadius: 8,
                padding: 40,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = product.color;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${product.color}20`;
                (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, #14141c ${product.bgGradient}, #14141c)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1e1e2a";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.background = "#14141c";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 20,
                }}
              >
                {product.icon}
              </div>

              {/* Title & Role */}
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28,
                  letterSpacing: 2,
                  color: product.textColor,
                  marginBottom: 4,
                }}
              >
                {product.name}
              </h2>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 1.5,
                  color: "#5a5a72",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {product.role}
              </div>

              {/* Mission */}
              <div
                style={{
                  padding: "12px 14px",
                  background: `${product.color}15`,
                  border: `1px solid ${product.color}30`,
                  borderRadius: 4,
                  fontSize: 12,
                  color: product.textColor,
                  marginBottom: 20,
                  fontStyle: "italic",
                }}
              >
                {product.mission}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "#5a5a72",
                  marginBottom: 24,
                }}
              >
                {product.description}
              </p>

              {/* Features */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    style={{
                      fontSize: 10,
                      padding: "6px 12px",
                      background: `${product.color}20`,
                      border: `1px solid ${product.color}40`,
                      borderRadius: 20,
                      color: product.textColor,
                      letterSpacing: 0.5,
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={product.url}
                onClick={(e) => {
                  if (product.url.startsWith("/")) {
                    e.preventDefault();
                    router.push(product.url);
                  }
                }}
                style={{
                  display: "inline-block",
                  width: "100%",
                  padding: "12px 20px",
                  background: `linear-gradient(135deg, ${product.color}, ${product.textColor})`,
                  color: "#08080a",
                  border: "none",
                  borderRadius: 4,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 14,
                  letterSpacing: 2,
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  textAlign: "center",
                }}
              >
                LAUNCH {product.name.split("/")[0].toUpperCase()}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #1e1e2a",
          padding: "40px",
          textAlign: "center",
          color: "#5a5a72",
          fontSize: 12,
          letterSpacing: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        <p>Sanders Viopro Labs LLC · Mr. KPA · Verified Signature Authority · The Lab</p>
        <p style={{ marginTop: 12 }}>Protect Lives. Empower Communities. Build the Future.</p>
      </footer>
    </div>
  );
}
