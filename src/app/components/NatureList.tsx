'use client'

import React, { useEffect, useState } from 'react'
import BeachSlider from './beaches/BeachSlider'

interface Nature {
  id: string
  title: string
  subtitle: string
  bannerImage: string
  color?: string
}

const NatureList: React.FC = () => {
  const [items, setItems] = useState<Nature[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/nature')
        const json = await res.json()
        if (json.success) setItems(json.data.slice(0, 5))
      } catch (err) {
        console.error(err)
      }
    }
    fetchItems()
  }, [])

  const generateSlug = (id?: string) =>
    (id || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <>
      {items.length > 0 ? (
        <BeachSlider beaches={items} category="nature" generateSlug={generateSlug} />
      ) : (
        <p className="text-center py-10 text-gray-600">Loading nature...</p>
      )}
    </>
  )
}

export default NatureList
