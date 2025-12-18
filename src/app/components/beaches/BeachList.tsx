'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import BeachSlider from './BeachSlider'
import ParallaxBanner from '../commonComponents/ParallaxBanner'

interface Beach {
  id: string
  title: string
  subtitle: string
  bannerImage: string
  color?: string
}

const BeachList: React.FC = () => {
  const [beaches, setBeaches] = useState<Beach[]>([])

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const res = await fetch('/api/beaches')
        const json = await res.json()
        if (json.success) setBeaches(json.data.slice(0, 5))
      } catch (err) {
        console.error(err)
      }
    }
    fetchBeaches()
  }, [])

  // SUPER-FAST parallax: images move faster than text
  useEffect(() => {
    // Two sets: text and images (so images can be faster)
    const textEls = Array.from(document.querySelectorAll<HTMLElement>('.parallax-text'))
    const imageEls = Array.from(document.querySelectorAll<HTMLElement>('.parallax-image'))

    const textSpeed = 0.45   // change to increase text speed
    const imageSpeed = 0.9  // change to increase image speed (images move faster)
    const maxMove = 120     // max px movement up/down

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const vh = window.innerHeight

        const apply = (els: HTMLElement[], speed: number) => {
          els.forEach((el) => {
            const rect = el.getBoundingClientRect()
            // element's absolute top
            const elementTop = rect.top + scrollY
            // progress relative to viewport center: 0 = center, negative/positive outside
            const progress = (scrollY - elementTop + vh / 2) / vh
            // translate based on progress, clamped
            const translateY = Math.max(Math.min(progress * maxMove * speed, maxMove), -maxMove)
            // apply transform directly (GPU accelerated)
            el.style.transform = `translate3d(0, ${translateY}px, 0)`
            el.style.transition = 'transform 0.08s linear'

            // small opacity tweak for text (optional)
            if (el.classList.contains('parallax-text')) {
              const opacity = Math.max(1 - Math.abs(progress) * 0.5, 0.35)
              el.style.opacity = `${opacity}`
            }
          })
        }

        apply(textEls, textSpeed)
        apply(imageEls, imageSpeed)

        ticking = false
      })
    }

    // initial call
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [beaches])

  const generateSlug = (id?: string) =>
    (id || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <section className="container-fluid herosection py-5 px-0">

      {/* Banner */}
      <div className="homeBeachesBanner mb-4 p-0">
        <ParallaxBanner
          image="/assets/images/beachHomeBanner.jpg"
          // minScale={0.1}
          // maxScale={1}
          title="Beaches"
        />
      </div>

      {/* CONTENT */}
      <section className="container">
        <div className="row py-4 align-items-center justify-content-between">
          
          {/* LEFT TEXT + IMAGE */}
          <div className="col-md-5 mb-4 mb-md-0">
            <div className="parallax-text mb-5 pb-5">
              <h2 className="section-subtitle text-start mb-4">Konkan Coastline</h2>
              <p className="lead">
                Maharashtra’s long and scenic Konkan coastline stretches over <strong>720 km</strong>, offering some of India’s most diverse and picturesque beaches.
              </p>
              <p>
                From serene golden sands to adventure-filled shores — these beaches combine natural beauty, vibrant coastal culture, water sports, historic forts and tempting Konkan cuisine.
              </p>
            </div>

            <div className="parallax-image image-block">
              <div className="image-wrap">
                <Image
                  src="/assets/images/beaches/00/info2.jpg"
                  alt="Beautiful Beaches"
                  width={900}
                  height={600}
                  className="img-fluid rounded-4"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-md-6 pt-md-5">
            <div className="parallax-image hero-image">
              <div className="image-wrap">
                <Image
                  src="/assets/images/beaches/04/info3.jpg"
                  alt="Konkan Coast"
                  width={1200}
                  height={800}
                  className="img-fluid rounded-4"
                  priority={false}
                />
                <div className="hero-caption">
                  <h3>Sun, Sand & Serenity</h3>
                  <p>Best beaches for families, photographers and adventure seekers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="row mt-5 pt-5">
          <div className="col-12">
            {beaches.length > 0 ? (
              <BeachSlider
                beaches={beaches}
                category="beaches"
                generateSlug={generateSlug}
              />
            ) : (
              <p className="text-center py-4 text-muted">
                Loading beaches...
              </p>
            )}
          </div>
        </div>
      </section>

    </section>
  )
}

export default BeachList
