import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } }
) {
  // Await params here as per Next.js 15 dynamic API change
  const { category } = await params;

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    const folderPath = path.join(process.cwd(), "public", "data", category);

    // check if folder exists
    let files: string[] = [];
    try {
      files = await fs.readdir(folderPath);
    } catch {
      // no folder → return empty array
      return NextResponse.json([]);
    }

    const items = await Promise.all(
      files
        .filter((f) => f.endsWith(".json")) // only JSON files
        .map(async (file) => {
          try {
            const filePath = path.join(folderPath, file);
            const content = await fs.readFile(filePath, "utf-8");
            const parsed = JSON.parse(content);

            // normalize - always return an array
            return Array.isArray(parsed) ? parsed : [parsed];
          } catch (err) {
            console.error(`❌ Failed to read ${file}:`, err);
            return [];
          }
        })
    );

    return NextResponse.json(items.flat());
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch category data" },
      { status: 500 }
    );
  }
}
