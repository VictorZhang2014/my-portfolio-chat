import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Qiang Zhang CV',
    short_name: 'QZhangCV',
    description: 'AI chat with Qiang Zhang portfolio website',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/appicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/appicon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
