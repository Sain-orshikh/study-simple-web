import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"],
  },
  // Set output to 'standalone' for optimal Vercel deployment
  output: 'standalone',
  // Optimizations for API performance
  experimental: {
    serverMinification: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  // Enable granular chunking for better code splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
