'use client'

import React, { useEffect, useState } from 'react'
import BeachSlider from './beaches/BeachSlider'

interface Item {
  title: string
  subtitle: string
  bannerImage: string
  color?: string
}

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
          setItems(json.slice(0, 5)) // first 5 items
        } else {
          console.error('Unexpected API response', json)
        }
      } catch (err) {
        console.error(`Failed to fetch ${category}`, err)
      }
    }
    fetchItems()
  }, [category])

  // generate slug for URLs
  const generateSlug = (item: Item) =>
    item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

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
