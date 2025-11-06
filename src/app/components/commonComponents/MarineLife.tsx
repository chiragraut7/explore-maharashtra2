"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useLanguage } from "../context/LanguageContext";
import Translator from "../commonComponents/Translator";

import "swiper/css";
import "swiper/css/navigation";

interface MarineItem {
  icon?: string;
  title?: string;
  description?: string;
}

interface MarineLifeProps {
  content?: {
    title?: string;
    intro?: string | string[];
    items?: MarineItem[];
    conclusion?: string | string[];
  };
  color?: string;
}

const MarineLife: React.FC<MarineLifeProps> = ({
  content,
  color = "#00aaff", // default ocean blue
}) => {
  const { language } = useLanguage();

  if (!content) return null;

  // 🧠 Helper to handle both string and string[] (intro & conclusion)
  const renderParagraphs = (text?: string | string[]) => {
    if (!text) return null;
    const paragraphs = Array.isArray(text) ? text : [text];
    return paragraphs.map((p, i) => (
      <p
        key={i}
        className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed"
      >
        <Translator text={p} targetLang={language} />
      </p>
    ));
  };

  return (
    <section id="marine" className="mb-8">
      {/* 🌊 Section Title */}
      {content.title && <SectionTitle title={content.title} color={color} />}

      {/* 🪸 Intro Paragraph */}
      {renderParagraphs(content.intro)}

      {/* 🐠 Marine Life Carousel */}
      {content.items && content.items.length > 0 && (
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="marine-swiper py-2"
          >
            {content.items.map((item, idx) => (
              <SwiperSlide key={idx} className="!h-auto px-1">
                <div className="highlight-item h-full flex flex-col p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  {/* 🐚 Icon */}
                  {item.icon && (
                    <i
                      className={`${item.icon} text-3xl mb-3`}
                      style={{ color }}
                    />
                  )}

                  {/* 🧭 Title */}
                  {item.title && (
                    <h3 className="font-semibold text-lg mb-1">
                      <Translator text={item.title} targetLang={language} />
                    </h3>
                  )}

                  {/* 🌊 Description */}
                  {item.description && (
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                      <Translator text={item.description} targetLang={language} />
                    </p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* 🪼 Conclusion Paragraphs */}
      {renderParagraphs(content.conclusion)}
    </section>
  );
};

export default MarineLife;
