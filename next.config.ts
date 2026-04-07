import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));


const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
<<<<<<< HEAD
  async redirects() {
    return [
      {
        source: "/legal-disclaimer.md",
        destination: "/legal-disclaimer",
        permanent: true,
      },
      {
        source: "/sanders-viopro-labs/tokfam",
        destination: "/tokfam",
        permanent: false,
      },
      {
        source: "/sanders-viopro-labs/tokfam/keepsake",
        destination: "/tokfam/keepsake",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/tokfaith',
        destination: '/agent/tokfaith',
      },
      {
        source: '/toksmart',
        destination: '/agent/toksmart',
      },
    ];
  },
=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        source: "/agent/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, must-revalidate",
          },
        ],
      },
      {
        source: "/:lang/agent/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
