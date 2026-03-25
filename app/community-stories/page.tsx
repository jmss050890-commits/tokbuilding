'use client';

import Link from 'next/link';
import { Heart, Users, Shield } from 'lucide-react';
import { useSiteCopy } from '@/app/components/SiteLanguageControl';

export default function CommunityStories() {
  const copy = useSiteCopy();
  const stories = copy.communityStories.stories;
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111", color: "#fff", paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ borderBottom: "2px solid #0fa89e", paddingBottom: 40, paddingTop: 60, marginBottom: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
          <h1 style={{ margin: 0, fontSize: 48, marginBottom: 16, fontWeight: "bold" }}>{copy.communityStories.title}</h1>
          <p style={{ margin: 0, fontSize: 18, color: "#bbb", lineHeight: 1.6 }}>
            {copy.communityStories.intro}
          </p>
        </div>
      </div>

      {/* Stories */}
      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ display: "grid", gap: 28 }}>
          {stories.map((story, index) => (
            <div
              key={`${story.title}-${index}`}
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
                  {story.type === "podcast" ? copy.communityStories.podcast : copy.communityStories.testimony}
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
                  {copy.communityStories.communityVoice}
                </span>
              </div>

              <h3 style={{ margin: "12px 0 8px 0", fontSize: 22, lineHeight: 1.3 }}>{story.title}</h3>
              <p style={{ margin: "0 0 16px 0", fontSize: 13, color: "#999" }}>{copy.communityStories.from}: {story.source}</p>

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
                    {copy.communityStories.connectionTitle}
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
                    {copy.communityStories.impactTitle}
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
        <h2 style={{ margin: "0 0 20px 0", fontSize: 28 }}>{copy.communityStories.patternTitle}</h2>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div>
            <Shield style={{ width: 40, height: 40, color: "#0fa89e", marginBottom: 12 }} />
            <h4 style={{ margin: "0 0 8px 0", fontSize: 16 }}>{copy.communityStories.patternSteps[0]?.title}</h4>
            <p style={{ margin: 0, fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>{copy.communityStories.patternSteps[0]?.body}</p>
          </div>
          <div>
            <Users style={{ width: 40, height: 40, color: "#0fa89e", marginBottom: 12 }} />
            <h4 style={{ margin: "0 0 8px 0", fontSize: 16 }}>{copy.communityStories.patternSteps[1]?.title}</h4>
            <p style={{ margin: 0, fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>{copy.communityStories.patternSteps[1]?.body}</p>
          </div>
          <div>
            <Heart style={{ width: 40, height: 40, color: "#0fa89e", marginBottom: 12 }} />
            <h4 style={{ margin: "0 0 8px 0", fontSize: 16 }}>{copy.communityStories.patternSteps[2]?.title}</h4>
            <p style={{ margin: 0, fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>{copy.communityStories.patternSteps[2]?.body}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <p style={{ fontSize: 16, color: "#bbb", marginBottom: 20 }}>
          {copy.communityStories.ctaBody}
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
            {copy.communityStories.ctaButton}
          </button>
        </Link>
      </div>
    </div>
  );
}
