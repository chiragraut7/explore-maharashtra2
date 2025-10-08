// src/app/api/[category]/[id]/hotels/route.tsx
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(
  req: Request,
  context: { params: { [key: string]: string } } // <-- must be this
) {
  const { category, id } = context.params;

  const hotelsPath = path.join(
    process.cwd(),
    "public",
    "data",
    category,
    id,
    "hotels"
  );

  try {
    const files = await fs.readdir(hotelsPath);
    const hotels = await Promise.all(
      files.map(async (file) => {
        const data = await fs.readFile(path.join(hotelsPath, file), "utf-8");
        return JSON.parse(data);
      })
    );

    return NextResponse.json(hotels);
  } catch (err) {
    console.error(`Error fetching hotels:`, err);
    return NextResponse.json(
      { error: `No hotels found for ${category}/${id}` },
      { status: 404 }
    );
  }
}
