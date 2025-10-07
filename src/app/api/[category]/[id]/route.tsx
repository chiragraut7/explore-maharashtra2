import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

interface Params {
  category: string
  id: string
}

interface IndexItem {
  id: string
  slug: string
}

export async function GET(
  req: Request,
  { params }: { params: Params }
) {
  const { category, id } = params

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
      const indexData: IndexItem[] = JSON.parse(await fs.readFile(indexFile, "utf-8"))
      const found = indexData.find(item => item.id === id)

      if (found) {
        const mappedFile = path.join(basePath, `${found.slug}.json`)
        if (await fileExists(mappedFile)) {
          const jsonData = await fs.readFile(mappedFile, "utf-8")
          return NextResponse.json(JSON.parse(jsonData))
        }
      }
    }

    return NextResponse.json({ error: `No data found for ${id}` }, { status: 404 })
  } catch (err: unknown) {
    let message = "Something went wrong"
    if (err instanceof Error) message = err.message

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
