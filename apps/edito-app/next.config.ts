import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["edito-sdk"],
  reactStrictMode: false,
};

export default nextConfig;
