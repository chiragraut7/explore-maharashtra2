'use client'

import React, { useEffect, useState } from 'react'
import BeachSlider from './beaches/BeachSlider'
import { Item } from '@/app/types' // ✅ import shared type

interface Props {
  category: string
}

const CategoryList: React.FC<Props> = ({ category }) => {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/${category}`)
        const json = await res.json()

        if (Array.isArray(json)) {
          // Map API response to match Item type
          const formatted: Item[] = json.slice(0, 5).map((item: any) => ({
            id: String(item.id ?? item.title ?? Math.random().toString()), // ensure string id
            title: item.title,
            subtitle: item.subtitle,
            bannerImage: item.bannerImage,
            color: item.color,
          }))
          setItems(formatted)
        } else {
          console.error('Unexpected API response', json)
        }
      } catch (err) {
        console.error(`Failed to fetch ${category}`, err)
      }
    }

    fetchItems()
  }, [category])

  // Generate slug from title
  const generateSlug = (id: string) =>
    id.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <>
      {items.length > 0 ? (
        <BeachSlider beaches={items} category={category} generateSlug={generateSlug} />
      ) : (
        <p className="text-center py-10 text-gray-600">Loading {category}...</p>
      )}
    </>
  )
}

export default CategoryList
