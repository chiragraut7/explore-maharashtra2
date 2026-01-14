"use client";
import React from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "../context/LanguageContext";
import Translator from "../commonComponents/Translator";
import { motion } from "framer-motion";

// -------------------- Interfaces (FIXES THE ERRORS) --------------------
interface DetailItem {
  icon?: string;
  label?: string;
  value?: string;
}

interface Season {
  icon?: string;
  text?: string;
}

interface GeographyContent {
  image?: string;
  intro?: string | string[];
  details?: DetailItem[];
  climate?: {
    description?: string | string[];
    seasons?: Season[];
  };
  conclusion?: string | string[];
}

interface GeographyProps {
  content?: GeographyContent;
  color?: string;
}

// -------------------- Component --------------------
const Geography: React.FC<GeographyProps> = ({ content, color = "#00aaff" }) => {
  const { language } = useLanguage();

  if (!content) return null;

  const renderParagraphs = (text?: string | string[], isLead = false) => {
    if (!text) return null;
    const paragraphs = Array.isArray(text) ? text : [text];
    return paragraphs.map((p, i) => (
      <p key={i} className={`${isLead ? 'lead-text-compact' : 'body-text-compact'} mb-2`}>
        <Translator text={p.trim()} targetLang={language} />
      </p>
    ));
  };

  return (
    <section id="geography" className="mb-5">
      <SectionTitle title="Geography" color={color} />

      <div className="row g-0 rounded-4 overflow-hidden shadow-sm bg-white border content-box-compact">
        
        {/* 🌄 LEFT: STICKY IMAGE */}
        {content.image && (
          <div className="col-lg-4 p-0">
            <div className="sticky-media-compact">
              <Image
                src={content.image}
                alt="Regional View"
                fill
                className="object-cover"
                sizes="(max-width: 991px) 100vw, 33vw"
                priority
              />
              <div className="image-overlay-subtle" />
              <div className="image-label-mini">
                <span className="badge-text-mini text-uppercase">
                   <Translator text="Regional Data" targetLang={language} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 🧭 RIGHT: CONTENT */}
        <div className="col-lg-8">
          <div className="p-3 p-md-4">
            
            <div className="mini-pill mb-2" style={{ color: color, backgroundColor: `${color}10` }}>
              <i className="fas fa-map-marked-alt me-2"></i>
              <Translator text="Characteristics" targetLang={language} />
            </div>

            <div className="intro-compact mb-3">
               {renderParagraphs(content.intro, true)}
            </div>

            {/* 📋 STATS GRID */}
            {content.details?.length ? (
              <div className="stats-grid-compact mb-3">
                {content.details.map((detail: DetailItem, idx: number) => (
                  <div key={idx} className="stat-card-mini border">
                    <div className="stat-icon-mini" style={{ color: color }}>
                      <i className={detail.icon || "fas fa-info-circle"}></i>
                    </div>
                    <div className="stat-text-mini">
                      <small className="text-muted text-uppercase fw-bold">
                        <Translator text={detail.label || ""} targetLang={language} />
                      </small>
                      <p className="fw-bold mb-0">
                        <Translator text={detail.value || ""} targetLang={language} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* 🌤️ CLIMATE BOX */}
            {content.climate && (
              <div className="climate-card-compact p-3 rounded-3" style={{ borderLeft: `4px solid ${color}`, background: '#f8faff' }}>
                <h6 className="fw-bold mb-1 small d-flex align-items-center">
                  <i className="fas fa-cloud-sun me-2" style={{ color }}></i>
                  <Translator text="Climate" targetLang={language} />
                </h6>
                <div className="small-desc mb-2">
                  {renderParagraphs(content.climate.description)}
                </div>

                <div className="d-flex flex-wrap gap-2">
                  {content.climate.seasons?.map((season: Season, i: number) => (
                    <div key={i} className="season-pill-mini">
                      <i className={season.icon || "fas fa-sun"} style={{ color, fontSize: '0.7rem' }}></i>
                      <span><Translator text={season.text || ""} targetLang={language} /></span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🏞️ CONCLUSION */}
            {content.conclusion && (
              <div className="mt-3 pt-2 border-top italic-conclusion-compact">
                 {renderParagraphs(content.conclusion)}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .sticky-media-compact {
          position: sticky;
          top: 0;
          height: 100%;
          min-height: 320px;
          overflow: hidden;
        }
        .image-overlay-subtle { position: absolute; inset: 0; background: rgba(0,0,0,0.03); }
        .image-label-mini { position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.6); padding: 2px 8px; border-radius: 4px; }
        .badge-text-mini { color: white; font-weight: 700; font-size: 0.6rem; letter-spacing: 1px; }

        .lead-text-compact { font-size: 0.95rem; font-weight: 600; color: #333; line-height: 1.4; }
        .body-text-compact { color: #666; line-height: 1.4; font-size: 0.85rem; }

        .mini-pill { display: inline-flex; padding: 2px 10px; border-radius: 4px; font-weight: 700; font-size: 0.65rem; text-transform: uppercase; }

        .stats-grid-compact {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 8px;
        }
        .stat-card-mini { display: flex; align-items: center; padding: 6px 10px; background: #fff; border-radius: 6px; border-color: #f0f0f0 !important; }
        .stat-icon-mini { font-size: 0.85rem; margin-right: 8px; }
        .stat-text-mini small { font-size: 0.55rem; display: block; line-height: 1; margin-bottom: 2px; }
        .stat-text-mini p { font-size: 0.75rem; line-height: 1; }

        .season-pill-mini { display: flex; align-items: center; gap: 5px; padding: 3px 8px; background: white; border-radius: 4px; font-size: 0.7rem; font-weight: 600; border: 1px solid #eee; }
        .italic-conclusion-compact { font-style: italic; font-size: 0.8rem; opacity: 0.8; }

        @media (max-width: 991px) {
          .sticky-media-compact { height: 200px; position: relative; min-height: 200px; }
        }
      `}</style>
    </section>
  );
};

export default Geography;