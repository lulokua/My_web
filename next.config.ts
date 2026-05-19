import type { NextConfig } from "next";

import { securityHeaders } from "./src/shared/lib/securityHeaders";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  allowedDevOrigins: ["localhost:3001", "127.0.0.1:3001", "localhost:3000", "127.0.0.1:3000", "localhost", "127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "my-blog.cn-nb1.rains3.com",
      },
      {
        protocol: "https",
        hostname: "q.qlogo.cn",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders],
      },
    ];
  },
};

export default nextConfig;
