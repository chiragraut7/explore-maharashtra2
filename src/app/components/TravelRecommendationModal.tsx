"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Translator from "./commonComponents/Translator";
import { useLanguage } from "./context/LanguageContext";

// Configuration for locations
const LOCATIONS = [
  { id: "mahabaleshwar", lat: 17.92, lon: 73.66 },
  { id: "lonavala", lat: 18.75, lon: 73.40 },
  { id: "matheran", lat: 18.98, lon: 73.26 },
  { id: "malvan", lat: 16.06, lon: 73.46 },
  { id: "alibaug", lat: 18.64, lon: 72.87 },
  { id: "kelwa", lat: 19.60, lon: 72.73 },
];

export default function TravelRecommendationModal() {
  const [showModal, setShowModal] = useState(false);
  const [weatherData, setWeatherData] = useState<Record<string, string>>({});
  const { language } = useLanguage();

  // 1. Fetch Dynamic Weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lats = LOCATIONS.map(l => l.lat).join(",");
        const lons = LOCATIONS.map(l => l.lon).join(",");
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m`
        );
        const data = await response.json();
        
        const newWeatherData: Record<string, string> = {};
        LOCATIONS.forEach((loc, index) => {
          // Open-Meteo returns an array of results when multiple coords are passed
          const temp = Array.isArray(data) 
            ? Math.round(data[index].current.temperature_2m) 
            : Math.round(data.current.temperature_2m);
          newWeatherData[loc.id] = `${temp}°C`;
        });
        
        setWeatherData(newWeatherData);
      } catch (error) {
        console.error("Weather fetch failed:", error);
      }
    };

    if (showModal) fetchWeather();
  }, [showModal]);

  // 2. Existing Session Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("visited_march_promo")) {
        setShowModal(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 3. Body Lock
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    sessionStorage.setItem("visited_march_promo", "true");
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-2 md:p-4">
      <div 
        data-lenis-prevent
        className="relative bg-white w-full max-w-3xl rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300"
      >
        <button onClick={handleClose} className="absolute top-4 right-4 z-50 bg-slate-50 hover:bg-[#ea580c] hover:text-white text-slate-400 w-8 h-8 rounded-lg flex items-center justify-center transition-all border border-slate-100">
          <span className="text-xl">&times;</span>
        </button>

        <div className="max-h-[80vh] overflow-y-auto custom-scrollbar p-6 md:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[8px] font-black tracking-[0.2em] text-[#ea580c] mb-0 uppercase">
               <span className="w-1 h-1 rounded-full bg-[#ea580c] animate-pulse"></span>
               <Translator text="March Special" targetLang={language} />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 my-3 tracking-tighter leading-none">
              <span className="bg-gradient-to-r from-[#ea580c] via-amber-400 to-blue-500 bg-clip-text text-transparent">
                  Next Masterpiece
              </span>
            </h2>

            <p className="text-slate-500 text-xs md:text-sm max-w-md mx-auto mb-8 leading-snug font-medium">
              <Translator text="Explore the silence of Sahyadri peaks or the rhythm of the Arabian Sea." targetLang={language} />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-2xl mx-auto mb-6">
              {/* Highlands */}
              <div className="w-full">
                <HeaderSection title="Hills" emoji="🏔️" link="/hills" lang={language} onClose={handleClose} />
                <div className="flex flex-col gap-2">
                  <PillItem href="/hills/01" label="Mahabaleshwar" temp={weatherData.mahabaleshwar} onClose={handleClose} />
                  <PillItem href="/hills/03" label="Lonavala" temp={weatherData.lonavala} onClose={handleClose} />
                  <PillItem href="/hills/05" label="Matheran" temp={weatherData.matheran} onClose={handleClose} />
                </div>
              </div>

              {/* Beaches */}
              <div className="w-full">
                <HeaderSection title="Beaches" emoji="🏖️" link="/beaches" lang={language} onClose={handleClose} isBlue />
                <div className="flex flex-col gap-2">
                  <PillItem href="/beaches/00" label="Malvan Beach" temp={weatherData.malvan} onClose={handleClose} isBeach />
                  <PillItem href="/beaches/01" label="Alibaug Beach" temp={weatherData.alibaug} onClose={handleClose} isBeach />
                  <PillItem href="/beaches/02" label="Kelwa Beach" temp={weatherData.kelwa} onClose={handleClose} isBeach />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-50 flex justify-between items-center text-[8px] font-bold text-slate-300 uppercase tracking-widest">
               <span>goexploremaharashtra.in</span>
               <div className="flex gap-4"><span>KONKAN</span><span>SAHYADRI</span></div>
            </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function HeaderSection({ title, emoji, link, lang, onClose, isBlue }: any) {
  return (
    <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
      <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
        {emoji} <Translator text={title} targetLang={lang} />
      </h4>
      <Link href={link} onClick={onClose} className={`category-link ${isBlue ? '!text-blue-500' : ''}`}>
        {title === "Hills" ? "View All" : "Explore"} &rarr;
      </Link>
    </div>
  );
}

function PillItem({ href, label, temp, onClose, isBeach }: any) {
  return (
    <Link href={href} onClick={onClose} className={`pill-compact ${isBeach ? 'beach-style' : ''}`}>
      <span>{label}</span>
      <span className="temp-tag">{temp || "--°C"}</span>
    </Link>
  );
}