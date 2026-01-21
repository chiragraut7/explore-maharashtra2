'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from 'next/navigation'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import ModalContent from '../components/commonComponents/ModalContent';
import Translator from '../components/commonComponents/Translator';
import ModalPortal from '../components/commonComponents/ModalPortal';
import { useLanguage } from '../components/context/LanguageContext';
import useModalsPreload from '@/hooks/useModalsPreload';
import type { ModalData } from '@/type/types';

export default function AboutPageContent() {
  const { language } = useLanguage();
  const { modals, loading } = useModalsPreload();
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);
  const pathname = usePathname();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({ duration: 800, once: false });
    }
  }, []);

  // 1. Force Close on Route Change
  useEffect(() => {
    closeModal();
  }, [pathname]);

  // 2. SCROLL LOCK EFFECT (Stronger version to fight SmoothScroll)
  useEffect(() => {
    if (activeModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // We use !important to force override the SmoothScroll library's styles
      document.body.style.setProperty('overflow', 'hidden', 'important');
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.classList.add('modal-open');
      
      // Optional: If your smooth scroll uses the html tag
      document.documentElement.style.setProperty('overflow', 'hidden', 'important');

    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.classList.remove('modal-open');
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.classList.remove('modal-open');
      document.documentElement.style.overflow = '';
    };
  }, [activeModal]);

  const handleViewMore = (modalId: string) => {
    const key = modalId.replace('#', '').replace('Modal', '');
    if (modals[key]) setActiveModal(modals[key]);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div className="min-vh-100 bg-[#fcfaf8]" ref={containerRef}>
        <motion.div 
          className="fixed-top" 
          style={{ scaleX: scrollYProgress, height: '4px', background: '#ff5722', transformOrigin: '0%', zIndex: 1020 }} 
        />

        {/* --- Header & Timeline Sections (No Changes Here) --- */}
        <header className="about-hero position-relative overflow-hidden">
          <div className="hero-parallax-bg"></div>
          <div className="hero-overlay"></div>
          <div className="container position-relative z-2 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="display-3 fw-bold mb-3">
                <Translator text="Journey Through Maharashtra" targetLang={language} />
              </h1>
              <p className="lead fs-4 opacity-75">
                <Translator text="Exploring the legacy and spirit of the Great Land" targetLang={language} />
              </p>
            </motion.div>
          </div>
        </header>

        <section className="container py-5 position-relative">
          <div className="timeline-wrapper">
            <div className="timeline-track d-none d-md-block">
              <motion.div className="timeline-progress" style={{ scaleY }} />
            </div>

            {timelineItems.map((item, i) => (
              <div key={i} className={`timeline-row mb-5 ${i % 2 === 0 ? 'row-left' : 'row-right'}`}>
                <div className="row g-0 align-items-center w-100">
                  <div className={`col-md-5 timeline-card-col ${i % 2 === 0 ? 'order-1' : 'order-3'}`}>
                    <motion.div 
                      whileHover={{ y: -8, scale: 1.01 }}
                      className="timeline-glass-card shadow-sm"
                      data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                    >
                      <div className="timeline-year-badge">
                          <Translator text={item.year} targetLang={language} />
                      </div>

                      <div className="card-inner-content p-4 p-lg-5">
                        <h3 className="fw-bold h4 mb-3 text-dark">
                          <Translator text={item.title} targetLang={language} />
                        </h3>
                        <p className="text-muted mb-4 card-description">
                          <Translator text={item.description} targetLang={language} />
                        </p>
                        <button
                          className="btn-read-more"
                          onClick={() => handleViewMore(item.modalId)}
                        >
                          <Translator text="Read More" targetLang={language} />
                          <i className="fas fa-chevron-right ms-2 arrow-icon"></i>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                  <div className="col-md-2 d-none d-md-flex justify-content-center z-3 order-2">
                     <div className="timeline-outer-node shadow-sm">
                        <div className="timeline-inner-node"></div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- MODAL PORTAL --- */}
      <ModalPortal>
        {activeModal && (
          <>
            <div 
              className="modal-backdrop fade show" 
              style={{ zIndex: 5001 }}
              onClick={closeModal}
            ></div>

            <div 
              className="modal fade show" 
              id="dynamicModal" 
              tabIndex={-1} 
              aria-modal="true" 
              role="dialog"
              data-lenis-prevent="true" // Tells Lenis Scroll to ignore this
              // Stops the SmoothScroll from hijacking the wheel/touch events
              onWheel={(e) => e.stopPropagation()} 
              onTouchMove={(e) => e.stopPropagation()}
              style={{ 
                display: 'block', 
                zIndex: 5002,
                overflowX: 'hidden', 
                overflowY: 'auto',  
                position: 'fixed',  
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overscrollBehavior: 'contain' // Prevents scroll chaining to body
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) closeModal();
              }}
            >
              <div 
                className="modal-dialog modal-dialog-centered modal-xl"
                style={{
                  margin: '1.75rem auto',
                  pointerEvents: 'none'
                }}
              >
                <div 
                  className="modal-content border-0 shadow-lg rounded-4 overflow-hidden"
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="modal-header border-0 bg-light px-4">
                    <h5 className="modal-title fw-bold">
                      <Translator text={activeModal.title} targetLang={language} />
                    </h5>
                    <button 
                      type="button" 
                      className="btn-close shadow-none" 
                      onClick={closeModal}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body p-0">
                     {loading ? (
                       <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>
                     ) : (
                       <ModalContent modal={activeModal} />
                     )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </ModalPortal>

      <style jsx global>{`
        /* Your Existing CSS */
        .about-hero { height: 45vh; display: flex; align-items: center; justify-content: center; }
        .hero-parallax-bg {
          position: absolute; inset: 0;
          background: url('/assets/images/bannerImages/aboutBanner.jpg') center/cover no-repeat fixed;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4));
          z-index: 1;
        }
        .timeline-track { position: absolute; left: 50%; transform: translateX(-50%); width: 4px; height: 100%; background: #e9ecef; z-index: 1; top:0; }
        .timeline-progress { width: 100%; height: 100%; background: #ff5722; transform-origin: top; }
        .timeline-glass-card { background: #ffffff; border-radius: 25px; position: relative; border: 1px solid rgba(0,0,0,0.03); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .row-left .timeline-glass-card { text-align: right; margin-right: 25px; }
        .row-right .timeline-glass-card { text-align: left; margin-left: 25px; }
        .timeline-year-badge { position: absolute; top: -18px; background: #ff5722; color: white; padding: 6px 20px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; box-shadow: 0 4px 15px rgba(255, 87, 34, 0.3); z-index: 5; }
        .row-left .timeline-year-badge { right: 30px; }
        .row-right .timeline-year-badge { left: 30px; }
        .timeline-outer-node { width: 44px; height: 44px; background: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px solid #ff5722; z-index: 10; }
        .timeline-inner-node { width: 14px; height: 14px; background: #007bff; border-radius: 50%; }
        .btn-read-more { border: none; background: transparent; color: #ff5722; font-weight: 700; padding: 0; transition: 0.3s; display: inline-flex; align-items: center; }
        .btn-read-more:hover .arrow-icon { transform: translateX(5px); }
        .card-description { line-height: 1.7; font-size: 0.95rem; }
        @media (max-width: 768px) {
          .timeline-track { display: none; }
          .timeline-glass-card { text-align: left !important; margin: 0 10px 40px 10px !important; }
          .timeline-year-badge { left: 20px !important; right: auto !important; }
        }
      `}</style>
    </>
  );
}

const timelineItems = [
  { year: '2nd BCE', title: 'Ancient Maharashtra', description: 'The awe-inspiring Ajanta & Ellora Caves were carved out of solid rock – symbols of ancient Indian art and Buddhism.', modalId: '#ancientModal' },
  { year: '8th–13th', title: 'Yadava & Chalukya Era', description: 'Flourishing of Hindu temples, literature, and trade in the Deccan region under powerful local dynasties.', modalId: '#yadavaModal' },
  { year: '17th', title: 'Maratha Empire', description: 'Chhatrapati Shivaji Maharaj established forts and unified Maratha pride, birthing the vision of Swarajya.', modalId: '#marathaModal' },
  { year: '1818', title: 'British Rule', description: 'After the defeat of the Marathas, Maharashtra became part of the Bombay Presidency under British administration.', modalId: '#britishModal' },
  { year: '1947', title: 'Independence', description: 'Maharashtra played a key role in the Quit India Movement and India’s final fight for freedom.', modalId: '#independenceModal' },
  { year: '1960', title: 'State Formation', description: 'The modern state of Maharashtra was officially formed on May 1st, 1960, after the Samyukta Maharashtra Movement.', modalId: '#formationModal' },
  { year: '1980s', title: 'Industrial Boom', description: 'Mumbai rose as India’s financial capital with booming industries and a massive migration for economic opportunities.', modalId: '#industrialModal' },
  { year: '2000s', title: 'Tourism Growth', description: 'Maharashtra became a tourism hotspot, investing in heritage conservation and eco-tourism across the state.', modalId: '#tourismModal' }
];