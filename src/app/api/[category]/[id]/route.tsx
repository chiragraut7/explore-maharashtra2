import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  const { category, id } = await params

  // Helper function to check if file exists
  async function fileExists(filePath: string) {
    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }

  try {
    const basePath = path.join(process.cwd(), "public", "data", category)

    // Try direct file match (e.g. kelva-beach.json)
    const slugFile = path.join(basePath, `${id}.json`)
    if (await fileExists(slugFile)) {
      const jsonData = await fs.readFile(slugFile, "utf-8")
      return NextResponse.json(JSON.parse(jsonData))
    }

    // Otherwise check index.json for mapping id -> slug
    const indexFile = path.join(basePath, "index.json")
    if (await fileExists(indexFile)) {
      const indexData = JSON.parse(await fs.readFile(indexFile, "utf-8"))
      const found = indexData.find((item: any) => item.id === id)

      if (found) {
        const mappedFile = path.join(basePath, `${found.slug}.json`)
        if (await fileExists(mappedFile)) {
          const jsonData = await fs.readFile(mappedFile, "utf-8")
          return NextResponse.json(JSON.parse(jsonData))
        }
      }
    }

    return NextResponse.json({ error: `No data found for ${id}` }, { status: 404 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    )
  }
}
