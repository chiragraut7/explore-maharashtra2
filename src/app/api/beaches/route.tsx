import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1️⃣ Point to your local data folder
    const dirPath = path.join(process.cwd(), 'public/data/beaches');
    
    // 2️⃣ Asynchronously read the directory (Non-blocking)
    let files: string[];
    try {
      files = await fs.readdir(dirPath);
    } catch (err) {
      // If the folder is missing, return a clean empty response
      return NextResponse.json({ success: true, data: [] });
    }

    // 3️⃣ Filter for JSON files and read them in parallel
    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    
    const data = await Promise.all(
      jsonFiles.map(async (file) => {
        try {
          const filePath = path.join(dirPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          return JSON.parse(content);
        } catch (parseErr) {
          console.error(`❌ Failed to parse ${file}:`, parseErr);
          return null; // Skip corrupted files
        }
      })
    );

    // 4️⃣ Filter out any nulls from failed parses and return
    const filteredData = data.filter(item => item !== null);

    return NextResponse.json({ 
      success: true, 
      count: filteredData.length,
      data: filteredData 
    });

  } catch (error: any) {
    console.error("🌊 Beach API Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}