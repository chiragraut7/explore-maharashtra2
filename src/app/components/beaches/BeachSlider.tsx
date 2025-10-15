'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules' // ✅ include EffectFade
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade' // ✅ import fade effect CSS
import BeachCard from './BeachCard'
import { Item } from '@/app/types'

interface BeachSliderProps {
  beaches: Item[]
  category: string
  generateSlug: (id: string) => string
}

const categoryColors: Record<string, string> = {
  beaches: '#f45133',
  hills: '#4CAF50',
  forts: '#9C27B0',
  nature: '#3F51B5',
  religious: '#FF9800',
  cultural: '#00BCD4',
}

const categoryLabels: Record<string, string> = {
  beaches: 'View Beach',
  hills: 'View Hill Station',
  forts: 'View Fort',
  nature: 'View Nature Spot',
  religious: 'View Religious Place',
  cultural: 'View Cultural Spot',
}

const BeachSlider: React.FC<BeachSliderProps> = ({ beaches, category, generateSlug }) => {
  return (
    <div className="relative fade-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]} // ✅ added EffectFade
        spaceBetween={20}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000} // ✅ transition duration
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // ✅ pauses on hover
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        className="py-6"
      >
        {beaches.map((beach) => (
          <SwiperSlide key={beach.id}>
            <BeachCard
              beach={beach}
              category={category}
              generateSlug={generateSlug}
              btnLabel={categoryLabels[category] || 'View More'}
              btnColor={beach.color || categoryColors[category] || '#00aaff'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BeachSlider
