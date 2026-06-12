import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Forces static HTML generation
  images: {
    unoptimized: true, // Required for GitHub Pages asset loading
  },
};

export default nextConfig;