"use client";
import React from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "../context/LanguageContext";
import Translator from "../commonComponents/Translator";

interface DetailItem {
  icon?: string;
  label?: string;
  value?: string;
}

interface Season {
  icon?: string;
  text?: string;
}

interface Climate {
  description?: string | string[];
  seasons?: Season[];
}

interface GeographyContent {
  image?: string;
  intro?: string | string[];
  details?: DetailItem[];
  climate?: Climate;
  conclusion?: string | string[];
}

interface GeographyProps {
  content?: GeographyContent;
  color?: string;
}

const Geography: React.FC<GeographyProps> = ({ content, color = "#00aaff" }) => {
  const { language } = useLanguage();

  if (!content) return null;

  // 🧠 Helper — Render paragraphs for single or multiple strings
  const renderParagraphs = (text?: string | string[]) => {
    if (!text) return null;
    const paragraphs = Array.isArray(text) ? text : [text];
    return paragraphs.map((p, i) => (
      <p key={i} className="text-gray-700 mb-3 leading-relaxed">
        <Translator text={p.trim()} targetLang={language} />
      </p>
    ));
  };

  return (
    <section id="geography" className="mb-10">
      {/* ✅ Title with multilingual support */}
      <SectionTitle title="Geography" color={color} />

      <div className="geography-card flex flex-col lg:flex-row gap-6">
        {/* 🌄 Image */}
        {content.image && (
          <div className="relative w-full lg:w-1/2 h-64 lg:h-auto rounded-lg overflow-hidden shadow-md">
            <Image
              src={content.image}
              alt="Geography Image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}

        {/* 🧭 Geography Details */}
        <div className="flex-1 text-base">
          {renderParagraphs(content.intro)}

          {/* 📋 Key Details */}
          {content.details?.length ? (
            <div className="mt-3 mb-4">
              {content.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 mb-2 text-gray-700">
                  {detail.icon && (
                    <i className={`${detail.icon} text-lg`} style={{ color }}></i>
                  )}
                  <p>
                    <strong>
                      <Translator text={detail.label || ""} targetLang={language} />:
                    </strong>{" "}
                    <Translator text={detail.value || ""} targetLang={language} />
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {/* 🌤️ Climate Section */}
          {content.climate && (
            <div className="mt-5">
              {renderParagraphs(content.climate.description)}

              {content.climate.seasons?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {content.climate.seasons.map((season, i) => (
                    <div
                      key={i}
                      className="highlight-item text-center border rounded-lg py-3 px-3 shadow-sm bg-white hover:shadow-md transition-transform hover:scale-105 duration-300"
                      style={{ borderColor: color }}
                    >
                      {season.icon && (
                        <i className={`${season.icon} text-2xl mb-2`} style={{ color }} />
                      )}
                      <span className="text-gray-700 text-sm block">
                        <Translator text={season.text || ""} targetLang={language} />
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {/* 🏞️ Conclusion */}
          {renderParagraphs(content.conclusion)}
        </div>
      </div>
    </section>
  );
};

export default Geography;
