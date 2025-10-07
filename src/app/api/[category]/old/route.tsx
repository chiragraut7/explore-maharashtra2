import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(
  req: Request,
  { params }: { params: { category: string; destination: string } }
) {
  try {
    const { category, destination } = params;

    // Folder path inside "public"
    const folderPath = path.join(
      process.cwd(),
      "public",
      "data",
      category,
      destination
    );

    // Read all .json files in folder
    const files = await fs.readdir(folderPath);
    const hotelFiles = files.filter((f) => f.endsWith(".json"));

    // Load JSON for each hotel
    const hotels = await Promise.all(
      hotelFiles.map(async (file) => {
        const content = await fs.readFile(path.join(folderPath, file), "utf-8");
        return JSON.parse(content);
      })
    );

    return NextResponse.json(hotels);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load hotels" },
      { status: 500 }
    );
  }
}
