import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  // 🛡️ 1. Security Handshake Check
  const ADMIN_KEY = process.env.ADMIN_SECRET_KEY;
  const authToken = request.headers.get('x-admin-token');

  // Verify that the token matches your environment variable
  if (!authToken || authToken !== ADMIN_KEY) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  // List all categories to scan
  const categories = ['beaches', 'cultural', 'forts', 'hills', 'nature', 'religious'];

  try {
    const allCategoryResults = await Promise.all(
      categories.map(async (cat) => {
        const dirPath = path.join(process.cwd(), 'public', 'data', cat);

        try {
          await fs.access(dirPath);
          const files = (await fs.readdir(dirPath)).filter(f => f.endsWith('.json'));

          return await Promise.all(
            files.map(async (file) => {
              try {
                const filePath = path.join(dirPath, file);
                const fileContent = await fs.readFile(filePath, 'utf8');
                const item = JSON.parse(fileContent);

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
          return []; // Skip safely if directory doesn't exist
        }
      })
    );

    // Flatten and clean the results
    const allData = allCategoryResults.flat().filter(item => item !== null);

    // 🛡️ Always return a valid array to prevent frontend f.map crashes
    return NextResponse.json(allData);

  } catch (error) {
    console.error("🌍 Global Map API Error:", error);
    // Even on error, return an object or array the frontend expects
    return NextResponse.json([], { status: 500 });
  }
}