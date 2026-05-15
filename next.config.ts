import type { NextConfig } from "next";

/** Server-side rewrite target only. Client uses NEXT_PUBLIC_API_URL=/api/backend */
const backendProxyTarget =
  typeof process.env.BACKEND_PROXY_TARGET === "string"
    ? process.env.BACKEND_PROXY_TARGET.replace(/\/$/, "")
    : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    if (!backendProxyTarget.startsWith("http")) return [];
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendProxyTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;
