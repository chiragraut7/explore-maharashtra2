import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

interface Params {
  category: string;
  id: string;
  hotelSlug: string;
}

// ✅ FIX: The second argument must be named `context` with `.params`
export async function GET(request: Request, context: { params: Params }) {
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
    console.error(`Error fetching hotel data:`, err);
    return NextResponse.json(
      { error: `Hotel "${hotelSlug}" not found in ${category}/${id}` },
      { status: 404 }
    );
  }
}
