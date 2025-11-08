import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
        port: '',
        pathname: '/**', // Sab kuch allow karo
      },
    ],
  },
  /* config options here */
};

export default nextConfig;

