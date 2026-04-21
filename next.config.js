/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['maps.googleapis.com', 'firebasestorage.googleapis.com'],
  },
  serverExternalPackages: ['@anthropic-ai/sdk'],
}

module.exports = nextConfig
