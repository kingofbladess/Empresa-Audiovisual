import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  // Salida autocontenida para Docker (Dokploy). En Netlify no hace falta:
  // su adaptador empaqueta la web a su manera (Netlify define NETLIFY=true al compilar).
  ...(process.env.NETLIFY ? {} : { output: "standalone" as const }),
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Videos e imágenes de /public/media se guardan en caché un año.
      { source: "/media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
