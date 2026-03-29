import React from "react";

export function ArchitectSeal() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 12,
        right: 16,
        zIndex: 1000,
        opacity: 0.7,
        pointerEvents: "none",
        fontSize: 12,
        color: "#bfa046",
        background: "rgba(30, 24, 10, 0.7)",
        borderRadius: 8,
        padding: "4px 12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        letterSpacing: 1.2,
        fontWeight: 600,
        fontFamily: "serif",
      }}
      aria-label="Seal of the Architect"
      title="This page operates under the Highest Seal of Authority: Jerome Mack Sanders Sr., Builder of SVL Ecosystems."
    >
      <span style={{ marginRight: 6, fontSize: 14 }}>⛭</span>
      Seal of the Architect
    </div>
  );
}
