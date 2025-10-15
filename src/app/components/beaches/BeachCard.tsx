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
    <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
      <Image
        src={beach.bannerImage}
        alt={beach.title}
        width={500}
        height={300}
        className="card-img-top object-cover"
      />
      <div className="card-body">
        <h5 className="card-title fw-bold">{beach.title}</h5>
        <p className="card-text text-muted">{beach.subtitle}</p>
        <Link
          key={beach.id}
          href={`/${category}/${generateSlug(beach.id)}`} // ✅ pass beach.id
        >
          {btnLabel}
        </Link>
      </div>
    </div>
  )
}

export default BeachCard
