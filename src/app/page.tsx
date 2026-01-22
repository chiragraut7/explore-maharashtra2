"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Context & Components
import { useLanguage } from "./components/context/LanguageContext";
import BeachList from "./components/beaches/BeachList";
import HillList from "./components/HillList";
import FortList from "./components/FortList";
import NatureList from "./components/NatureList";
import ReligiousList from "./components/ReligiousList";
import CulturalList from "./components/CulturalList";
import Translator from "./components/commonComponents/Translator";
import MaharashtraChat from "./components/MaharashtraChat";

// ✅ CRITICAL FIX: Load the Map with SSR disabled
const InteractiveMap = dynamic(() => import("./components/InteractiveMap"), { 
  ssr: false,
  loading: () => (
    <div className="container py-5">
        <div className="d-flex align-items-center justify-content-center bg-white rounded-5 shadow-sm border" style={{ height: '450px' }}>
           <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status"></div>
              <p className="small fw-bold letter-spacing-2 text-muted text-uppercase">Loading Atlas...</p>
           </div>
        </div>
    </div>
  )
});

// Custom Hooks
import useFastParallax from "@/hooks/useFastParallax";

export default function Home() {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useFastParallax({ multiplier: 1.6, disableBelow: 768 });

  // ✅ UPDATED: Used FA Icons instead of Images
  const sections = [
    { id: "beaches", title: "Beaches", icon: "fa-umbrella-beach", link: "/beaches", color: "#00aaff" }, // Blue
    { id: "hill-stations", title: "Hill Stations", icon: "fa-mountain-sun", link: "/hills", color: "#4caf50" }, // Green
    { id: "forts", title: "Forts", icon: "fa-chess-rook", link: "/forts", color: "#795548" }, // Brown
    { id: "wildlife", title: "Wildlife", icon: "fa-paw", link: "/nature", color: "#ff9800" }, // Orange
    { id: "religious", title: "Religious", icon: "fa-gopuram", link: "/religious", color: "#e91e63" }, // Pink
    { id: "culture", title: "Culture", icon: "fa-masks-theater", link: "/culture", color: "#673ab7" }, // Purple
  ];

  return (
    <main className="bg-light-soft">
      
      {/* 🎭 1. LUXURY HERO SECTION */}
      <header className="hero-editorial">
        <div className="hero-visual-pane">
          <div className="hero-bg-zoom">
            <Image 
              src="/assets/images/maharashtra-hero.jpg" 
              alt="Maharashtra Landscape" 
              fill 
              priority 
              className="object-cover"
            />
            <div className="hero-vignette"></div>
          </div>
        </div>

        <div className="hero-content-pane">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="content-wrapper"
          >
            <div className="editorial-badge">
              <span className="dot"></span>
              <Translator text="The Great State" targetLang={language} />
            </div>
            
            <h1 className="display-1 fw-black text-white mb-4">
              Explore <br /> 
              <span className="text-outline">Maharashtra</span>
            </h1>

            <p className="description-text">
              <Translator text="Uncover history, nature, and spirit across India's most diverse landscape. From the Sahyadri peaks to the Konkan shores." targetLang={language} />
            </p>

            <div className="action-area mt-5">
              <a href="#overview" className="btn-luxury">
                <span className="btn-text"><Translator text="Start Your Journey" targetLang={language} /></span>
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="hero-floating-footer d-none d-md-flex">
          <div className="stat-item"><strong>720km</strong> Coastline</div>
          <div className="stat-separator"></div>
          <div className="stat-item"><strong>350+</strong> Forts</div>
          <div className="stat-separator"></div>
          <div className="stat-item"><strong>UNESCO</strong> Heritage Sites</div>
        </div>
      </header>

      {/* 🧩 2. BENTO CATEGORY GRID (Updated with FA Icons) */}
      <section className="container py-5 position-relative" id="overview" style={{ zIndex: 2 }}>
        
        {/* Header */}
        <div className="text-center mb-5" data-aos="fade-up">
            <span className="badge bg-white border text-dark px-3 py-2 rounded-pill text-uppercase letter-spacing-2 fw-bold mb-3 shadow-sm">
                <Translator text="Discover by Interest" targetLang={language} />
            </span>
            <h2 className="display-5 fw-bold mt-2">
                <Translator text="Choose Your Adventure" targetLang={language} />
            </h2>
        </div>

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
          {sections.map((section, idx) => (
            <div key={section.id} data-aos="fade-up" data-aos-delay={idx * 100}>
              <Link href={section.link} className="text-decoration-none">
                <motion.div 
                    whileHover={{ y: -8 }}
                    className="category-card h-100"
                >
                  {/* Background Blob for depth */}
                  <div className="card-blob" style={{ background: section.color }}></div>
                  
                  <div className="card-content">
                      {/* Icon Squircle */}
                      <div 
                        className="icon-squircle mb-3" 
                        style={{ backgroundColor: `${section.color}15`, color: section.color }}
                      >
                        {/* ✅ REPLACED IMAGE WITH FA ICON */}
                        <i className={`fas ${section.icon} fs-4`}></i>
                      </div>
                      
                      <h3 className="h6 fw-bold text-dark mb-1">
                        <Translator text={section.title} targetLang={language} />
                      </h3>
                      <span className="small text-muted text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>
                        <Translator text="Explore" targetLang={language} />
                      </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 🗺️ 3. GEOGRAPHICAL INTERACTIVE MAP */}
      <section className="container mb-5" id="map-explorer" data-aos="fade-up">
         <div className="bg-white p-4 rounded-5 shadow-sm border position-relative overflow-hidden">
             <div className="section-header mb-4 text-center">
                <h2 className="fw-bold h4 mb-1">
                    <Translator text="Explore the Map" targetLang={language} />
                </h2>
                <p className="text-muted small">
                    <Translator text="Navigate through the diverse regions of the Great State" targetLang={language} />
                </p>
             </div>
             <InteractiveMap />
         </div>
      </section>

      {/* 🏔️ 4. CONTENT LISTINGS */}
      <div className="content-staggered pb-5">
        <div className="slider-item"><BeachList /></div>
        <div className="slider-item"><HillList /></div>
        <div className="slider-item"><FortList /></div>
        <div className="slider-item"><NatureList /></div>
        <div className="slider-item"><ReligiousList /></div>
        <div className="slider-item"><CulturalList /></div>
      </div>

      <MaharashtraChat />

      <style jsx global>{`
        /* --- GLOBAL --- */
        .bg-light-soft { background-color: #f9f9f9; }
        .letter-spacing-2 { letter-spacing: 2px; }

        /* --- HERO --- */
        .hero-editorial {
          position: relative; height: 100vh; display: flex;
          background: #0a0a0a; overflow: hidden;
        }
        .hero-visual-pane { position: absolute; inset: 0; width: 100%; z-index: 1; }
        .hero-bg-zoom { position: absolute; inset: 0; animation: slowZoom 40s infinite alternate linear; }
        .hero-vignette {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%);
          z-index: 2;
        }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.15); } }

        .hero-content-pane {
          position: relative; z-index: 3; width: 100%;
          display: flex; align-items: center; justify-content: center; padding: 0 10%;
        }
        .content-wrapper { max-width: 800px; text-align: center; }

        .editorial-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px);
          padding: 8px 20px; border-radius: 100px;
          color: #fff; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          font-size: 0.75rem; border: 1px solid rgba(255,255,255,0.2);
          margin-bottom: 2rem;
        }
        .dot { width: 6px; height: 6px; background: #00aaff; border-radius: 50%; }

        .fw-black { font-weight: 900; letter-spacing: -2px; }
        .text-outline {
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.9);
          font-style: italic; font-family: serif;
        }
        .description-text { font-size: 1.25rem; color: rgba(255,255,255,0.85); font-weight: 300; line-height: 1.6; }

        .btn-luxury {
          display: inline-flex; align-items: center; gap: 15px;
          background: #fff; color: #000;
          padding: 16px 40px; border-radius: 100px;
          text-decoration: none; font-weight: 800; transition: 0.3s;
        }
        .btn-luxury:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(255,255,255,0.2); }

        .hero-floating-footer {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          z-index: 4; display: flex; gap: 30px;
          color: white; background: rgba(0,0,0,0.5); backdrop-filter: blur(12px);
          padding: 12px 30px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.15);
          font-size: 0.85rem; font-weight: 500;
        }
        .stat-item strong { color: #00aaff; margin-right: 5px; }
        .stat-separator { width: 1px; height: 15px; background: rgba(255,255,255,0.3); }

        /* --- BENTO GRID CARD STYLES --- */
        .category-card {
            position: relative;
            background: #ffffff;
            border-radius: 24px;
            padding: 1.5rem;
            text-align: center;
            border: 1px solid rgba(0,0,0,0.04);
            box-shadow: 0 10px 30px rgba(0,0,0,0.02);
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
        }

        .category-card:hover {
            box-shadow: 0 20px 40px rgba(0,0,0,0.08);
            border-color: rgba(0,0,0,0.0);
        }

        .card-blob {
            position: absolute; top: -20%; right: -20%;
            width: 120px; height: 120px;
            border-radius: 50%;
            opacity: 0.15; filter: blur(40px);
            transition: transform 0.5s ease;
        }

        .category-card:hover .card-blob { transform: scale(1.5); opacity: 0.25; }

        .card-content {
            position: relative; z-index: 2; width: 100%;
            display: flex; flex-direction: column; align-items: center;
        }

        .icon-squircle {
            width: 64px; height: 64px;
            border-radius: 20px;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 1rem;
            transition: transform 0.4s ease;
            background: #f8f9fa;
        }

        .category-card:hover .icon-squircle { transform: rotate(-10deg) scale(1.1); }

        @media (max-width: 768px) {
          .display-1 { font-size: 3.5rem; }
          .hero-container { height: 85vh; }
          .hero-floating-footer { display: none; }
        }
      `}</style>
    </main>
  );
}