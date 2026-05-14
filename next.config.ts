import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
