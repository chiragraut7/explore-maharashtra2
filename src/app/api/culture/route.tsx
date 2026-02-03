import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1️⃣ Map to your local culture data directory
    const dirPath = path.join(process.cwd(), 'public/data/culture');
    
    // 2️⃣ Asynchronously check if the directory exists and read it
    let files: string[];
    try {
      files = await fs.readdir(dirPath);
    } catch (err) {
      // If folder is missing, return success with empty array
      return NextResponse.json({ success: true, data: [] });
    }

    // 3️⃣ Process JSON files in parallel for maximum speed
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
          console.error(`❌ Skip corrupted file: ${file}`, parseErr);
          return [];
        }
      })
    );

    // 4️⃣ Flatten the data (in case some JSON files contain arrays)
    const flattenedData = data.flat();

    return NextResponse.json({ 
      success: true, 
      count: flattenedData.length,
      data: flattenedData 
    });

  } catch (error: any) {
    console.error("🏯 Culture API Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}