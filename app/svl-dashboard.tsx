// SVL-KPA SPL Dashboard
// Proprietary to Sanders Viopro Labs LLC
//
// This dashboard uses the svlColors palette and features the Wisdom Signal feed prominently.

import React from "react";
import { svlColors } from "./svlColors";

// Wisdom Signal Feed (imported from TokShow Episode 1)
import { globalWisdomEmailBlock } from "./tokshow/episode-1/page";

export default function SvlDashboard() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${svlColors.primary} 0%, ${svlColors.background} 100%)`,
        color: svlColors.text,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <header
        style={{
          background: svlColors.accent,
          color: svlColors.text,
          padding: "2rem 0 1.5rem 0",
          textAlign: "center",
          borderBottom: `4px solid ${svlColors.highlight}`,
          boxShadow: `0 4px 24px 0 ${svlColors.silver}33`,
        }}
      >
        <h1 style={{ fontSize: "2.8rem", fontWeight: 900, letterSpacing: 1 }}>
          SVL-KPA SPL Dashboard
        </h1>
        <p style={{ fontSize: "1.25rem", marginTop: 8, color: svlColors.silver }}>
          Sanders Viopro Labs | Keep People Alive Initiative
        </p>
      </header>

      <section
        style={{
          maxWidth: 700,
          margin: "2.5rem auto 0 auto",
          background: svlColors.silver + "22",
          borderRadius: 24,
          boxShadow: `0 8px 32px 0 ${svlColors.silver}22`,
          padding: "2.5rem 2rem 2rem 2rem",
          border: `2px solid ${svlColors.highlight}`,
        }}
      >
        <h2 style={{
          color: svlColors.highlight,
          fontWeight: 800,
          fontSize: "2rem",
          marginBottom: 16,
        }}>
          Wisdom Signal Feed
        </h2>
        <div
          style={{
            background: svlColors.background,
            color: svlColors.text,
            borderRadius: 16,
            padding: "1.5rem 1.25rem",
            fontSize: "1.15rem",
            fontWeight: 500,
            border: `1.5px solid ${svlColors.accent}`,
            boxShadow: `0 2px 12px 0 ${svlColors.accent}22`,
          }}
        >
          {globalWisdomEmailBlock}
        </div>
      </section>

      {/* Additional SPL modules/cards can be added here */}
    </main>
  );
}
