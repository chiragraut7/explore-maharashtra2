'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import BeachSlider from './beaches/BeachSlider'
import ParallaxBanner from './commonComponents/ParallaxBanner'

interface Fort {
  id: string
  title: string
  subtitle?: string
  bannerImage?: string
  color?: string
}

const FortList: React.FC = () => {
  const [forts, setForts] = useState<Fort[]>([])

  useEffect(() => {
    const fetchForts = async () => {
      try {
        const res = await fetch('/api/forts')
        const json = await res.json()
        if (json.success) setForts(json.data.slice(0, 5))
      } catch (err) {
        console.error(err)
      }
    }
    fetchForts()
  }, [])

  // FAST PARALLAX EFFECT
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
  }, [forts])

  const generateSlug = (id?: string) =>
    (id || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <section className="container-fluid herosection py-5 px-0 fort-section">

      {/* Banner */}
      <div className="homeFortsBanner mb-4 p-0">
        <ParallaxBanner
          image="/assets/images/fortsHomeBanner.jpg"
          minScale={0.1}
          maxScale={1}
          title="Forts of Maharashtra"
        />
      </div>

      {/* CONTENT */}
      <section className="container">
        <div className="row py-4 align-items-center justify-content-between">

          {/* LEFT SECTION */}
          <div className="col-md-5 mb-4 mb-md-0">
            <div className="parallax-text mb-5 pb-5">
              <h2 className="section-subtitle text-start mb-4">Historic Forts & Legacy</h2>
              <p className="lead">
                Maharashtra is home to some of the most iconic forts in India, carrying the valor and legacy of Chhatrapati Shivaji Maharaj.
              </p>
              <p>
                From sea forts like Sindhudurg & Murud-Janjira to hill forts like Rajgad, Torna & Pratapgad — every fort tells a story of strategy, architecture and courage.
              </p>
            </div>

            <div className="parallax-image image-block">
              <div className="image-wrap">
                <Image
                  src="/assets/images/fortsHomeImg.jpg"
                  alt="Historic Fort"
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
                  src="/assets/images/fortsHomeImg1.jpg"
                  alt="Fort View"
                  width={1200}
                  height={800}
                  className="img-fluid rounded-4"
                />
                <div className="hero-caption">
                  <h3>Warriors, History & Pride</h3>
                  <p>Experience Maharashtra’s glorious Maratha heritage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="row mt-5 pt-5">
          <div className="col-12">
            {forts.length > 0 ? (
              <BeachSlider beaches={forts} category="forts" generateSlug={generateSlug} />
            ) : (
              <p className="text-center py-4 text-muted">Loading forts...</p>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}

export default FortList
