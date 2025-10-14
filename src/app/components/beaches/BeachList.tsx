'use client'

import React, { useEffect, useState } from 'react'
import BeachSlider from '../BeachSlider'

interface Beach {
  id: string
  title: string
  subtitle: string
  bannerImage: string
  color?: string
}

const BeachList: React.FC = () => {
  const [beaches, setBeaches] = useState<Beach[]>([])

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const res = await fetch('/api/beaches')
        const json = await res.json()
        if (json.success) setBeaches(json.data.slice(0, 5)) // first 5
      } catch (err) {
        console.error(err)
      }
    }
    fetchBeaches()
  }, [])

  const generateSlug = (id?: string) =>
    (id || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <>
      {beaches.length > 0 ? (
        <BeachSlider beaches={beaches} category="beaches" generateSlug={generateSlug} />
      ) : (
        <p className="text-center py-10 text-gray-600">Loading beaches...</p>
      )}
    </>
  )
}

export default BeachList
