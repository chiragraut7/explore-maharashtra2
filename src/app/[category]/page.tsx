'use client';

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useScroll, useSpring, AnimatePresence, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from '../components/context/LanguageContext'
import Translator from "../components/commonComponents/Translator";

export default function CategoryPage() {
  const { language } = useLanguage();
  const { category } = useParams() as { category: string };
  
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const [activeShare, setActiveShare] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0%", "end 100%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const storageKey = `favs_${category}`;

  const getBannerImage = (cat: string) => { /* ... keep mapping ... */ return "/assets/images/bannerImages/beahces.jpg"; };
  const getCategoryIcon = (cat: string) => { /* ... keep mapping ... */ return "fa-map-marked-alt"; };

  useEffect(() => {
    const savedFavs = localStorage.getItem(storageKey);
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    AOS.init({ duration: 800, once: false, offset: 100 });
    
    async function fetchItems() {
      try {
        const res = await fetch(`/api/${category}`);
        const json = await res.json();
        setItems(json.success ? json.data : []);
      } catch(e) {}
    }
    if (category) fetchItems();
  }, [category, storageKey]);

  // --- LISTEN FOR HEADER EVENTS ---
  useEffect(() => {
    const handleToggleFilter = (e: any) => {
        setShowFavoritesOnly(e.detail);
    };
    const handleClearReq = () => {
        if (window.confirm(`Clear all saved ${category}?`)) {
            setFavorites([]);
            localStorage.removeItem(storageKey);
            setShowFavoritesOnly(false);
            window.dispatchEvent(new Event('favorites_updated')); // Tell header count is 0
        }
    };

    window.addEventListener('toggle_fav_filter', handleToggleFilter);
    window.addEventListener('req_clear_favs', handleClearReq);

    return () => {
        window.removeEventListener('toggle_fav_filter', handleToggleFilter);
        window.removeEventListener('req_clear_favs', handleClearReq);
    }
  }, [category, storageKey]);

  // --- ACTIONS ---
  const toggleFavorite = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    const uniqueId = itemId; 
    let updatedFavs = [...favorites];
    if (updatedFavs.includes(uniqueId)) {
      updatedFavs = updatedFavs.filter(id => id !== uniqueId);
    } else {
      updatedFavs.push(uniqueId);
    }
    setFavorites(updatedFavs);
    localStorage.setItem(storageKey, JSON.stringify(updatedFavs));
    
    // NOTIFY HEADER TO UPDATE COUNT
    window.dispatchEvent(new Event('favorites_updated'));
  };

  const handleShare = (platform: string, item: any) => { /* ... keep existing ... */ setActiveShare(null); };

  const filteredItems = items.filter(item => {
    const matchesSearch = (item.title || item.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const rawId = item.slug || item.id;
    const matchesFav = showFavoritesOnly ? favorites.includes(rawId) : true;
    return matchesSearch && matchesFav;
  });

  return (
    <div className="min-vh-100 bg-page-gradient overflow-hidden" ref={containerRef}>
      
      {/* ⚠️ REMOVED FAV-HUD FROM HERE, IT IS NOW IN HEADER */}

      <motion.div className="fixed-top" style={{ scaleX: scrollYProgress, height: '4px', background: 'linear-gradient(90deg, #ff5722, #ff9f43)', transformOrigin: '0%', zIndex: 9999 }} />

      {/* ... REST OF YOUR HERO AND TIMELINE CODE REMAINS THE SAME ... */}
      {/* Just copy the Header, Timeline Section, and Styles from your previous working code */}
      
      {/* --- HERO SECTION --- */}
        <header className="category-hero-container">
          <motion.div className="hero-image-wrapper">
            <Image src={getBannerImage(category)} alt={category} fill priority className="object-fit-cover" />
            <div className="hero-overlay-gradient" />
          </motion.div>

          <motion.div className="container text-center z-10 position-relative hero-content-box">
             {/* ... Hero Content ... */}
             <motion.div 
             >
               <div className="d-inline-flex align-items-center justify-content-center border border-white/30 rounded-full px-4 py-1 mb-3 glass-badge">
                  <i className={`fas ${getCategoryIcon(category)} me-2 text-warning`}></i>
                  <span className="text-uppercase tracking-widest text-xs font-bold text-white">
                    <Translator text="Explore Maharashtra" targetLang={language} />
                  </span>
               </div>
               <h1 className="display-1 text-white fw-black text-uppercase tracking-tighter mb-2 hero-title text-shadow-lg">
                 <Translator text={category} targetLang={language}/>
               </h1>
               <p className="text-white/80 lead mb-5 fs-6 max-w-lg mx-auto d-none d-md-block">
                 Discover the hidden gems and popular destinations in our curated list.
               </p>
             </motion.div>
             
             {/* Search Bar */}
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.4, duration: 0.6 }}
               className="row justify-content-center px-3"
             >
                <div className="col-md-6 col-lg-5 position-relative">
                  <div className="search-glass-bar d-flex align-items-center px-3 py-3 rounded-pill shadow-2xl">
                      <i className="fas fa-search text-white/70 ms-2 me-3"></i>
                      <input 
                          type="text" 
                          className="form-control bg-transparent border-0 text-white placeholder-white/60 shadow-none p-0 fw-medium" 
                          placeholder={`Find your next adventure in ${category}...`} 
                          value={searchTerm} 
                          onChange={(e) => setSearchTerm(e.target.value)} 
                      />
                  </div>
                </div>
             </motion.div>
          </motion.div>

          <div className="hero-curve-mask">
              <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-100 h-100 block">
                  <path d="M0 120L1440 120L1440 0C1440 0 1110 80 720 80C330 80 0 0 0 0L0 120Z" fill="#f8f9fa"/>
              </svg>
          </div>
        </header>

        {/* --- MAIN TIMELINE SECTION --- */}
        <section className="container position-relative z-10">
          <div className="timeline-wrapper">
              
              <div className="timeline-track d-none d-md-block">
                  <motion.div className="timeline-progress" style={{ scaleY }} />
              </div>

              <div className="row g-0 justify-content-center">
                  {filteredItems.length === 0 && (
                      <div className="text-center py-5">
                          <h3 className="text-muted"><Translator text="No places found." targetLang={language} /></h3>
                          {showFavoritesOnly && (
                              <button onClick={() => {
                                  setShowFavoritesOnly(false);
                                  // Notify header to uncheck the button visual
                                  window.dispatchEvent(new CustomEvent('toggle_fav_filter', { detail: false }));
                              }} className="btn btn-link text-primary mt-2">
                                  <Translator text="View All Places" targetLang={language} />
                              </button>
                          )}
                      </div>
                  )}

                  <AnimatePresence mode="popLayout">
                      {filteredItems.map((item, index) => {
                          const rawId = item.slug || item.id || `item-${index}`;
                          const isFav = favorites.includes(rawId);
                          const isHovered = hoveredIndex === index;
                          const isLeft = index % 2 === 0;
                          const isFocused = focusedIndex === index;
                          const isNodeActive = isFocused || isFav;

                          return (
                              <div key={rawId} className={`timeline-row mb-5 w-100`}>
                                  <div className="row g-0 align-items-center w-100">
                                      
                                      <div className={`col ${isLeft ? 'order-1 text-end pe-3' : 'order-3 text-start ps-3'}`}>
                                          <motion.div 
                                              onViewportEnter={() => setFocusedIndex(index)}
                                              viewport={{ margin: "-48% 0px -48% 0px" }} 
                                              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                              whileInView={{ opacity: 1, x: 0 }}
                                              transition={{ duration: 0.6 }}
                                              className="card-main-container group position-relative overflow-hidden rounded-4 shadow-xl border-0 bg-white d-inline-block text-start" 
                                              style={{ height: '320px', width: '100%', cursor: 'pointer' }}
                                              onMouseEnter={() => setHoveredIndex(index)} 
                                              onMouseLeave={() => setHoveredIndex(null)}
                                              onClick={() => setIsZoomed(isZoomed === index ? null : index)}
                                          >
                                              <div className="h-100 w-100 overflow-hidden position-relative">
                                                  <Image 
                                                      src={item.bannerImage || '/assets/images/placeholder.jpg'} 
                                                      alt="img" 
                                                      fill 
                                                      className={`object-fit-cover transition-transform duration-700 ${isZoomed === index ? 'scale-125' : 'group-hover:scale-110'}`} 
                                                  />
                                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                                              </div>
                                              
                                              <div className="position-absolute top-0 w-100 p-3 z-3 d-flex justify-content-between align-items-start">
                                                  <div className="d-flex gap-2">
                                                      <motion.button 
                                                          whileTap={{ scale: 0.8 }}
                                                          onClick={(e) => toggleFavorite(e, rawId)} 
                                                          className={`rounded-circle border-0 d-flex align-items-center justify-content-center glass-btn text-white action-trigger ${isFav ? 'bg-danger border-danger' : 'bg-black/20 hover:bg-black/40'}`} 
                                                          style={{ width: '38px', height: '38px' }}
                                                      >
                                                          <i className={`${isFav ? 'fas fa-heart' : 'far fa-heart'}`}></i>
                                                      </motion.button>
                                                      <div className="d-flex align-items-center position-relative">
                                                          <motion.button 
                                                              whileTap={{ scale: 0.8 }}
                                                              onClick={(e) => { e.stopPropagation(); setActiveShare(activeShare === index ? null : index); }} 
                                                              className="rounded-circle border-0 d-flex align-items-center justify-content-center glass-btn bg-black/20 text-white action-trigger hover:bg-black/40" 
                                                              style={{ width: '38px', height: '38px' }}
                                                          >
                                                              <i className="fas fa-share-alt"></i>
                                                          </motion.button>
                                                          <AnimatePresence>
                                                              {activeShare === index && (
                                                                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 10, opacity: 1 }} exit={{ x: -10, opacity: 0 }} className="d-flex gap-2 p-1 ms-2 rounded-pill glass-tooltip">
                                                                      <button onClick={() => handleShare('whatsapp', item)} className="btn-share-icon text-success hover:scale-110 transition-transform"><i className="fab fa-whatsapp fa-lg"></i></button>
                                                                      <button onClick={() => handleShare('copy', item)} className="btn-share-icon text-white hover:scale-110 transition-transform"><i className="fas fa-link fa-sm"></i></button>
                                                                  </motion.div>
                                                              )}
                                                          </AnimatePresence>
                                                      </div>
                                                  </div>
                                                  <div className="glass-badge-icon rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '38px', height: '38px' }}>
                                                      <i className={`fas ${getCategoryIcon(category)} small`}></i>
                                                  </div>
                                              </div>

                                              <div className="position-absolute bottom-0 w-100 p-4 z-10 transition-all duration-300">
                                                  <div className={`transition-all duration-500 ${hoveredIndex === index ? 'translate-y-[-10px]' : 'translate-y-0'}`}>
                                                      <div className="d-flex justify-content-between align-items-end mb-1">
                                                          <h3 className="fw-bold h5 mb-0 text-white text-shadow-sm tracking-tight">
                                                              <Translator text={item.title || item.name} targetLang={language} />
                                                          </h3>
                                                          {item.distance && (
                                                              <span className="badge rounded-pill bg-white/20 backdrop-blur-sm border border-white/20 text-white font-weight-normal ms-2 mb-1" style={{ fontSize: '0.65rem' }}>
                                                                  <i className="fas fa-location-arrow me-1"></i>{item.distance}
                                                              </span>
                                                          )}
                                                      </div>
                                                      <motion.div 
                                                          initial={{ height: 0, opacity: 0 }}
                                                          animate={{ height: hoveredIndex === index ? 'auto' : 0, opacity: hoveredIndex === index ? 1 : 0 }}
                                                          className="overflow-hidden"
                                                      >
                                                          <p className="text-white/80 mb-3 line-clamp-2 mt-2" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                                                              <Translator text={item.subtitle} targetLang={language} />
                                                          </p>
                                                          <Link href={`/${category}/${rawId}`} className="btn btn-gradient-primary rounded-pill w-100 btn-sm fw-bold text-uppercase tracking-wider">
                                                              <span className="d-flex align-items-center justify-content-center py-2">
                                                                  <Translator text="Explore" targetLang={language} /> <i className="fas fa-arrow-right ms-2"></i>
                                                              </span>
                                                          </Link>
                                                      </motion.div>
                                                      <motion.div animate={{ width: hoveredIndex === index ? '100%' : '40px' }} className="h-1 bg-warning mt-2 rounded-full" />
                                                  </div>
                                              </div>
                                          </motion.div>
                                      </div>

                                      <div className="col-auto d-none d-md-flex justify-content-center z-3 order-2" style={{ width: '30px' }}>
                                          <motion.div 
                                              className="timeline-outer-node shadow-sm"
                                              animate={{ 
                                                  scale: isNodeActive ? 1.3 : 1, 
                                                  borderColor: isNodeActive ? '#ff4d4d' : '#e9ecef',
                                                  boxShadow: isNodeActive ? '0 0 15px rgba(255, 77, 77, 0.5)' : 'none'
                                              }}
                                              transition={{ duration: 0.3 }}
                                          >
                                              <motion.div 
                                                  className="timeline-inner-node" 
                                                  animate={{ backgroundColor: isNodeActive ? '#ff4d4d' : '#007bff' }}
                                                  transition={{ duration: 0.3 }}
                                              ></motion.div>
                                          </motion.div>
                                      </div>

                                      <div className={`col d-none d-md-block ${isLeft ? 'order-3 ps-3' : 'order-1 pe-3'}`}></div>
                                  </div>
                              </div>
                          );
                      })}
                  </AnimatePresence>
              </div>
          </div>
        </section>

      {/* --- STYLES --- */}
      <style jsx global>{`
        :root {
            --primary-gradient: linear-gradient(135deg, #ff5722 0%, #ff9f43 100%);
        }

        .bg-page-gradient { background: #f8f9fa; }
        
        .category-hero-container { height: 85vh; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #000; }
        .hero-image-wrapper { position: absolute; inset: 0; z-index: 1; height: 120%; top: -10%; } 
        .hero-overlay-gradient { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%); z-index: 2; }
        .hero-content-box { z-index: 5; margin-top: -50px; }

        .glass-pill { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 50px; }
        .glass-circle { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.2); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: none; }
        .glass-badge { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(8px); }
        .search-glass-bar { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.25); transition: 0.3s; }
        .search-glass-bar:focus-within { background: rgba(255, 255, 255, 0.25); border-color: rgba(255, 255, 255, 0.5); box-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
        
        .cursor-pointer { cursor: pointer; }
        
        .text-shadow-lg { text-shadow: 0 4px 30px rgba(0,0,0,0.5); }
        .text-shadow-sm { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        .tracking-widest { letter-spacing: 0.2em; }
        .tracking-tighter { letter-spacing: -0.03em; }
        .hero-curve-mask { position: absolute; bottom: -1px; left: 0; width: 100%; height: 120px; z-index: 6; pointer-events: none; }

        /* --- TIMELINE CSS --- */
        .timeline-wrapper { position: relative; width: 100%; }
        
        .timeline-track { 
            position: absolute; 
            left: 50%; 
            transform: translateX(-50%); 
            width: 4px; 
            height: 100%; 
            background: #e9ecef; 
            z-index: 1; 
            top: 0; 
        }
        
        .timeline-progress { 
            width: 100%; 
            height: 100%; 
            background: #ff5722; 
            transform-origin: top; 
        }

        .timeline-outer-node { 
            width: 24px;  
            height: 24px; 
            background: #ffffff; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            border: 2px solid #e9ecef; 
            z-index: 10; 
            transition: 0.3s;
        }
        
        .timeline-inner-node { 
            width: 8px; 
            height: 8px; 
            background: #e9ecef; 
            border-radius: 50%; 
            transition: 0.3s;
        }

        .glass-btn { background: rgba(0,0,0,0.3); backdrop-filter: blur(4px); transition: 0.2s; }
        .glass-btn:hover { background: rgba(0,0,0,0.5); transform: scale(1.05); }
        .glass-tooltip { background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
        .glass-badge-icon { background: rgba(255,255,255,0.2); backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.2); }

        .btn-gradient-primary { background: var(--primary-gradient); color: white; border: none; box-shadow: 0 4px 15px rgba(255, 87, 34, 0.3); transition: 0.3s; }
        .btn-gradient-primary:hover { background: linear-gradient(135deg, #e64a19 0%, #f57c00 100%); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 87, 34, 0.4); }
        
        .pulse-anim { animation: heartPulse 1.5s infinite; }
        @keyframes heartPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }

        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        @media (max-width: 768px) { 
            .category-hero-container { height: 75vh; } 
            .timeline-track { display: none; } 
            .search-glass-bar { width: 100%; }
        }
      `}</style>
    </div>
  );
}