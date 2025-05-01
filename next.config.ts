import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"],
  },
  // Set output to 'standalone' for optimal Vercel deployment
  output: 'standalone',
};

export default nextConfig;
