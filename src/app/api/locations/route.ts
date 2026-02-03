import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  // 1️⃣ List all categories to scan
  const categories = ['beaches', 'cultural', 'forts', 'hills', 'nature', 'religious'];

  try {
    // 2️⃣ Use Promise.all to scan all category directories in parallel
    const allCategoryResults = await Promise.all(
      categories.map(async (cat) => {
        const dirPath = path.join(process.cwd(), 'public', 'data', cat);

        try {
          // Check if directory exists
          await fs.access(dirPath);
          const files = (await fs.readdir(dirPath)).filter(f => f.endsWith('.json'));

          // Read all JSON files in this category folder
          return await Promise.all(
            files.map(async (file) => {
              try {
                const filePath = path.join(dirPath, file);
                const fileContent = await fs.readFile(filePath, 'utf8');
                const item = JSON.parse(fileContent);

                // Map JSON fields to Map requirements
                return {
                  id: item.id,
                  name: item.title,
                  subtitle: item.subtitle,
                  image: item.bannerImage,
                  coordinates: item.coordinates, 
                  category: cat,
                  color: item.color || '#333'
                };
              } catch (err) {
                console.error(`❌ Error in ${file}:`, err);
                return null;
              }
            })
          );
        } catch (err) {
          // If a category folder doesn't exist, skip it safely
          return [];
        }
      })
    );

    // 3️⃣ Flatten the nested arrays and remove any null results
    const allData = allCategoryResults.flat().filter(item => item !== null);

    return NextResponse.json(allData);

  } catch (error) {
    console.error("🌍 Global Map API Error:", error);
    return NextResponse.json({ error: "Data fetch failed" }, { status: 500 });
  }
}