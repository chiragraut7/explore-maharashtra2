'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'
import Translator from '../commonComponents/Translator'
import { Item } from '../../types'

interface BeachCardProps {
  beach: Item
  category: string
  generateSlug: (id: string) => string
  btnLabel: string
  btnColor: string
}

const BeachCard: React.FC<BeachCardProps> = ({
  beach,
  category,
  generateSlug,
  btnLabel,
  btnColor,
}) => {
  const { language } = useLanguage()

  // ✅ Safe image fallback logic
  const imageSrc = beach.insideBannerImage || beach.bannerImage || '/images/noimage.jpg'

  return (
    <div className="h-100 shadow-sm border-0 rounded-3 overflow-hidden transition-all duration-300">
      {/* 🏖️ Beach Image */}
      <div className="homeSliderImg overflow-hidden">
        <Image
          src={imageSrc}
          alt={beach.title || 'Beach Image'}
          width={600}
          height={350}
          className="card-img-top object-cover hover:scale-105 transition-transform duration-500 h-100"
          priority
        />
      </div>

      {/* 📝 Beach Info */}
      <div className="homeSilderText p-4 text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          <Translator text={beach.title || ''} targetLang={language} />
        </h2>

        {beach.subtitle && (
          <p className="text-gray-600 mb-3 text-sm leading-relaxed">
            <Translator text={beach.subtitle || ''} targetLang={language} />
          </p>
        )}

        {/* 🔗 View More Button */}
        <Link
          href={`/${category}/${generateSlug(beach.id?.toString() || '')}`}
          className="btn btn-outline-dark"
          style={{
            backgroundColor: btnColor || 'var(--primary-color)',
            color: '#fff',
            border:"0",
          }}
        >
          <Translator text={'View More'} targetLang={language} />
        </Link>
      </div>
    </div>
  )
}

export default BeachCard
