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

  try {
    // 2. Point to your local data folder
    const dirPath = path.join(process.cwd(), 'public/data/beaches');
    
    let files: string[];
    try {
      await fs.access(dirPath); // Check if directory exists
      files = await fs.readdir(dirPath);
    } catch (err) {
      // If the folder is missing, return a clean empty response
      return NextResponse.json({ success: true, data: [] });
    }

    // 3. Filter for JSON files and read them in parallel
    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    
    const data = await Promise.all(
      jsonFiles.map(async (file) => {
        try {
          const filePath = path.join(dirPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = JSON.parse(content);
          
          // Return item or flatten if it's already an array
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (parseErr) {
          console.error(`❌ Failed to parse ${file}:`, parseErr);
          return []; // Skip corrupted files
        }
      })
    );

    // 4. Flatten the data and filter out empty results
    const allBeaches = data.flat();

    // 🛡️ Always return a standardized structure to prevent frontend f.map crashes
    return NextResponse.json({ 
      success: true, 
      count: allBeaches.length,
      data: allBeaches 
    });

  } catch (error: any) {
    console.error("🌊 Beach API Error:", error.message);
    // Return empty array on error to keep the frontend stable
    return NextResponse.json(
      { success: false, data: [], error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}