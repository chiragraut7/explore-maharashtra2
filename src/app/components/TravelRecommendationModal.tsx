"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Translator from "./commonComponents/Translator";
import { useLanguage } from "./context/LanguageContext";

export default function TravelRecommendationModal() {
  const [showModal, setShowModal] = useState(false);
  const { language } = useLanguage();

  // Mock weather data for March
  const weather = {
    mahabaleshwar: "21°C",
    lonavala: "24°C",
    matheran: "22°C",
    malvan: "31°C",
    alibaug: "29°C",
    kelwa: "30°C"
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("visited_march_promo")) {
        setShowModal(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Body lock for Smooth Scroll compatibility
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    sessionStorage.setItem("visited_march_promo", "true");
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-2 md:p-4">
      
      {/* data-lenis-prevent allows scrolling inside the modal even with smooth scroll active */}
      <div 
        data-lenis-prevent
        className="relative bg-white w-full max-w-3xl rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300"
      >
        
        {/* Compact Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 bg-slate-50 hover:bg-[#ea580c] hover:text-white text-slate-400 w-8 h-8 rounded-lg flex items-center justify-center transition-all border border-slate-100"
        >
          <span className="text-xl">&times;</span>
        </button>

        {/* Scrollable Area */}
        <div className="max-h-[80vh] overflow-y-auto custom-scrollbar p-6 md:p-10">
          <div className="text-center">
            
            {/* Reduced margin on badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[8px] font-black tracking-[0.2em] text-[#ea580c] mb-0 uppercase">
               <span className="w-1 h-1 rounded-full bg-[#ea580c] animate-pulse"></span>
               <Translator text="March Special" targetLang={language} />
            </div>

            {/* Tighter heading */}
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 my-3 tracking-tighter leading-none">
              <span className="bg-gradient-to-r from-[#ea580c] via-amber-400 to-blue-500 bg-clip-text text-transparent">
                  Next Masterpiece
              </span>
            </h2>

            <p className="text-slate-500 text-xs md:text-sm max-w-md mx-auto mb-8 leading-snug font-medium">
              <Translator text="Explore the silence of Sahyadri peaks or the rhythm of the Arabian Sea." targetLang={language} />
            </p>

            {/* Grid with reduced gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-2xl mx-auto mb-6">
              
              {/* Highlands Section */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    🏔️ <Translator text="Hills" targetLang={language} />
                  </h4>
                  <Link href="/hills" onClick={handleClose} className="category-link">View All &rarr;</Link>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Link href="/hills/01" onClick={handleClose} className="pill-compact">
                    <span>Mahabaleshwar</span>
                    <span className="temp-tag">{weather.mahabaleshwar}</span>
                  </Link>
                  <Link href="/hills/03" onClick={handleClose} className="pill-compact">
                    <span>Lonavala</span>
                    <span className="temp-tag">{weather.lonavala}</span>
                  </Link>
                  <Link href="/hills/05" onClick={handleClose} className="pill-compact">
                    <span>Matheran</span>
                    <span className="temp-tag">{weather.matheran}</span>
                  </Link>
                </div>
              </div>

              {/* Beaches Section */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    🏖️ <Translator text="Beaches" targetLang={language} />
                  </h4>
                  <Link href="/beaches" onClick={handleClose} className="category-link !text-blue-500">Explore &rarr;</Link>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Link href="/beaches/00" onClick={handleClose} className="pill-compact beach-style">
                    <span>Malvan Beach</span>
                    <span className="temp-tag">{weather.malvan}</span>
                  </Link>
                  <Link href="/beaches/01" onClick={handleClose} className="pill-compact beach-style">
                    <span>Alibaug Beach</span>
                    <span className="temp-tag">{weather.alibaug}</span>
                  </Link>
                  <Link href="/beaches/02" onClick={handleClose} className="pill-compact beach-style">
                    <span>Kelwa Beach</span>
                    <span className="temp-tag">{weather.kelwa}</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* Minimalist Footer */}
            <div className="pt-2 border-t border-slate-50 flex justify-between items-center text-[8px] font-bold text-slate-300 uppercase tracking-widest">
               <span>goexploremaharashtra.in</span>
               <div className="flex gap-4">
                  <span>KONKAN</span>
                  <span>SAHYADRI</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        
      `}</style>
    </div>
  );
}