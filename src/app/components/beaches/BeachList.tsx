'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import BeachSlider from './BeachSlider'
import ParallaxBanner from '../commonComponents/ParallaxBanner'
import Translator from '../commonComponents/Translator'
import { useLanguage } from '../context/LanguageContext'

/* ----------------------------------
   Types
----------------------------------- */
interface Beach {
  id: string
  title: string
  subtitle: string
  bannerImage: string
  color?: string
}

/* ----------------------------------
   Component
----------------------------------- */
const BeachList: React.FC = () => {
  const [beaches, setBeaches] = useState<Beach[]>([])
  const { language } = useLanguage()

  /* ----------------------------------
     Fetch Beaches
  ----------------------------------- */
  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const res = await fetch('/api/beaches')
        const json = await res.json()
        if (json.success) {
          setBeaches(json.data.slice(0, 5))
        }
      } catch (err) {
        console.error('Failed to fetch beaches', err)
      }
    }
    fetchBeaches()
  }, [])

  /* ----------------------------------
     SUPER FAST PARALLAX
  ----------------------------------- */
  useEffect(() => {
    const textEls = Array.from(
      document.querySelectorAll<HTMLElement>('.parallax-text')
    )
    const imageEls = Array.from(
      document.querySelectorAll<HTMLElement>('.parallax-image')
    )

    const textSpeed = 0.45
    const imageSpeed = 0.9
    const maxMove = 120
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const vh = window.innerHeight

        const applyParallax = (els: HTMLElement[], speed: number) => {
          els.forEach((el) => {
            const rect = el.getBoundingClientRect()
            const elementTop = rect.top + scrollY
            const progress = (scrollY - elementTop + vh / 2) / vh

            const translateY = Math.max(
              Math.min(progress * maxMove * speed, maxMove),
              -maxMove
            )

            el.style.transform = `translate3d(0, ${translateY}px, 0)`
            el.style.transition = 'transform 0.08s linear'

            if (el.classList.contains('parallax-text')) {
              const opacity = Math.max(1 - Math.abs(progress) * 0.5, 0.35)
              el.style.opacity = `${opacity}`
            }
          })
        }

        applyParallax(textEls, textSpeed)
        applyParallax(imageEls, imageSpeed)

        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [beaches])

  /* ----------------------------------
     Helpers
  ----------------------------------- */
  const generateSlug = (id?: string) =>
    (id || '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')

  /* ----------------------------------
     JSX
  ----------------------------------- */
  return (
    <section className="container-fluid herosection py-5 px-0">

      {/* Banner */}
      <div className="homeBeachesBanner mb-4 p-0">
        <ParallaxBanner
          image="/assets/images/beachHomeBanner.jpg"
          title="Beaches"
        />
      </div>

      {/* CONTENT */}
      <section className="container">
        <div className="row py-4 align-items-center justify-content-between">

          {/* LEFT TEXT + IMAGE */}
          <div className="col-md-5 mb-4 mb-md-0">

            <div className="parallax-text mb-5 pb-5">
              <h2 className="section-subtitle text-start mb-4">
                <Translator
                  text="Konkan Coastline"
                  targetLang={language}
                />
              </h2>

              <p className="lead">
                <Translator
                  text="Maharashtra’s long and scenic Konkan coastline stretches over 720 km, offering some of India’s most diverse and picturesque beaches."
                  targetLang={language}
                />
              </p>

              <p>
                <Translator
                  text="From serene golden sands to adventure-filled shores — these beaches combine natural beauty, vibrant coastal culture, water sports, historic forts and tempting Konkan cuisine."
                  targetLang={language}
                />
              </p>
            </div>

            <div className="parallax-image image-block">
              <div className="image-wrap">
                <Image
                  src="/assets/images/info2.jpg"
                  alt="Beautiful Beaches"
                  width={900}
                  height={600}
                  className="img-fluid rounded-4"
                />
              </div>
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="col-md-6 pt-md-5">
            <div className="parallax-image hero-image">
              <div className="image-wrap">
                <Image
                  src="/assets/images/info3.jpg"
                  alt="Konkan Coast"
                  width={1200}
                  height={800}
                  className="img-fluid rounded-4"
                />

                <div className="hero-caption">
                  <h3>
                    <Translator
                      text="Sun, Sand & Serenity"
                      targetLang={language}
                    />
                  </h3>
                  <p>
                    <Translator
                      text="Best beaches for families, photographers and adventure seekers."
                      targetLang={language}
                    />
                  </p>
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
                <Translator
                  text="Loading beaches..."
                  targetLang={language}
                />
              </p>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}

export default BeachList
