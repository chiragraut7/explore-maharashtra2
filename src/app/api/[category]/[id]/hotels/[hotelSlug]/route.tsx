// ./src/app/api/[category]/[id]/hotels/[hotelSlug]/route.tsx
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

interface Params {
  category: string;
  id: string;
  hotelSlug: string;
}

export async function GET(
  req: Request,
  { params }: { params: Params }
) {
  const { category, id, hotelSlug } = params;

  const hotelFilePath = path.join(
    process.cwd(),
    "public",
    "data",
    category,
    id,
    "hotels",
    `${hotelSlug}.json`
  );

  try {
    const jsonData = await fs.readFile(hotelFilePath, "utf-8");
    const hotel = JSON.parse(jsonData);
    return NextResponse.json(hotel);
  } catch (err) {
    console.error(`Error fetching hotel data:`, err);
    return NextResponse.json(
      { error: `Hotel "${hotelSlug}" not found in ${category}/${id}` },
      { status: 404 }
    );
  }
}
