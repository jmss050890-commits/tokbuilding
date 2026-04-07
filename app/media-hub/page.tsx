'use client';

import Link from 'next/link';
import { Play, MessageCircle, Share2, Radio } from 'lucide-react';
import { useSiteCopy } from '@/app/components/SiteLanguageControl';

export default function MediaHub() {
  const copy = useSiteCopy();
  const mediaItems = copy.mediaHub.items;
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111", color: "#fff", paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ borderBottom: "2px solid #e05c1a", paddingBottom: 40, paddingTop: 60, marginBottom: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
          <h1 style={{ margin: 0, fontSize: 48, marginBottom: 16, fontWeight: "bold" }}>{copy.mediaHub.title}</h1>
          <p style={{ margin: 0, fontSize: 18, color: "#bbb", lineHeight: 1.6 }}>
            {copy.mediaHub.intro}
          </p>
        </div>
      </div>

      {/* Featured */}
      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20, marginBottom: 60 }}>
        <h2 style={{ fontSize: 28, marginBottom: 24, marginTop: 0 }}>{copy.mediaHub.featuredTitle}</h2>
        {mediaItems
          .filter((m) => m.featured)
          .map((media, index) => (
            <div
              key={`${media.title}-${index}`}
              style={{
                borderRadius: 16,
                border: "1px solid #e05c1a",
                backgroundColor: "rgba(224, 92, 26, 0.08)",
                padding: 28,
                marginBottom: 28,
              }}
            >
              <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr auto" }}>
                <div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: 999,
                        backgroundColor: "#e05c1a",
                        color: "#111",
                        fontSize: 11,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {media.category}
                    </span>
                    {media.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 999,
                          backgroundColor: "rgba(255,255,255,0.1)",
                          fontSize: 11,
                          color: "#bbb",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 style={{ margin: "16px 0 12px 0", fontSize: 24, lineHeight: 1.3 }}>{media.title}</h3>
                  <p style={{ margin: "0 0 16px 0", fontSize: 15, color: "#ddd", lineHeight: 1.6 }}>
                    {media.description}
                  </p>

                  {media.highlights && (
                    <div style={{ marginBottom: 20 }}>
                      <p style={{ margin: "0 0 10px 0", fontSize: 12, color: "#999", fontWeight: "bold" }}>{copy.mediaHub.keyTopics}</p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {media.highlights.map((h) => (
                          <span
                            key={h}
                            style={{
                              padding: "6px 12px",
                              borderRadius: 8,
                              backgroundColor: "rgba(224, 92, 26, 0.2)",
                              fontSize: 13,
                              color: "#f5a962",
                            }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "#999" }}>
                      <Radio style={{ display: "inline", marginRight: 6, width: 16 }} />
                      {media.duration}
                    </span>
                    {media.engagement && (
                      <>
                        <span style={{ fontSize: 13, color: "#999" }}>
                          <MessageCircle style={{ display: "inline", marginRight: 6, width: 16 }} />
                          {media.engagement.comments} {copy.mediaHub.commentsLabel}
                        </span>
                        <span style={{ fontSize: 13, color: "#999" }}>
                          {media.engagement.discussions} {copy.mediaHub.discussionsLabel}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <button
                    style={{
                      padding: "12px 20px",
                      borderRadius: 8,
                      backgroundColor: "#e05c1a",
                      color: "#111",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      justifyContent: "center",
                      fontSize: 14,
                    }}
                  >
                    <Play style={{ width: 16, height: 16 }} />
                    {copy.mediaHub.listen}
                  </button>
                  <button
                    style={{
                      padding: "12px 20px",
                      borderRadius: 8,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.2)",
                      cursor: "pointer",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      justifyContent: "center",
                      fontSize: 14,
                    }}
                  >
                    <Share2 style={{ width: 16, height: 16 }} />
                    {copy.mediaHub.share}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Community Stories */}
      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20, marginBottom: 60 }}>
        <h2 style={{ fontSize: 28, marginBottom: 24, marginTop: 0 }}>{copy.mediaHub.voicesTitle}</h2>
        <p style={{ fontSize: 16, color: "#bbb", marginBottom: 32, lineHeight: 1.7 }}>
          {copy.mediaHub.voicesBody}
        </p>

        <Link href="/community-stories" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "14px 28px",
              borderRadius: 8,
              backgroundColor: "#e05c1a",
              color: "#111",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {copy.mediaHub.allStories}
          </button>
        </Link>
      </div>

      {/* Call to Action */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 16,
          backgroundColor: "rgba(224, 92, 26, 0.12)",
          border: "1px solid #e05c1a",
          padding: 40,
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: "0 0 12px 0", fontSize: 24 }}>{copy.mediaHub.ctaTitle}</h2>
        <p style={{ margin: "0 0 24px 0", fontSize: 16, color: "#ddd", lineHeight: 1.6 }}>
          {copy.mediaHub.ctaBody}
        </p>
        <a
          href="mailto:jerome@sandersvioprolabsllc.com"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: 8,
            backgroundColor: "#f5a962",
            color: "#111",
            textDecoration: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {copy.mediaHub.ctaButton}
        </a>
      </div>
    </div>
  );
}

