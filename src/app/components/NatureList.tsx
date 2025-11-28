'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import BeachSlider from './beaches/BeachSlider'
import ParallaxBanner from './commonComponents/ParallaxBanner'

interface Nature {
  id: string
  title: string
  subtitle?: string
  bannerImage?: string
  color?: string
}

const NatureList: React.FC = () => {
  const [items, setItems] = useState<Nature[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/nature')
        const json = await res.json()
        if (json.success) setItems(json.data.slice(0, 5))
      } catch (err) {
        console.error(err)
      }
    }
    fetchItems()
  }, [])

  // FAST PARALLAX (images faster than text)
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
  }, [items])

  const generateSlug = (id?: string) =>
    (id || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <section className="container-fluid herosection py-5 px-0 nature-section">

      {/* Banner */}
      <div className="homeNatureBanner mb-4 p-0">
        <ParallaxBanner
          image="/assets/images/natureHomeBanner.jpg"
          minScale={0.1}
          maxScale={1}
          title="Wildlife & Nature"
        />
      </div>

      {/* CONTENT */}
      <section className="container">
        <div className="row py-4 align-items-center justify-content-between">

          {/* LEFT SECTION */}
          <div className="col-md-5 mb-4 mb-md-0">
            <div className="parallax-text mb-5 pb-5">
              <h2 className="section-subtitle text-start mb-4">Wildlife, Forests & Nature Trails</h2>
              <p className="lead">
                Maharashtra’s natural areas range from dense forests to protected wildlife sanctuaries and serene waterfalls — perfect for nature lovers and birdwatchers.
              </p>
              <p>
                Discover national parks, mangrove ecosystems, waterfalls and lush trails that are ideal for trekking, wildlife safaris and peaceful escapes.
              </p>
            </div>

            <div className="parallax-image image-block">
              <div className="image-wrap">
                <Image
                  src="/assets/images/natureHomeImg.jpg"
                  alt="Nature Side"
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
                  src="/assets/images/natureHomeImg1.jpg"
                  alt="Nature Header"
                  width={1200}
                  height={800}
                  className="img-fluid rounded-4"
                  priority={false}
                />
                <div className="hero-caption">
                  <h3>Forests, Waterfalls & Wildlife</h3>
                  <p>Explore protected parks, trekking trails and rich biodiversity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="row mt-5 pt-5">
          <div className="col-12">
            {items.length > 0 ? (
              <BeachSlider beaches={items} category="nature" generateSlug={generateSlug} />
            ) : (
              <p className="text-center py-4 text-muted">Loading nature items...</p>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}

export default NatureList
