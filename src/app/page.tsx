'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from "next/link"
import Image from 'next/image'

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('.scroll-link')

    // Only sections that exist
    const sections = Array.from(links)
      .map(link => link.getAttribute('href'))
      .filter((href): href is string => href !== null)
      .map(href => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null)

    const handleScroll = () => {
      const scrollPos = window.scrollY + 150 // offset for header

      sections.forEach((section, index) => {
        if (
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          links.forEach(link => link.classList.remove('active'))
          links[index].classList.add('active')
        }
      })
    }

    const smoothScroll = (e: Event) => {
      e.preventDefault()
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
      if (!targetId) return

      const target = document.querySelector<HTMLElement>(targetId)
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth',
        })
      }
    }

    links.forEach(link => link.addEventListener('click', smoothScroll))
    window.addEventListener('scroll', handleScroll)

    return () => {
      links.forEach(link => link.removeEventListener('click', smoothScroll))
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
        <ul className="list-scroll">
          <li><a href="#overview" className="scroll-link"><span>Overview</span></a></li>
          <li><a href="#beaches" className="scroll-link"><span>Beaches</span></a></li>
          <li><a href="#hill-stations" className="scroll-link"><span>Hill Stations</span></a></li>
          <li><a href="#forts" className="scroll-link"><span>Forts & Historical Places</span></a></li>
          <li><a href="#wildlife" className="scroll-link"><span>Wildlife & Nature</span></a></li>
          <li><a href="#religious" className="scroll-link"><span>Religious Places</span></a></li>
          <li><a href="#cultural" className="scroll-link"><span>Cultural & Unique</span></a></li>
        </ul>

        {/* Sections */}
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

        <div className="row">
          {/* Beaches */}
          <SectionCard
            id="beaches"
            title="Beaches"
            text="From Kelwa to Ganpatipule, explore scenic coastlines along the Arabian Sea."
            image="/assets/images/beaches.jpg"
            link="/beaches"
            reverse
            aosDelay={0}
          />

          {/* Hill Stations */}
          <SectionCard
            id="hill-stations"
            title="Hill Stations"
            text="Breathtaking hill getaways like Mahabaleshwar, Lonavala, and Matheran await you."
            image="/assets/images/hill_stations.jpg"
            link="/hills"
            reverse={false}
            aosDelay={100}
          />

          {/* Forts */}
          <SectionCard
            id="forts"
            title="Forts & Historical Places"
            text="Uncover tales of valour in places like Sinhagad, Raigad, and Pratapgad."
            image="/assets/images/forts.jpg"
            link="/forts"
            reverse
            aosDelay={200}
          />

          {/* Wildlife */}
          <SectionCard
            id="wildlife"
            title="Wildlife & Nature"
            text="Forests, waterfalls, and national parks like Tadoba and Bhimashankar await."
            image="/assets/images/wildlife_nature.jpg"
            link="/nature"
            reverse={false}
            aosDelay={0}
          />

          {/* Religious */}
          <SectionCard
            id="religious"
            title="Religious Places"
            text="Spiritual sanctuaries from Shirdi to Siddhivinayak and Pandharpur."
            image="/assets/images/religious_places.jpg"
            link="/religious"
            reverse
            aosDelay={100}
          />

          {/* Cultural */}
          <SectionCard
            id="cultural"
            title="Cultural & Unique"
            text="Fairs, food, folk dance, and festivals that define Maharashtra’s soul."
            image="/assets/images/cultural_unique.jpg"
            link="/cultural"
            reverse={false}
            aosDelay={200}
          />
        </div>
      </section>
    </>
  )
}

// Reusable SectionCard Component
interface SectionCardProps {
  id: string
  title: string
  text: string
  image: string
  link: string
  reverse?: boolean
  aosDelay?: number
}

function SectionCard({ id, title, text, image, link, reverse = false, aosDelay = 0 }: SectionCardProps) {
  return (
    <div className="col-12" data-aos="fade-up" data-aos-delay={aosDelay} id={id}>
      <div className={`card ${reverse ? 'flex-row-reverse' : 'flex-row'} h-100 overflow-hidden border-0 shadow-sm`}>
        <div className="position-relative w-50" style={{ minHeight: '600px' }}>
          <Image src={image} alt={title} fill className="object-cover" style={{ objectFit: 'cover' }} />
        </div>
        <div className="card-body w-50 d-flex flex-column justify-content-center p-4">
          <div className="d-flex flex-column justify-content-center" style={{ maxWidth: '500px', width: '100%' }}>
            <h3 className="card-title">{title}</h3>
            <p className="card-text py-4">{text}</p>
            <Link href={link} className="btn btn-outline-dark mt-2 w-auto">Read More</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
