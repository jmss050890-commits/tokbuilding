'use client';

import Link from 'next/link';
import { Heart, Radio, Users, Shield } from 'lucide-react';

const communityStories = [
  {
    id: 1,
    title: "Government Shutdown & Crisis Navigation",
    source: "Reese Waters Runs Deep",
    type: "podcast",
    summary: "When airports get locked down, when TSA lines stretch for hours, when emergency systems are under strain—this is when KPA thinking matters. Reese Waters walks through real-world crisis navigation.",
    connection: "Shows how people naturally think about protection and staying alive during system failures",
    impact: "Demonstrates SVL's relevance in real crisis scenarios",
  },
  {
    id: 2,
    title: "Single Word, Single System: The Birth of TokFaith",
    source: "Shirley Whaley's 'Amen'",
    type: "testimony",
    summary: "One person blessed TokFaith's creation with a single word. That word became the foundation for a whole faith-guidance system designed to keep people spiritually grounded during crisis.",
    connection: "Living proof that faith, tech, and mission work together to serve people",
    impact: "Shows SVL's belief that spirit-led work scales when built with love",
  },
];

export default function CommunityStories() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111", color: "#fff", paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ borderBottom: "2px solid #0fa89e", paddingBottom: 40, paddingTop: 60, marginBottom: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
          <h1 style={{ margin: 0, fontSize: 48, marginBottom: 16, fontWeight: "bold" }}>Community Stories</h1>
          <p style={{ margin: 0, fontSize: 18, color: "#bbb", lineHeight: 1.6 }}>
            SVL keeps people alive. These are stories from the ground—voices in crisis, faith in systems, 
            mission work in motion. This is where Jerome Sanders' vision meets real people, real protection, 
            and real change.
          </p>
        </div>
      </div>

      {/* Stories */}
      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ display: "grid", gap: 28 }}>
          {communityStories.map((story) => (
            <div
              key={story.id}
              style={{
                borderRadius: 16,
                border: "1px solid #0fa89e",
                backgroundColor: "rgba(15, 168, 158, 0.06)",
                padding: 28,
              }}
            >
              <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    backgroundColor: "#0fa89e",
                    color: "#111",
                    fontSize: 11,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {story.type === "podcast" ? "Podcast" : "Testimony"}
                </span>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    backgroundColor: "rgba(15, 168, 158, 0.2)",
                    fontSize: 11,
                    color: "#7dd3cc",
                  }}
                >
                  Community Voice
                </span>
              </div>

              <h3 style={{ margin: "12px 0 8px 0", fontSize: 22, lineHeight: 1.3 }}>{story.title}</h3>
              <p style={{ margin: "0 0 16px 0", fontSize: 13, color: "#999" }}>From: {story.source}</p>

              <p style={{ margin: "16px 0", fontSize: 15, color: "#ddd", lineHeight: 1.7 }}>
                {story.summary}
              </p>

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", marginTop: 20 }}>
                <div
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    backgroundColor: "rgba(15, 168, 158, 0.1)",
                    border: "1px solid rgba(15, 168, 158, 0.2)",
                  }}
                >
                  <p style={{ margin: "0 0 8px 0", fontSize: 12, color: "#7dd3cc", fontWeight: "bold" }}>
                    Connection to SVL
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>{story.connection}</p>
                </div>

                <div
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    backgroundColor: "rgba(15, 168, 158, 0.1)",
                    border: "1px solid rgba(15, 168, 158, 0.2)",
                  }}
                >
                  <p style={{ margin: "0 0 8px 0", fontSize: 12, color: "#7dd3cc", fontWeight: "bold" }}>
                    Real-World Impact
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>{story.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern */}
      <div
        style={{
          maxWidth: 1200,
          margin: "60px auto 0",
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 16,
          backgroundColor: "rgba(15, 168, 158, 0.08)",
          border: "1px solid rgba(15, 168, 158, 0.3)",
          padding: 40,
        }}
      >
        <h2 style={{ margin: "0 0 20px 0", fontSize: 28 }}>The Pattern: Crisis → Community → System</h2>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div>
            <Shield style={{ width: 40, height: 40, color: "#0fa89e", marginBottom: 12 }} />
            <h4 style={{ margin: "0 0 8px 0", fontSize: 16 }}>1. Crisis Hits</h4>
            <p style={{ margin: 0, fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>
              Real people face real problems: shutdowns, lines, uncertainty, fear of the unknown.
            </p>
          </div>
          <div>
            <Users style={{ width: 40, height: 40, color: "#0fa89e", marginBottom: 12 }} />
            <h4 style={{ margin: "0 0 8px 0", fontSize: 16 }}>2. Community Rises</h4>
            <p style={{ margin: 0, fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>
              Voices like Reese Waters speak truth. Faith leaders like Shirley bless the work. 
              People talk about protection, survival, staying alive.
            </p>
          </div>
          <div>
            <Heart style={{ width: 40, height: 40, color: "#0fa89e", marginBottom: 12 }} />
            <h4 style={{ margin: "0 0 8px 0", fontSize: 16 }}>3. Systems Answer</h4>
            <p style={{ margin: 0, fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>
              SVL builds tools. Guardians listen. TokFaith guides. Systems emerge that serve the need 
              the community identified.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <p style={{ fontSize: 16, color: "#bbb", marginBottom: 20 }}>
          These are just the beginning. The community is speaking. SVL is listening.
        </p>
        <Link href="/our-story" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "14px 28px",
              borderRadius: 8,
              backgroundColor: "#0fa89e",
              color: "#111",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            See How SVL Started
          </button>
        </Link>
      </div>
    </div>
  );
}
