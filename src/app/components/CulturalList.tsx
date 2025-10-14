'use client'

import React, { useEffect, useState } from 'react'
import BeachSlider from './beaches/BeachSlider'

interface Cultural {
  id: string
  title: string
  subtitle: string
  bannerImage: string
  color?: string
}

const CulturalList: React.FC = () => {
  const [items, setItems] = useState<Cultural[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/culture')
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
        <BeachSlider beaches={items} category="culture" generateSlug={generateSlug} />
      ) : (
        <p className="text-center py-10 text-gray-600">Loading cultural spots...</p>
      )}
    </>
  )
}

export default CulturalList
