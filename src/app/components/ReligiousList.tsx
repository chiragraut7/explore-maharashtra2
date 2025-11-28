'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import BeachSlider from './beaches/BeachSlider'
import ParallaxBanner from './commonComponents/ParallaxBanner'

interface Religious {
  id: string
  title: string
  subtitle?: string
  bannerImage?: string
  color?: string
}

const ReligiousList: React.FC = () => {
  const [items, setItems] = useState<Religious[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/religious')
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
    <section className="container-fluid herosection py-5 px-0 religious-section">

      {/* Banner */}
      <div className="homeReligiousBanner mb-4 p-0">
        <ParallaxBanner
          image="/assets/images/religiousHomeBanner.jpg"
          minScale={0.1}
          maxScale={1}
          title="Religious Places"
        />
      </div>

      {/* CONTENT */}
      <section className="container">
        <div className="row py-4 align-items-center justify-content-between">

          {/* LEFT SECTION */}
          <div className="col-md-5 mb-4 mb-md-0">
            <div className="parallax-text mb-5 pb-5">
              <h2 className="section-subtitle text-start mb-4">Temples, Pilgrimages & Spiritual Sites</h2>
              <p className="lead">
                Maharashtra hosts a rich tapestry of sacred sites — ancient temples, pilgrimage towns, and lakeside shrines that attract devotees and visitors all year round.
              </p>
              <p>
                From the famous Siddhivinayak and Shirdi to quieter temple complexes and holy ghats, explore spiritual experiences across the state.
              </p>
            </div>

            <div className="parallax-image image-block">
              <div className="image-wrap">
                <Image
                  src="/assets/images/religiousHomeImg.jpg"
                  alt="Religious Side"
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
                  src="/assets/images/religiousHomeImg1.jpg"
                  alt="Religious Header"
                  width={1200}
                  height={800}
                  className="img-fluid rounded-4"
                  priority={false}
                />
                <div className="hero-caption">
                  <h3>Faith, Rituals & Heritage</h3>
                  <p>Discover timeless traditions, festivals and serene spiritual retreats.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="row mt-5 pt-5">
          <div className="col-12">
            {items.length > 0 ? (
              <BeachSlider beaches={items} category="religious" generateSlug={generateSlug} />
            ) : (
              <p className="text-center py-4 text-muted">Loading religious places...</p>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}

export default ReligiousList
