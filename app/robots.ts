import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://ferrocrema.com/sitemap.xml',
    host: 'https://ferrocrema.com',
  }
}
