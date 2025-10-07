'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

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


export default function ItemPage() {
  const { category, id } = useParams() as { category?: string; id?: string }
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'info' | 'hotels'>('info')

  useEffect(() => {
    if (!category || !id) return
    setLoading(true)
    fetch(`/api/${category}/${id}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Failed to fetch data', err))
      .finally(() => setLoading(false))
  }, [category, id])

  if (loading) return <div className="page-loader"><div className="spinner"></div><div className="txt"><img src="/assets/images/logo_icon.png" width="200" alt="Logo" /><p className="pt-5">Loading...</p></div></div>
  if (!data) return <div className="text-center py-10 text-warning">Data not found</div>

  return (
    <>
      <Banner
        title={data.title}
        subtitle={data.subtitle}
        image={data.bannerImage}
        color={data.color}   // dynamically from JSON
        view={view}
        setView={setView}
      />

      <main className="container my-5">
        {view === 'info' && (
          <div id="overViewInfo">
            <Overview content={data.overview} color={data.color} />
            {data.highlights?.length > 0 && (
              <Highlights highlights={data.highlights} color={data.color} />
            )}
            {data.geography && <Geography content={data.geography} color={data.color} />}
            {data.activities?.length > 0 && <Activities activities={data.activities} color={data.color} />}
            {data.attractions?.length > 0 && <Attractions items={data.attractions} color={data.color} />}
            {data.marineLife && <MarineLife content={data.marineLife} color={data.color} />}
            {data.gallery?.length > 0 && <Gallery images={data.gallery} color={data.color} />}
            {data.howToReach?.length > 0 && <HowToReach transport={data.howToReach} color={data.color} />}

          </div>
        )}

        {view === 'hotels' && (
          <>
            <div id="comingSoon">
              {/* need here comingSoon*/}
              <ComingSoon />
            </div>
            <div id="hotelsList" style={{display:"none"}}>
              <Hotels />
              {data.bookingTips?.length > 0 && <BookingTips tips={data.bookingTips} />}
            </div>
          </>
        )}
      </main>
    </>
  )
}
