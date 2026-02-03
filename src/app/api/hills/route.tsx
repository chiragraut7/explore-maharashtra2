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
    // 2. Path to your local hills station data
    const dirPath = path.join(process.cwd(), 'public/data/hills');
    
    let files: string[];
    try {
      await fs.access(dirPath); // Check if directory exists
      files = await fs.readdir(dirPath);
    } catch (err) {
      // If folder is missing, return success with empty array safely
      return NextResponse.json({ success: true, data: [] });
    }

    // 3. Filter JSON files and read in parallel for speed
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
          console.error(`❌ Error parsing hill station file: ${file}`, parseErr);
          return [];
        }
      })
    );

    // 4. Combine all results into one clean list
    const allHills = data.flat();

    // 🛡️ Always return a standardized structure to prevent frontend f.map crashes
    return NextResponse.json({ 
      success: true, 
      count: allHills.length,
      data: allHills 
    });

  } catch (error: any) {
    console.error("⛰️ Hills API Error:", error.message);
    // Return empty array on error to keep the frontend stable
    return NextResponse.json(
      { success: false, data: [], error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}