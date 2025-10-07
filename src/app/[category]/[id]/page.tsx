'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

import Banner from '../../components/commonComponents/Banner'
import Overview from '../../components/commonComponents/Overview'
import Highlights from '../../components/commonComponents/Highlights'
import Geography from '../../components/commonComponents/Geography'
import Activities from '../../components/commonComponents/Activities'
import Attractions from '../../components/commonComponents/Attractions'
import MarineLife from '../../components/commonComponents/MarineLife'
import HowToReach from '../../components/commonComponents/HowToReach'
import Gallery from '../../components/commonComponents/Gallery'
import Hotels from '../../components/commonComponents/Hotels'
import BookingTips from '../../components/commonComponents/BookingTips'
import ComingSoon from '../../components/commonComponents/ComingSoon'

// -------------------- Types --------------------
type DetailItem = { icon?: string; label?: string; value?: string }

type GeographyContent = {
  image?: string
  intro?: string
  details?: DetailItem[]
  climate?: { description?: string; seasons?: { icon?: string; text?: string }[] }
  conclusion?: string
}

type Activity = {
  icon?: string
  title?: string
  description?: string
  details?: DetailItem[]
}

type Attraction = {
  image?: string
  title?: string
  description?: string
  icon?: string
  label?: string
  value?: string
}

type MarineItem = {
  icon?: string
  title?: string
  description?: string
}

type MarineLifeContent = {
  title?: string
  intro?: string
  items?: MarineItem[]
  conclusion?: string[]
}

type TransportItem = {
  icon?: string
  title?: string
  details?: string[]
}

type GalleryImage = {
  src?: string
  thumb?: string
  alt?: string
}

type BookingTip = {
  title?: string
  description?: string
}

type Destination = {
  title: string
  subtitle?: string
  bannerImage?: string
  color?: string
  overview?: { title?: string; description?: string }
  highlights?: { icon?: string; title?: string; description?: string }[]
  geography?: GeographyContent
  activities?: Activity[]
  attractions?: Attraction[]
  marineLife?: MarineLifeContent
  gallery?: GalleryImage[]
  howToReach?: TransportItem[]
  bookingTips?: BookingTip[]
}

// -------------------- Component --------------------
export default function ItemPage() {
  const { category, id } = useParams() as { category?: string; id?: string }
  const [data, setData] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'info' | 'hotels'>('info')

  useEffect(() => {
    if (!category || !id) return
    setLoading(true)

    fetch(`/api/${category}/${id}`)
      .then(res => res.json())
      .then((json: Destination) => setData(json))
      .catch(err => console.error('Failed to fetch data', err))
      .finally(() => setLoading(false))
  }, [category, id])

  if (loading)
    return (
      <div className="page-loader flex flex-col items-center justify-center min-h-screen">
        <div className="spinner mb-4"></div>
        <div className="txt text-center">
          <Image
            src="/assets/images/logo_icon.png"
            alt="Logo"
            width={200}
            height={200}
            className="rounded"
            priority={true}
          />
          <p className="pt-5 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    )

  if (!data)
    return (
      <div className="text-center py-10 text-warning text-lg font-semibold">
        Data not found
      </div>
    )

  return (
    <>
      <Banner
        title={data.title}
        subtitle={data.subtitle}
        image={data.bannerImage}
        color={data.color}
        view={view}
        setView={setView}
      />

      <main className="container my-5">
        {view === 'info' && (
          <div id="overViewInfo">
            {data.overview && <Overview content={data.overview} color={data.color} />}
            {data.highlights && data.highlights.length > 0 && (
              <Highlights highlights={data.highlights} color={data.color} />
            )}
            {data.geography && <Geography content={data.geography} color={data.color} />}
            {data.activities && data.activities.length > 0 && (
              <Activities activities={data.activities} color={data.color} />
            )}
            {data.attractions && data.attractions.length > 0 && (
              <Attractions items={data.attractions} color={data.color} />
            )}
            {data.marineLife && <MarineLife content={data.marineLife} color={data.color} />}
            {data.gallery && data.gallery.length > 0 && (
              <Gallery images={data.gallery} color={data.color} />
            )}
            {data.howToReach && data.howToReach.length > 0 && (
              <HowToReach transport={data.howToReach} color={data.color} />
            )}
          </div>
        )}

        {view === 'hotels' && (
          <>
            <div id="comingSoon">
              <ComingSoon />
            </div>
            <div id="hotelsList" className="hidden">
              <Hotels />
              {data.bookingTips && data.bookingTips.length > 0 && (
                <BookingTips tips={data.bookingTips} />
              )}
            </div>
          </>
        )}
      </main>
    </>
  )
}
