import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Other config options here */

  // Disable ESLint during builds to prevent compilation errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
