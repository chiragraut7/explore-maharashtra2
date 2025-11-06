'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Item } from '../../types'
import { useLanguage } from '../context/LanguageContext'
import Translator from '../commonComponents/Translator'

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

  return (
    <div className="h-100 shadow-sm border-0 rounded-3 overflow-hidden">
      {/* 🏖️ Beach Image */}
      <div className="homeSliderImg">
        <Image
          src={beach.bannerImage}
          alt={beach.title}
          width={500}
          height={300}
          className="card-img-top object-cover"
        />
      </div>

      {/* 📝 Beach Info */}
      <div className="homeSilderText p-3">
        <h2 className="text-xl font-semibold mb-2">
          <Translator text={beach.title} targetLang={language} />
        </h2>
        <p className="text-gray-700 mb-3">
          <Translator text={beach.subtitle} targetLang={language} />
        </p>

        {/* 🔗 View More Button */}
        <Link
          key={beach.id}
          href={`/${category}/${generateSlug(beach.id)}`}
          className="view-more-arrow inline-flex items-center gap-2"         
        >
          <span>
            <Translator text={btnLabel || 'View More'} targetLang={language} />
          </span>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  )
}

export default BeachCard
