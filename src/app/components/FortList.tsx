'use client'

import React, { useEffect, useState } from 'react'
import BeachSlider from './beaches/BeachSlider'

interface Fort {
  id: string
  title: string
  subtitle: string
  bannerImage: string
  color?: string
}

const FortList: React.FC = () => {
  const [forts, setForts] = useState<Fort[]>([])

  useEffect(() => {
    const fetchForts = async () => {
      try {
        const res = await fetch('/api/forts')
        const json = await res.json()
        if (json.success) setForts(json.data.slice(0, 5))
      } catch (err) {
        console.error(err)
      }
    }
    fetchForts()
  }, [])

  const generateSlug = (id?: string) =>
    (id || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <>
      {forts.length > 0 ? (
        <BeachSlider beaches={forts} category="forts" generateSlug={generateSlug} />
      ) : (
        <p className="text-center py-10 text-gray-600">Loading forts...</p>
      )}
    </>
  )
}

export default FortList
