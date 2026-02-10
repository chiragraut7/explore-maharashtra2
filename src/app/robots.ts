import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.goexploremaharashtra.in';

  return {
    rules: [
      {
        /* 🚀 Rule 1: Allow AdSense to crawl EVERYTHING for better ad matching */
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      {
        /* 🛡️ Rule 2: General rules for all other bots (Google, Bing, etc.) */
        userAgent: '*',
        allow: [
          '/',
          '/assets/images/', // ✅ Prioritizes heritage photos for Google Image Search
        ],
        disallow: [
          '/api/',      // Protects your backend data
          '/_next/',     // Hides internal build files
          '/search?',    // Prevents "duplicate content" from search results
          '/admin/',     // Hides management panels
          '/private/',   // Hides sensitive project folders
          '/*.json$',    // Prevents direct indexing of JSON files
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}