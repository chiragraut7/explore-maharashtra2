import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1️⃣ Map to your local forts data directory
    const dirPath = path.join(process.cwd(), 'public/data/forts');
    
    // 2️⃣ Asynchronously read the directory (Non-blocking)
    let files: string[];
    try {
      files = await fs.readdir(dirPath);
    } catch (err) {
      // Return success with empty array if folder is missing
      return NextResponse.json({ success: true, data: [] });
    }

    // 3️⃣ Filter for JSON files and process them in parallel
    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    
    const data = await Promise.all(
      jsonFiles.map(async (file) => {
        try {
          const filePath = path.join(dirPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = JSON.parse(content);
          
          // Ensure we return an array of objects
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (parseErr) {
          console.error(`❌ Skip corrupted fort file: ${file}`, parseErr);
          return [];
        }
      })
    );

    // 4️⃣ Flatten the results for a clean list of all forts
    const allForts = data.flat();

    return NextResponse.json({ 
      success: true, 
      count: allForts.length,
      data: allForts 
    });

  } catch (error: any) {
    console.error("🏰 Forts API Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}