/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
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
  output: "export",
  trailingSlash: true,
  basePath: "",
};

module.exports = nextConfig;
