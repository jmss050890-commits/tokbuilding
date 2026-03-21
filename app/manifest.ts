import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Grace",
    short_name: "Grace",
    description:
      "Grace is a voice-first personal coach for health, heart, mindset, and spirit. Named after a survivor who dedicated her life to caring for others. Meet people where they are. Speak life. Keep People Alive.",
    start_url: "/agent/grace",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0d0d0f",
    theme_color: "#0d0d0f",
    categories: ["lifestyle", "health", "productivity"],
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
