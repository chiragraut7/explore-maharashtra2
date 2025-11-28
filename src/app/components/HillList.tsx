'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import BeachSlider from './beaches/BeachSlider' // using your slider component
import ParallaxBanner from './commonComponents/ParallaxBanner' // adjust path if needed

interface Hill {
  id: string
  title: string
  subtitle?: string
  bannerImage?: string
  color?: string
}

const HillList: React.FC = () => {
  const [hills, setHills] = useState<Hill[]>([])

  useEffect(() => {
    const fetchHills = async () => {
      try {
        const res = await fetch('/api/hills')
        const json = await res.json()
        if (json.success) setHills(json.data.slice(0, 5))
      } catch (err) {
        console.error(err)
      }
    }
    fetchHills()
  }, [])

  // SUPER-FAST parallax: images move faster than text (same logic as BeachList)
  useEffect(() => {
    const textEls = Array.from(document.querySelectorAll<HTMLElement>('.parallax-text'))
    const imageEls = Array.from(document.querySelectorAll<HTMLElement>('.parallax-image'))

    const textSpeed = 0.45
    const imageSpeed = 0.9
    const maxMove = 120

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
            const elementTop = rect.top + scrollY
            const progress = (scrollY - elementTop + vh / 2) / vh
            const translateY = Math.max(Math.min(progress * maxMove * speed, maxMove), -maxMove)
            el.style.transform = `translate3d(0, ${translateY}px, 0)`
            el.style.transition = 'transform 0.08s linear'

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

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [hills])

  const generateSlug = (id?: string) =>
    (id || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <section className="container-fluid herosection pb-5 px-0 hill-section">

      {/* Banner */}
      <div className="homeHillsBanner mb-4 p-0">
        <ParallaxBanner
          image="/assets/images/hillsHomeBanner.jpg"
          minScale={0.1}
          maxScale={1}
          title="Hill Stations"
        />
      </div>

      {/* CONTENT */}
      <section className="container">
        <div className="row py-4 align-items-center justify-content-between">
          
          {/* LEFT TEXT + IMAGE */}
          <div className="col-md-5 mb-4 mb-md-0">
            <div className="parallax-text mb-5 pb-5">
              <h2 className="section-subtitle text-start mb-4">Western Ghats & Hill Escapes</h2>
              <p className="lead">
                Maharashtra's hill stations offer misty viewpoints, ancient temples, lush valleys and pleasant climates — perfect for weekend getaways.
              </p>
              <p>
                Explore spots like Mahabaleshwar, Lonavala, Matheran and quieter hill retreats for treks, viewpoints, fruit orchards and delicious local fare.
              </p>
            </div>

            <div className="parallax-image image-block">
              <div className="image-wrap">
                <Image
                  src="/assets/images/hillsHomeImg1.jpg"
                  alt="Hill Station Side"
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
                  src="/assets/images/hillsHomeImg.jpg"
                  alt="Hill Station Hero"
                  width={1200}
                  height={800}
                  className="img-fluid rounded-4"
                  priority={false}
                />
                <div className="hero-caption">
                  <h3>Mists, Viewpoints & Trails</h3>
                  <p>Perfect for monsoon treks, scenic drives and peaceful stays.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="row mt-5 pt-5">
          <div className="col-12">
            {hills.length > 0 ? (
              <BeachSlider beaches={hills} category="hills" generateSlug={generateSlug} />
            ) : (
              <p className="text-center py-4 text-muted">
                Loading hill stations...
              </p>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}

export default HillList
