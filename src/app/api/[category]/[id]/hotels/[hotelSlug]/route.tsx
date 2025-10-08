import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// ✅ Define params inline (no Next.js type import needed)
export async function GET(
  req: Request,
  context: { params: { category: string; id: string; hotelSlug: string } }
) {
  const { category, id, hotelSlug } = context.params;

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
    console.error("Error fetching hotel data:", err);
    return NextResponse.json(
      { error: `Hotel "${hotelSlug}" not found in ${category}/${id}` },
      { status: 404 }
    );
  }
}
