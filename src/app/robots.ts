import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.goexploremaharashtra.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',       // Prevents bots from crawling your backend routes
        '/_next/',     // Ignores Next.js internal build files
        '/static/',    // Ignores static chunks
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}