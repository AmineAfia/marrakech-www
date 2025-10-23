import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
        '/settings/',
        '/admin/',
        '/device/',
        '/oauth/',
        '/accept-invitation/',
        '/prompt-management/',
        '/llms/',
        '/agents/',
        '/apps/',
        '/api-keys/',
        '/client-test/',
      ],
    },
    sitemap: 'https://marrakesh.dev/sitemap.xml',
  }
}
