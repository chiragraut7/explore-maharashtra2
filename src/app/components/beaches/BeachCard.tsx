'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  return (
    <div className="h-100 shadow-sm border-0 rounded-3">
      <div className='homeSliderImg'>
        <Image
          src={beach.bannerImage}
          alt={beach.title}
          width={500}
          height={300}
          className="card-img-top object-cover"
        />
      </div>
      <div className="homeSilderText p-3">
        <h2>{beach.title}</h2>
        <p>{beach.subtitle}</p>
        <Link
          key={beach.id}
          href={`/${category}/${generateSlug(beach.id)}`}
          className="view-more-arrow"
        >
          <span>View More</span>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  )
}

export default BeachCard
