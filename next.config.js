/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.notesgallery.com', // Assuming WP Headless API domain
      }
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Enable advanced performance features
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  }
};

module.exports = withPWA(nextConfig);
