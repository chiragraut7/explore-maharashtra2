'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Item {
  id: string
  title: string
  subtitle: string
  bannerImage: string
  color?: string
}

interface Props {
  beach: Item
  category: string
  generateSlug: (id: string) => string
  btnLabel: string
  btnColor: string
}

const BeachCard: React.FC<Props> = ({ beach, category, generateSlug, btnLabel, btnColor }) => {
  return (
    <motion.div className="overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300">
      <div className="overflow-hidden relative h-60">
        <Image
          src={beach.bannerImage || '/assets/images/default-beach.jpg'}
          alt={beach.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4 homeSilderText">
        <h2 className="text-lg font-bold">{beach.title}</h2>
        <p className="text-sm text-gray-600">{beach.subtitle}</p>
        <Link
          href={`/${category}/${generateSlug(beach.id)}`}
          className="btn mt-2"
          style={{
            backgroundColor: btnColor,
            borderColor: btnColor,
            color: '#fff'
          }}
        >
          {btnLabel}
        </Link>
      </div>
    </motion.div>
  )
}

export default BeachCard
