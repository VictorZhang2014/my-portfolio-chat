/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  }, 
  output: 'export', // ✅ This enables static export mode
  images: { unoptimized: true }, // S3 doesn’t support Next Image optimization
}

export default nextConfig
