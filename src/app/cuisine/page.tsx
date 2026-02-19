"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Translator from '../components/commonComponents/Translator';
import ModalPortal from '../components/commonComponents/ModalPortal';
import { useLanguage } from '../components/context/LanguageContext';

export default function CuisineHeritagePage() {
  const { language } = useLanguage();
  const [dishes, setDishes] = useState<any[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<any[]>([]);
  const [activeDish, setActiveDish] = useState<any | null>(null);
  const [filter, setFilter] = useState('All');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Spring animation for the top scroll progress bar
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const categories = ['All', 'Street Food', 'Main Course', 'Breakfast', 'Dessert', 'Beverage', 'Seafood'];

  useEffect(() => {
    fetch("/data/cuisine/list.json")
      .then(res => res.json())
      .then(data => {
        setDishes(data);
        setFilteredDishes(data);
      });
    if (typeof window !== 'undefined') { AOS.init({ duration: 1000, once: false }); }
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredDishes(dishes);
    } else {
      setFilteredDishes(dishes.filter(d => d.type.includes(filter)));
    }
  }, [filter, dishes]);
 
  useEffect(() => {
    if (activeDish) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    };
  }, [activeDish]);

  return (
    <div className="pearl-container min-vh-100 pb-5" ref={containerRef}>
      {/* Scroll Progress Bar - Correctly using scaleX in style prop to fix TS error */}
      <motion.div className="fixed-top" style={{ scaleX, height: '4px', background: '#0dcaf0', zIndex: 2000 }} />

      {/* --- CINEMATIC COMPACT HERO (vh-50) --- */}
      <div className="position-relative w-100 overflow-hidden vh-50">
        <Image 
          src="/assets/images/bannerImages/heritage_banner.jpg" 
          alt="Culinary Heritage Banner"
          fill
          priority
          className="object-fit-cover scale-up-slow"
        />
        <div className="hero-scrim">
          <div className="text-center text-white px-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="heritage-badge mb-3">Culinary Arts</span>
              <h1 className="display-3 fw-bold tracking-tight mb-2 font-serif text-shadow">
                The <span className="text-info italic">Heritage</span> Kitchen
              </h1>
              <p className="lead fs-5 opacity-90 italic font-serif max-w-md mx-auto">
                <Translator text="A celebration of Maharashtra's flavors in a modern light." targetLang={language} />
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- CATEGORY FILTER --- */}
      <div className="sticky-top py-4 z-3 shadow-sm blur-nav" style={{ top: '80px' }}>
        <div className="container d-flex justify-content-center flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`modern-filter-pill ${filter === cat ? 'active' : ''}`}
            >
              <Translator text={cat} targetLang={language} />
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID: CINEMATIC OVERLAY CARDS --- */}
      <section className="container py-5 mt-4">
        <div className="row g-4 justify-content-center">
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => (
              <motion.div 
                layout
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="col-sm-6 col-lg-4 col-xl-3"
              >
                <div onClick={() => setActiveDish(dish)} className="cuisine-card group">
                  <div className="card-inner">
                    <Image src={dish.image} alt={dish.name} fill className="object-fit-cover transition-zoom" />
                    <div className="card-scrim"></div>
                    <div className="card-details">
                      <span className="region-label">{dish.region}</span>
                      <h3 className="dish-name">{dish.name}</h3>
                      <div className="reveal-link">View Details →</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- MODAL PORTAL --- */}
      <ModalPortal>
        <AnimatePresence>
          {activeDish && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="modal-backdrop-blur" onClick={() => setActiveDish(null)}
              />
              <div className="modal-flex-center" onClick={(e) => e.target === e.currentTarget && setActiveDish(null)}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 40 }}
                  className="modern-modal-content"
                >
                  <button className="close-btn" onClick={() => setActiveDish(null)}>✕</button>
                  <div className="row g-0 h-100">
                    <div className="col-md-5 h-100 d-none d-md-block position-relative">
                      <Image src={activeDish.image} alt={activeDish.name} fill className="object-fit-cover" />
                    </div>
                    <div className="col-md-7 internal-scroll p-4 p-lg-5">
                      <span className="text-info fw-bold text-uppercase ls-1 small">{activeDish.region}</span>
                      <h2 className="display-5 font-serif fw-bold text-dark mt-2 mb-4">{activeDish.name}</h2>
                      
                      <div className="ingredients-box">
                        <h6 className="fw-bold text-dark text-uppercase small mb-4">Ingredients</h6>
                        <ul className="row list-unstyled g-2">
                          {activeDish.recipe?.ingredients.map((ing: string, idx: number) => (
                            <li key={idx} className="col-6 small text-secondary d-flex align-items-center gap-2">
                              <span className="dot-info"></span> {ing}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <h6 className="fw-bold text-dark text-uppercase small mb-4">Method</h6>
                      {activeDish.recipe?.steps.map((step: string, idx: number) => (
                        <div key={idx} className="d-flex gap-4 mb-4">
                          <span className="step-number">{idx+1}</span>
                          <p className="pt-2 mb-0 text-secondary">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </ModalPortal>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .pearl-container { background: #f9f9f9; }
        .font-serif { font-family: 'Playfair Display', serif; }

        /* --- Hero Styling --- */
        .vh-50 { height: 50vh !important; }
        .hero-scrim {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.3) 60%, transparent 100%);
        }
        .heritage-badge {
          background: rgba(13, 202, 240, 0.15);
          border: 1px solid #0dcaf0;
          color: #0dcaf0;
          padding: 6px 18px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .text-shadow { text-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .scale-up-slow { animation: slowZoom 20s infinite alternate; }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }

        /* --- Filter Navigation --- */
        .blur-nav { background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); }
        .modern-filter-pill {
          background: white;
          border: 1px solid #ddd;
          padding: 10px 24px;
          border-radius: 14px;
          font-weight: 600;
          color: #555;
          transition: 0.3s;
          cursor: pointer;
        }
        .modern-filter-pill.active { 
          background: #0dcaf0; 
          color: white; 
          border-color: #0dcaf0; 
          box-shadow: 0 10px 20px rgba(13, 202, 240, 0.2); 
        }

        /* --- Cinematic Card Overlay Design --- */
        .cuisine-card {
          position: relative;
          height: 380px;
          border-radius: 30px;
          overflow: hidden;
          cursor: pointer;
          background: #fff;
        }
        .card-inner { position: relative; width: 100%; height: 100%; }
        .transition-zoom { transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .cuisine-card:hover .transition-zoom { transform: scale(1.12); }
        
        .card-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
          z-index: 1;
        }

        .card-details {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 28px;
          z-index: 2;
          color: white;
          transition: transform 0.4s ease;
        }
        .cuisine-card:hover .card-details { transform: translateY(-10px); }

        .region-label {
          font-size: 0.65rem;
          font-weight: 800;
          color: #0dcaf0;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }
        .dish-name { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; margin-bottom: 10px; }
        .reveal-link { font-size: 0.8rem; font-weight: 600; color: #0dcaf0; opacity: 0; transform: translateX(-10px); transition: 0.4s; }
        .cuisine-card:hover .reveal-link { opacity: 1; transform: translateX(0); }

        /* --- Modal Elements --- */
        .modal-backdrop-blur { position: fixed; inset: 0; background: rgba(0,0,0,0.2); backdrop-filter: blur(15px); z-index: 5000; }
        .modal-flex-center { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 5001; padding: 20px; pointer-events: none; }
        .modern-modal-content { pointer-events: auto; background: #fff; width: 100%; max-width: 950px; height: 85vh; border-radius: 40px; overflow: hidden; position: relative; border: none; }
        .internal-scroll { overflow-y: auto; height: 100%; overscroll-behavior: contain; }
        .internal-scroll::-webkit-scrollbar { width: 4px; }
        .internal-scroll::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
        
        .ingredients-box { margin-bottom: 40px; padding: 30px; border-radius: 25px; background: #f8f9fa; border: 1px solid #eee; }
        .step-number { font-family: 'Playfair Display', serif; font-size: 2rem; color: #0dcaf0; opacity: 0.3; font-weight: 700; }
        .dot-info { width: 6px; height: 6px; background: #0dcaf0; border-radius: 50%; }
        .close-btn { position: absolute; top: 25px; right: 25px; border: none; background: #f0f0f0; width: 40px; height: 40px; border-radius: 50%; z-index: 10; cursor: pointer; }
      `}</style>
    </div>
  );
}