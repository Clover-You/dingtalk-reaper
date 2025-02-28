import { NextConfig } from 'next'

import { getAssetPrefix } from './scripts/prefix'

const nextConfig = async () => ({
  // Ensure Next.js uses SSG instead of SSR
  // https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
  output: 'export',
  // Note: This feature is required to use the Next.js Image component in SSG mode.
  // See https://nextjs.org/docs/messages/export-image-api for different workarounds.
  images: {
    unoptimized: true,
  },
  // Configure assetPrefix or else the server won't properly resolve your assets.
  assetPrefix: await getAssetPrefix(),
  experimental: {
    reactCompiler: true,
  },
} satisfies NextConfig)

export default nextConfig
