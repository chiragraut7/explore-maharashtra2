'use client';

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from '../components/context/LanguageContext'
import Translator from "../components/commonComponents/Translator";

export default function CategoryPage() {
  const { language } = useLanguage();
  const { category } = useParams() as { category: string };
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeShare, setActiveShare] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Handle Favorites & Scroll Logic
  useEffect(() => {
    const savedFavs = localStorage.getItem('travel_favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter favorites specifically for this category
  const categorySpecificFavs = favorites.filter(id => id.startsWith(`${category}-`));

  const toggleFavorite = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    const uniqueId = `${category}-${itemId}`;
    
    let updatedFavs = [...favorites];
    if (updatedFavs.includes(uniqueId)) {
      updatedFavs = updatedFavs.filter(id => id !== uniqueId);
    } else {
      updatedFavs.push(uniqueId);
    }
    setFavorites(updatedFavs);
    localStorage.setItem('travel_favs', JSON.stringify(updatedFavs));
  };

  // NEW: Clear only favorites belonging to this category
  const clearCategoryFavs = () => {
    const updatedFavs = favorites.filter(id => !id.startsWith(`${category}-`));
    setFavorites(updatedFavs);
    localStorage.setItem('travel_favs', JSON.stringify(updatedFavs));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (platform: string, item: any, index: number) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/${category}/${item.slug || item.id || index}` : '';
    const text = `Explore ${item.title || item.name} in Maharashtra!`;
    
    if (platform === 'whatsapp') window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
    if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    if (platform === 'copy') {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    }
    setActiveShare(null);
  };

  const getCategoryIcon = (cat: string) => {
    const icons: { [key: string]: string } = {
      beaches: "fa-umbrella-beach",
      hillstations: "fa-mountain",
      forts: "fa-fort-awesome",
      wildlife: "fa-paw",
      religious: "fa-om",
      cultural: "fa-masks-theater",
    };
    const key = cat?.toLowerCase().replace(/\s/g, '');
    return icons[key] || "fa-map-marked-alt"; 
  };

  useEffect(() => {
    AOS.init({ duration: 600, once: false, offset: 50 });
    async function fetchItems() {
      try {
        const res = await fetch(`/api/${category}`);
        const json = await res.json();
        setItems(json.success ? json.data : []);
      } catch(e) {}
    }
    if (category) fetchItems();
  }, [category]);

  const filteredItems = items.filter(item => 
    (item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPath = (item: any, index: number) => {
    const slug = item.slug || item.id || index.toString().padStart(2, '0');
    return `/${category}/${slug}`;
  };

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-vh-100 bg-[#fcfaf8]" ref={containerRef} style={{ overflowX: 'hidden' }}>
      <motion.div className="fixed-top" style={{ scaleX: scrollYProgress, height: '4px', background: 'var(--primary-color)', transformOrigin: '0%', zIndex: 9999 }} />

      <header className="position-relative overflow-hidden banner-gradient pt-5">
        {/* --- FAVORITE COUNTER & CLEAR BUTTON --- */}
        <div className="position-absolute top-0 end-0 m-4 z-3 d-flex flex-column align-items-end gap-2">
          <motion.div 
            key={categorySpecificFavs.length}
            animate={categorySpecificFavs.length > 0 ? { scale: [1, 1.2, 1] } : {}}
            className="backdrop-blur-md bg-white/20 border border-white/30 rounded-pill px-3 py-2 text-white d-flex align-items-center shadow-sm"
          >
            <i className="fas fa-heart text-danger me-2"></i>
            <span className="fw-bold">{categorySpecificFavs.length}</span>
          </motion.div>

          {/* Clear Button - Only visible if current category has favorites */}
          <AnimatePresence>
            {categorySpecificFavs.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={clearCategoryFavs}
                className="btn btn-sm text-white-50 border-0 p-0 small text-decoration-underline bg-transparent"
                style={{ fontSize: '0.75rem' }}
              >
                <Translator text="Clear section favorites" targetLang={language}/>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="container text-center z-2 pb-5">
          <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="display-4 text-white fw-bold mb-4">
            <Translator text={categoryTitle} targetLang={language}/>
          </motion.h1>
          <div className="row justify-content-center px-3">
            <div className="col-md-6 backdrop-blur-md bg-white/20 border border-white/30 rounded-pill p-1 shadow-lg d-flex align-items-center">
              <i className="fas fa-search text-white ms-3 opacity-75"></i>
              <input type="text" className="form-control bg-transparent border-0 text-white placeholder-white shadow-none px-3" placeholder={`Search ${categoryTitle}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </div>
        
        <div className="waves-container">
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
            <defs><path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>
            <g className="parallax">
              <use xlinkHref="#wave" x="48" y="0" fill="rgba(252, 250, 248, 0.7)" />
              <use xlinkHref="#wave" x="48" y="3" fill="rgba(252, 250, 248, 0.5)" />
              <use xlinkHref="#wave" x="48" y="5" fill="rgba(252, 250, 248, 0.3)" />
              <use xlinkHref="#wave" x="48" y="7" fill="#fcfaf8" />
            </g>
          </svg>
        </div>
      </header>

      <section className="container position-relative py-5">
        {filteredItems.length > 0 && (
          <div className="position-absolute start-50 translate-middle-x d-none d-md-block" style={{ width: '2px', height: '100%', background: 'rgba(0,0,0,0.06)', top: '0' }}>
            <motion.div style={{ scaleY, originY: 0, background: 'var(--primary-color)', width: '100%', height: '100%' }} />
          </div>
        )}

        <div className="row g-0 justify-content-center">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const rawId = item.slug || item.id || `item-${index}`;
              const isFav = favorites.includes(`${category}-${rawId}`);

              return (
                <motion.div key={rawId} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="col-12 mb-5 position-relative">
                  <div className={`row justify-content-center align-items-center ${index % 2 !== 0 ? 'flex-md-row-reverse' : ''}`}>
                    <div className="col-md-5 col-lg-4 px-3">
                      <div className="group position-relative overflow-hidden rounded-4 shadow-lg border-0" style={{ height: '320px', cursor: 'pointer' }}>
                        <Image src={item.bannerImage || '/assets/images/placeholder.jpg'} alt="img" fill className="object-fit-cover transition-transform duration-1000 group-hover:scale-110" />
                        
                        <div className="position-absolute top-0 start-0 m-3 z-3 d-flex gap-2 align-items-center">
                          <button 
                            onClick={(e) => toggleFavorite(e, rawId)}
                            className="rounded-circle border-0 d-flex align-items-center justify-content-center backdrop-blur-md bg-black/30 text-white shadow-sm action-trigger"
                            style={{ width: '38px', height: '38px' }}
                          >
                            <motion.i 
                              animate={isFav ? { scale: [1, 1.4, 1] } : {}}
                              className={`${isFav ? 'fas fa-heart text-danger' : 'far fa-heart'}`}
                            ></motion.i>
                          </button>

                          <div className="d-flex align-items-center">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveShare(activeShare === index ? null : index); }} 
                              className="rounded-circle border-0 d-flex align-items-center justify-content-center backdrop-blur-md bg-black/30 text-white shadow-sm action-trigger" 
                              style={{ width: '38px', height: '38px' }}
                            >
                              <i className="fas fa-share-alt"></i>
                            </button>
                            
                            <AnimatePresence>
                              {activeShare === index && (
                                <motion.div 
                                  initial={{ scale: 0, opacity: 0, x: -10 }} 
                                  animate={{ scale: 1, opacity: 1, x: 8 }} 
                                  exit={{ scale: 0, opacity: 0, x: -10 }} 
                                  className="d-flex gap-2 p-2 rounded-pill backdrop-blur-lg bg-white/20 border border-white/30"
                                >
                                  <button onClick={(e) => { e.stopPropagation(); handleShare('whatsapp', item, index); }} className="btn-share-icon text-success"><i className="fab fa-whatsapp"></i></button>
                                  <button onClick={(e) => { e.stopPropagation(); handleShare('copy', item, index); }} className="btn-share-icon text-white"><i className="fas fa-link"></i></button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="position-absolute top-0 end-0 m-3 z-2">
                            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="rounded-circle d-flex align-items-center justify-content-center backdrop-blur-sm bg-white/20 border border-white/30" style={{ width: '40px', height: '40px' }}>
                                <i className={`fas ${getCategoryIcon(category)} text-white`}></i>
                            </motion.div>
                        </div>

                        <div className="position-absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
                        
                        <div className="position-absolute bottom-0 start-0 end-0 m-3 p-4 rounded-4 backdrop-blur-lg bg-white/10 border border-white/10 transition-all duration-500 group-hover:-translate-y-2">
                          <h3 className="fw-bold h5 mb-2 text-white"><Translator text={item.title || item.name} targetLang={language} /></h3>
                          <div className="max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-[120px] group-hover:opacity-100">
                            <p className="text-white-50 mb-3" style={{ fontSize: '0.75rem' }}><Translator text={item.subtitle} targetLang={language} /></p>
                            <Link href={getPath(item, index)} className="premium-btn">
                              <span className="btn-content"><Translator text="Explore Now" targetLang={language} /><i className="fas fa-chevron-right ms-2 btn-arrow"></i></span>
                              <div className="btn-shine"></div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 col-lg-4 d-none d-md-block"></div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      <style jsx global>{`
        .banner-gradient { background: linear-gradient(135deg, var(--primary-color) 0%, #1a3a5f 100%); }
        .waves-container { position: relative; width: 100%; height: 80px; margin-bottom: -2px; }
        .waves { width: 100%; height: 100%; }
        .parallax > use { animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite; }
        @keyframes move-forever { 0% { transform: translate3d(-90px,0,0); } 100% { transform: translate3d(85px,0,0); } }
        
        .action-trigger { transition: all 0.3s ease; }
        .action-trigger:hover { transform: scale(1.1); background: rgba(0,0,0,0.5); }
        .btn-share-icon { background: transparent; border: none; font-size: 1.1rem; transition: transform 0.2s; padding: 0 5px; }
        .btn-share-icon:hover { transform: scale(1.25); }

        .premium-btn { position: relative; display: inline-flex; align-items: center; padding: 8px 24px; background: var(--primary-color); color: white !important; border-radius: 50px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; overflow: hidden; transition: 0.4s; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .btn-shine { position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent); transition: 0.6s; }
        .premium-btn:hover .btn-shine { left: 100%; }
        
        .backdrop-blur-md { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .backdrop-blur-lg { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
      `}</style>
    </div>
  );
}