'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'
import Image from 'next/image'

// Import category sliders
import BeachList from './components/beaches/BeachList'
import HillList from './components/HillList'
import FortList from './components/FortList'
import NatureList from './components/NatureList'
import ReligiousList from './components/ReligiousList'
import CulturalList from './components/CulturalList'

// Section type
interface Section {
  id: string
  title: string
  image: string
  link: string
}

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const sections: Section[] = [
    { id: 'beaches', title: 'Beaches', image: '/assets/images/home_iocn/beach-umbrella.svg', link: '/beaches' },
    { id: 'hill-stations', title: 'Hill Stations', image: '/assets/images/home_iocn/hills.svg', link: '/hills' },
    { id: 'forts', title: 'Forts', image: '/assets/images/home_iocn/castle-3.svg', link: '/forts' },
    { id: 'wildlife', title: 'Wildlife & Nature', image: '/assets/images/home_iocn/tree.svg', link: '/nature' },
    { id: 'religious', title: 'Religious Places', image: '/assets/images/home_iocn/temple.svg', link: '/religious' },
    { id: 'cultural', title: 'Cultural & Unique', image: '/assets/images/home_iocn/castle.svg', link: '/cultural' },
  ]

  return (
    <>
      {/* Banner */}
      <header className="shadow-sm">
        <div className="banner">
          <div className="text-center py-5">
            <h1 className="display-4 text-white fw-bold">Explore Maharashtra</h1>
            <p className="lead text-white">
              Discover Beaches, Forts, Nature, and Culture of Maharashtra
            </p>
          </div>
        </div>
      </header>

      {/* Overview Section */}
      <section className="container text-center py-5 home" id="overview">
        <h2 className="section-title mt-2">Overview</h2>
        <p>
          Explore Maharashtra is your trusted travel companion, dedicated to showcasing the rich cultural
          heritage, natural beauty, and historic wonders of Maharashtra.
        </p>
        <p>
          Whether you&apos;re a weekend explorer, a history buff, or a nature lover, our platform offers
          in-depth insights, travel guides, and local tips to make your journey unforgettable.
        </p>
        <Link href="/about" className="btn btn-outline-dark mt-2 w-auto">
          Read More
        </Link>
      </section>

      {/* Section Cards */}
      <section className="container homeLinks py-5">
        <div className="row g-4">
          {sections.map((section) => (
            <SectionCard key={section.id} {...section} />
          ))}
        </div>
      </section>

      {/* Category Sliders */}
      <section className="container-fluid py-5 herosection">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-12"><div className="homeSlide"><BeachList /></div></div>
            <div className="col-md-12 odd"><div className="homeSlide"><HillList /></div></div>
            <div className="col-md-12"><div className="homeSlide"><FortList /></div></div>
            <div className="col-md-12 odd"><div className="homeSlide"><NatureList /></div></div>
            <div className="col-md-12"><div className="homeSlide"><ReligiousList /></div></div>
            <div className="col-md-12 odd"><div className="homeSlide"><CulturalList /></div></div>
          </div>
        </div>
      </section>
    </>
  )
}

// Reusable SectionCard Component
interface SectionCardProps extends Section {}

function SectionCard({ id, title, image, link }: SectionCardProps) {
  return (
    <div className="col" id={id}>
      <Link href={link}>
        <div className="card text-center shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="card-body p-4">
            <Image src={image} alt={title} width={100} height={100} className="m-auto" />
            <h3 className="card-title mt-3">{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  )
}
