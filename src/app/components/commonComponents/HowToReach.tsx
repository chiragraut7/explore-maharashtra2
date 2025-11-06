"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useLanguage } from "../context/LanguageContext";
import Translator from "../commonComponents/Translator";

import "swiper/css";
import "swiper/css/navigation";

interface TransportItem {
  icon?: string;
  title?: string;
  details?: string[];
}

interface HowToReachProps {
  transport?: TransportItem[];
  color?: string;
}

const HowToReach: React.FC<HowToReachProps> = ({
  transport = [],
  color = "#00aaff", // default accent color
}) => {
  const { language } = useLanguage();

  if (!transport.length) return null;

  return (
    <section id="reach" className="mb-8">
      {/* 🗺️ Section Title */}
      <SectionTitle title="How to Reach" color={color} />

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
          className="transport-swiper py-2"
        >
          {transport.map((item, idx) => (
            <SwiperSlide key={idx} className="!h-auto px-1">
              <div className="highlight-item h-full flex flex-col p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                {/* 🚗 Icon */}
                {item.icon && (
                  <i
                    className={`${item.icon} text-3xl mb-3`}
                    style={{ color }}
                  />
                )}

                {/* 🚆 Title */}
                {item.title && (
                  <h3 className="font-semibold text-lg mb-2" style={{ color }}>
                    <Translator text={item.title} targetLang={language} />
                  </h3>
                )}

                {/* ✈️ Details */}
                {item.details && item.details.length > 0 && (
                  <div className="text-gray-700 text-sm mt-2 space-y-1">
                    {item.details.map((line, lineIdx) => (
                      <p key={lineIdx}>
                        <Translator text={line} targetLang={language} />
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HowToReach;
