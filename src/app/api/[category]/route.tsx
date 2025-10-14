import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(req: NextRequest, context: any) {
  // Await params properly in Next.js 14+ dynamic routes
  const { category } = context.params;

  if (!category) {
    return NextResponse.json({ success: false, error: "Category is required" }, { status: 400 });
  }

  try {
    const folderPath = path.join(process.cwd(), "public", "data", category);

    // Check if folder exists
    let files: string[] = [];
    try {
      files = await fs.readdir(folderPath);
    } catch {
      return NextResponse.json({ success: true, data: [] });
    }

    // Read all JSON files in folder
    const items = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (file) => {
          try {
            const filePath = path.join(folderPath, file);
            const content = await fs.readFile(filePath, "utf-8");
            const parsed = JSON.parse(content);
            return Array.isArray(parsed) ? parsed : [parsed];
          } catch (err) {
            console.error(`❌ Failed to read ${file}:`, err);
            return [];
          }
        })
    );

    // Flatten array and return with success
    return NextResponse.json({ success: true, data: items.flat() });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
