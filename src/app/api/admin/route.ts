import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const dataPath = path.join(process.cwd(), "public", "data");

async function readCategoryFiles(category: string) {
  const categoryPath = path.join(dataPath, category);
  const destinations: any[] = [];

  try {
    const files = await fs.readdir(categoryPath);

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const stat = await fs.stat(filePath);

      // ✅ Skip directories unless it's a destination folder
      if (stat.isDirectory()) {
        const destinationJson = path.join(filePath, `${file}.json`);
        let destinationData: any = { slug: file, name: file, hotels: [] };

        try {
          const content = await fs.readFile(destinationJson, "utf-8");
          destinationData = { ...JSON.parse(content), slug: file };
        } catch {
          // no main JSON, fallback
        }

        // ✅ Read hotels inside this destination
        const hotelsPath = path.join(filePath, "hotels");
        try {
          const hotelFiles = await fs.readdir(hotelsPath);
          const hotels = [];
          for (const hFile of hotelFiles) {
            if (hFile.endsWith(".json")) {
              const hContent = await fs.readFile(
                path.join(hotelsPath, hFile),
                "utf-8"
              );
              hotels.push(JSON.parse(hContent));
            }
          }
          destinationData.hotels = hotels;
          destinationData.hotelCount = hotels.length;
        } catch {
          destinationData.hotels = [];
          destinationData.hotelCount = 0;
        }

        destinations.push(destinationData);
      } else if (file.endsWith(".json")) {
        // ✅ handle flat JSON destination
        const content = await fs.readFile(filePath, "utf-8");
        const parsed = JSON.parse(content);

        const hotelsPath = path.join(
          categoryPath,
          file.replace(".json", ""),
          "hotels"
        );
        let hotels: any[] = [];
        try {
          const hotelFiles = await fs.readdir(hotelsPath);
          hotels = [];
          for (const hFile of hotelFiles) {
            if (hFile.endsWith(".json")) {
              const hContent = await fs.readFile(
                path.join(hotelsPath, hFile),
                "utf-8"
              );
              hotels.push(JSON.parse(hContent));
            }
          }
        } catch {
          hotels = [];
        }

        destinations.push({
          ...parsed,
          slug: file.replace(".json", ""),
          hotels,
          hotelCount: hotels.length,
        });
      }
    }
  } catch (error) {
    console.error(`Error reading category '${category}':`, error);
  }

  return destinations;
}

export async function GET() {
  try {
    const beaches = await readCategoryFiles("beaches");
    const hills = await readCategoryFiles("hills");
    const forts = await readCategoryFiles("forts");
    const nature = await readCategoryFiles("nature");
    const religious = await readCategoryFiles("religious");

    const summary = {
      beaches: beaches.length,
      hills: hills.length,
      forts: forts.length,
      nature: nature.length,
      religious: religious.length,
    };

    return NextResponse.json({
      summary,
      beaches,
      hills,
      forts,
      nature,
      religious,
    });
  } catch (error) {
    console.error("Failed to load admin data", error);
    return NextResponse.json(
      { error: "Failed to load admin data" },
      { status: 500 }
    );
  }
}
