'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'
import Image from 'next/image'

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
    {
      id: 'beaches',
      title: 'Beaches',
      image: '/assets/images/home_iocn/beach-umbrella.svg',
      link: '/beaches'
    },
    {
      id: 'hill-stations',
      title: 'Hill Stations',
      image: '/assets/images/home_iocn/hills.svg',
      link: '/hills'
    },
    {
      id: 'forts',
      title: 'Forts',
      image: '/assets/images/home_iocn/castle-3.svg',
      link: '/forts'
    },
    {
      id: 'wildlife',
      title: 'Wildlife & Nature',
      image: '/assets/images/home_iocn/tree.svg',
      link: '/nature'
    },
    {
      id: 'religious',
      title: 'Religious Places',
      image: '/assets/images/home_iocn/temple.svg',
      link: '/religious'
    },
    {
      id: 'cultural',
      title: 'Cultural & Unique',
      image: '/assets/images/home_iocn/castle.svg',
      link: '/cultural'
    }
  ]

  return (
    <>
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

      <section className="container-fluid home">
        {/* Navigation Links */}
        {/* <ul className="list-scroll">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="scroll-link">
                <span>{section.title}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="#overview" className="scroll-link">
              <span>Overview</span>
            </a>
          </li>
        </ul> */}

        {/* Overview Section */}
        <section className="container text-center py-5" id="overview">
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
        <section className="container homeLinks">
          <div className="row">
            {sections.map((section) => (
              <SectionCard key={section.id} {...section} />
            ))}
          </div>
        </section>
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
        <div className="card">
          <div className="card-body text-center p-4">
            <Image src={image} alt={title} width={100} height={100} className='m-auto' />
            <br />
            <h3 className="card-title m-0 w-100">{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  )
}
