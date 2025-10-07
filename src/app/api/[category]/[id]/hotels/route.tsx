// app/api/[category]/[id]/hotels/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Context {
  params: {
    category: string;
    id: string;
  };
}

export async function GET(req: Request, context: Context) {
  const { category, id } = context.params;

  const destinationFolder = path.join(process.cwd(), "public", "data", category, id);

  // Helper to check folder existence
  async function folderExists(folderPath: string) {
    try {
      const stat = await fs.stat(folderPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }

  if (!(await folderExists(destinationFolder))) {
    return NextResponse.json({ error: "Destination folder not found" }, { status: 404 });
  }

  const hotelsFolder = path.join(destinationFolder, "hotels");
  const folderToRead = (await folderExists(hotelsFolder)) ? hotelsFolder : destinationFolder;

  let files: string[] = [];
  try {
    const allFiles = await fs.readdir(folderToRead);
    files = allFiles.filter(f => f.endsWith(".json"));
  } catch {
    return NextResponse.json({ error: "Failed to read folder" }, { status: 500 });
  }

  if (files.length === 0) return NextResponse.json([], { status: 200 });

  const hotels = await Promise.all(
    files.map(async file => {
      const content = await fs.readFile(path.join(folderToRead, file), "utf-8");
      return JSON.parse(content);
    })
  );

  return NextResponse.json(hotels, { status: 200 });
}
