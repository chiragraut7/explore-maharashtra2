'use client'

import React, { useEffect, useState } from 'react'
import BeachSlider from './beaches/BeachSlider'

interface Hill {
  id: string
  title: string
  subtitle: string
  bannerImage: string
  color?: string
}

const HillList: React.FC = () => {
  const [hills, setHills] = useState<Hill[]>([])

  useEffect(() => {
    const fetchHills = async () => {
      try {
        const res = await fetch('/api/hills')
        const json = await res.json()
        if (json.success) setHills(json.data.slice(0, 5))
      } catch (err) {
        console.error(err)
      }
    }
    fetchHills()
  }, [])

  const generateSlug = (id?: string) =>
    (id || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <>
      {hills.length > 0 ? (
        <BeachSlider beaches={hills} category="hills" generateSlug={generateSlug} />
      ) : (
        <p className="text-center py-10 text-gray-600">Loading hills...</p>
      )}
    </>
  )
}

export default HillList
