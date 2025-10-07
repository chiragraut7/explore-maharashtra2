"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

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
    intro?: string;
    items?: MarineItem[];
    conclusion?: string[];
  };
  color?: string;
}

const MarineLife: React.FC<MarineLifeProps> = ({
  content,
  color = "#00aaff", // default ocean blue
}) => {
  if (!content) return null;

  return (
    <section id="marine" className="mb-8">
      {/* Section Title */}
      {content.title && <SectionTitle title={content.title} color={color} />}

      {/* Intro Paragraph */}
      {content.intro && (
        <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">
          {content.intro}
        </p>
      )}

      {/* Marine Life Carousel */}
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
                <div className="highlight-item h-full flex flex-col p-4">
                  {/* Icon */}
                  {item.icon && (
                    <i
                      className={`${item.icon} text-3xl mb-3`}
                      style={{ color }}
                    />
                  )}

                  {/* Title */}
                  {item.title && (
                    <h3
                      className="font-semibold text-lg mb-1"
                    >
                      {item.title}
                    </h3>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Conclusion Paragraphs */}
      {content.conclusion?.map((para, idx) => (
        <p
          key={idx}
          className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed"
        >
          {para}
        </p>
      ))}
    </section>
  );
};

export default MarineLife;
