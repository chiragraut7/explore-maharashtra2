import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  // 🛡️ 1. Security Handshake Check
  const ADMIN_KEY = process.env.ADMIN_SECRET_KEY;
  const authToken = request.headers.get('x-admin-token');

  // Verify token matches the environment variable set in Vercel
  if (!authToken || authToken !== ADMIN_KEY) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  try {
    // 2. Map to your local culture data directory
    const dirPath = path.join(process.cwd(), 'public/data/culture');
    
    let files: string[];
    try {
      await fs.access(dirPath); // Check if directory exists
      files = await fs.readdir(dirPath);
    } catch (err) {
      // If folder is missing, return success with empty array to prevent UI crash
      return NextResponse.json({ success: true, data: [] });
    }

    // 3. Process JSON files in parallel
    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    
    const data = await Promise.all(
      jsonFiles.map(async (file) => {
        try {
          const filePath = path.join(dirPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = JSON.parse(content);
          
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (parseErr) {
          console.error(`❌ Skip corrupted file: ${file}`, parseErr);
          return [];
        }
      })
    );

    // 4. Flatten and return standardized data
    const flattenedData = data.flat();

    return NextResponse.json({ 
      success: true, 
      count: flattenedData.length,
      data: flattenedData 
    });

  } catch (error: any) {
    console.error("🏯 Culture API Error:", error.message);
    // Return empty array on error to prevent f.map crashes in frontend
    return NextResponse.json(
      { success: false, data: [], error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}