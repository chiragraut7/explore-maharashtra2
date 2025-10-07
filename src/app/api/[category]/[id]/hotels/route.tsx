// app/api/[category]/[id]/hotels/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request, context: any) {
  // Await params
  const params = await context.params;
  const category = params.category;
  const id = params.id;

  // Base path to destination folder
  const destinationFolder = path.join(
    process.cwd(),
    "public",
    "data",
    category,
    id
  );

  if (!fs.existsSync(destinationFolder)) {
    return NextResponse.json(
      { error: "Destination folder not found" },
      { status: 404 }
    );
  }

  // Look for 'hotels' subfolder first, fallback to destination folder
  const hotelsFolder = path.join(destinationFolder, "hotels");
  const folderToRead = fs.existsSync(hotelsFolder) ? hotelsFolder : destinationFolder;

  const files = fs.readdirSync(folderToRead).filter(f => f.endsWith(".json"));

  if (files.length === 0) return NextResponse.json([], { status: 200 });

  const hotels = files.map(file => {
    const content = fs.readFileSync(path.join(folderToRead, file), "utf-8");
    return JSON.parse(content);
  });

  return NextResponse.json(hotels, { status: 200 });
}
