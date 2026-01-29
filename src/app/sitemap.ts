import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.goexploremaharashtra.in';
  
  // 1. Static Category Routes
  const categories = ['forts', 'beaches', 'hills', 'wildlife', 'religious', 'culture'];
  
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const, // Bots should check categories often
    priority: 0.9,
  }));

  // 2. Dynamic Destination Routes (The "Secret Sauce")
  // We'll fetch the slugs for every item in your database to create deep links
  let dynamicUrls: any[] = [];
  
  try {
    const fetchPromises = categories.map(async (cat) => {
      const res = await fetch(`${baseUrl}/api/${cat}`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data.map((item: any) => ({
          url: `${baseUrl}/${cat}/${item.slug || item.id}`,
          lastModified: new Date(item.updatedAt || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }));
      }
      return [];
    });

    const results = await Promise.all(fetchPromises);
    dynamicUrls = results.flat();
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  // 3. Essential Pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), priority: 0.3 },
  ];

  return [...staticPages, ...categoryUrls, ...dynamicUrls];
}