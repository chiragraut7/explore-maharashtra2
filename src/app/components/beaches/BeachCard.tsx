'use client'

import React, { useEffect, useState } from 'react'
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

const DEFAULT_FALLBACK = '/assets/images/maharashtra-state-of-india.svg'

const BeachCard: React.FC<BeachCardProps> = ({
  beach,
  category,
  generateSlug,
  btnLabel,
  btnColor,
}) => {
  const { language } = useLanguage()

  // use state for image src so we can swap to fallback on error
  const initialSrc =
    typeof beach?.bannerImage === 'string' && beach.bannerImage.trim() !== ''
      ? beach.bannerImage
      : DEFAULT_FALLBACK

  const [src, setSrc] = useState<string>(initialSrc)

  // If beach.bannerImage changes (hot reload / prop change), update src
  useEffect(() => {
    const newSrc =
      typeof beach?.bannerImage === 'string' && beach.bannerImage.trim() !== ''
        ? beach.bannerImage
        : DEFAULT_FALLBACK
    setSrc(newSrc)
  }, [beach?.bannerImage])

  // optional: guard to avoid infinite onError loops
  const handleImgError = () => {
    if (src !== DEFAULT_FALLBACK) {
      setSrc(DEFAULT_FALLBACK)
    }
  }

  return (
    <div className="h-100 border-0 overflow-hidden transition-all duration-300">
      {/* 🏖️ Beach Image */}
      <div className="homeSliderImg overflow-hidden">
        <Image
          src={src}
          alt={beach.title || 'Beach Image'}
          width={600}
          height={350}
          className="card-img-top object-cover hover:scale-105 transition-transform duration-500 h-100"
          priority
          onError={handleImgError}
        />
      </div>

      {/* 📝 Beach Info */}
      <div className="homeSilderText p-4 text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          <Translator text={beach.title || ''} targetLang={language} />
        </h2>

        {beach.subtitle && (
          <p className="text-gray-600 mb-0 text-sm leading-relaxed">
            <Translator text={beach.subtitle || ''} targetLang={language} />
          </p>
        )}

        {/* 🔗 View More Button (uncomment to use) */}
        {/*
        <Link
          href={`/${category}/${generateSlug(beach.id?.toString() || '')}`}
          className="btn btn-outline-dark"
          style={{
            backgroundColor: btnColor || 'var(--primary-color)',
            color: '#fff',
            border: "0",
          }}
        >
          <Translator text={btnLabel || 'View More'} targetLang={language} />
        </Link>
        */}
      </div>
    </div>
  )
}

export default BeachCard
