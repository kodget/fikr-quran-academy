/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ["image/webp", "image/avif"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Disable CSS optimization that's causing critters issue
  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;
