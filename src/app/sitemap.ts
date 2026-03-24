import { MetadataRoute } from 'next';

// 🚀 Smarter helper function to create clean SEO slugs
const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .split('(')[0]               // 👈 FIX: Removes alternative names like "(Bhagwati Fort)"
    .trim()                      // Removes leftover spaces
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replaces spaces and special chars with hyphens
    .replace(/(^-|-$)+/g, '');   // Removes hyphens from the start or end
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.goexploremaharashtra.in';
  const categories = ['forts', 'beaches', 'hills', 'nature', 'religious', 'culture'];
  
  // Generate Category URLs
  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  let dynamicUrls: MetadataRoute.Sitemap = [];
  
  try {
    const fetchPromises = categories.map(async (cat) => {
      const res = await fetch(`${baseUrl}/api/${cat}`, { next: { revalidate: 3600 } });
      const json = await res.json();
      
      const dataList = json.success ? json.data : json; 

      if (Array.isArray(dataList)) {
        return dataList.map((item: any) => {
          // It will try urlId first. If it's missing from the API, 
          // the new generateSlug will clean up the title perfectly!
          const finalSlug = item.urlId || generateSlug(item.title) || item.id;

          return {
            url: `${baseUrl}/${cat}/${finalSlug}`,
            lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          };
        });
      }
      return [];
    });

    const results = await Promise.all(fetchPromises);
    dynamicUrls = results.flat();
  } catch (error) {
    console.error("Sitemap Fetch Error:", error);
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.5 },
  ];

  return [...staticPages, ...categoryUrls, ...dynamicUrls];
}