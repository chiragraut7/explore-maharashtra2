import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1️⃣ Path to your local nature data folder
    const dirPath = path.join(process.cwd(), 'public/data/nature');
    
    // 2️⃣ Asynchronous read to keep the server responsive
    let files: string[];
    try {
      files = await fs.readdir(dirPath);
    } catch (err) {
      // If the folder doesn't exist yet, return empty array safely
      return NextResponse.json({ success: true, data: [] });
    }

    // 3️⃣ Filter JSON files and read in parallel for maximum speed
    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    
    const data = await Promise.all(
      jsonFiles.map(async (file) => {
        try {
          const filePath = path.join(dirPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = JSON.parse(content);
          
          // Flatten data if a single JSON file contains an array
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (parseErr) {
          console.error(`❌ Error parsing nature file: ${file}`, parseErr);
          return [];
        }
      })
    );

    // 4️⃣ Combine all results into one clean list
    const allNature = data.flat();

    return NextResponse.json({ 
      success: true, 
      count: allNature.length,
      data: allNature 
    });

  } catch (error: any) {
    console.error("🌿 Nature API Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}