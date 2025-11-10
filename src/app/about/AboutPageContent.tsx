'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ModalContent from '../components/commonComponents/ModalContent';
import Translator from '../components/commonComponents/Translator';
import { useLanguage } from '../components/context/LanguageContext';
import useModalsPreload from '@/hooks/useModalsPreload';
import type { ModalData } from '@/type/types';

export default function AboutPageContent() {
  const { language } = useLanguage();
  const { modals, loading } = useModalsPreload();
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
      AOS.init({ duration: 1000 });
    }
  }, []);

  // Clear modal on close
  useEffect(() => {
    const handler = () => setActiveModal(null);
    window.addEventListener('hidden.bs.modal', handler);
    return () => window.removeEventListener('hidden.bs.modal', handler);
  }, []);

  const handleViewMore = (modalId: string) => {
    const key = modalId.replace('#', '').replace('Modal', '');
    if (modals[key]) {
      setActiveModal(modals[key]);
    }
  };

  return (
    <>
      <header className="shadow-sm">
        <div className="banner text-center py-5">
          <h1 className="display-4 text-white fw-bold">
            <Translator text="About Us" targetLang={language} />
          </h1>
          <p className="lead text-white">
            <Translator text="Explore Maharashtra" targetLang={language} />
          </p>
        </div>
      </header>

      <section className="container py-5">
        <div className="home text-center">
          <h2 className="section-title mt-2 mb-4">
            <Translator text="Journey Through Maharashtra - Timeline" targetLang={language} />
          </h2>

          <div className="timeline-container mt-0">
            <div className="timeline-line"></div>

            {timelineItems.map((item, i) => (
              <div key={i} className={`timeline-row ${i % 2 === 0 ? 'odd' : 'even'} timeline-hover`}>
                <div className="timeline-year" data-aos="fade-down">
                  <Translator text={item.year} targetLang={language} />
                </div>
                <div
                  className="timeline-content"
                  data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                  data-aos-delay="600"
                >
                  <h4><Translator text={item.title} targetLang={language} /></h4>
                  <p><Translator text={item.description} targetLang={language} /></p>
                  <button
                    type="button"
                    className="btn btn-outline-dark view-more-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#dynamicModal"
                    onClick={() => handleViewMore(item.modalId)}
                  >
                    <Translator text="View More" targetLang={language} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Dynamic Modal */}
      <div className="modal fade" id="dynamicModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-warning-subtle border-0">
              <h5 className="modal-title fw-bold text-dark">
                {activeModal ? (
                  <Translator text={activeModal.title} targetLang={language} />
                ) : (
                  'Explore Maharashtra'
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setActiveModal(null)}
              ></button>
            </div>
            <div className="modal-body px-4 py-4">
              {loading && <p>Loading...</p>}
              {!loading && activeModal && <ModalContent modal={activeModal} />}
              {!loading && !activeModal && <p>Select a timeline to view more.</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const timelineItems = [
  { year: '2nd BCE', title: 'Ancient Maharashtra', description: 'Ajanta & Ellora Caves carved – symbols of ancient Indian art and Buddhism.', modalId: '#ancientModal' },
  { year: '8th–13th', title: 'Yadava & Chalukya Era', description: 'Flourishing of Hindu temples, literature, and trade in the Deccan region.', modalId: '#yadavaModal' },
  { year: '17th', title: 'Maratha Empire', description: 'Chhatrapati Shivaji Maharaj established forts and unified Maratha pride.', modalId: '#marathaModal' },
  { year: '1818', title: 'British Rule', description: 'After defeat of Marathas, Maharashtra became part of the Bombay Presidency.', modalId: '#britishModal' },
  { year: '1947', title: 'Independence', description: 'Maharashtra played a key role in the Quit India Movement and freedom fight.', modalId: '#independenceModal' },
  { year: '1960', title: 'State Formation', description: 'Maharashtra was officially formed on May 1st, 1960.', modalId: '#formationModal' },
  { year: '1980s', title: 'Industrial Boom', description: 'Mumbai rose as India’s financial capital with booming industries.', modalId: '#industrialModal' },
  { year: '2000s', title: 'Tourism Growth', description: 'Maharashtra became a tourism hotspot with heritage and eco-tourism growth.', modalId: '#tourismModal' }
];
