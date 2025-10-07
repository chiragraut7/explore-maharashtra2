"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HighlightItem {
  icon?: string;
  title?: string;
  description?: string;
}

interface HighlightsProps {
  highlights?: HighlightItem[];
  color?: string; // ✅ add color here
}

const Highlights: React.FC<HighlightsProps> = ({
  highlights = [],
  color = "#00aaff", // default fallback color
}) => {
  if (!highlights.length) return null;

  return (
    <section id="highlights" className="my-4">
      <h2
        className="section-title"
        style={{ borderColor: color }}
      >
        Highlights
      </h2>

      <div className="relative group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="highlight-swiper py-2"
        >
          {highlights.map((item, index) => (
            <SwiperSlide key={index} className="h-full">
              <div className="highlight-item h-full flex flex-col justify-between p-4 border rounded-lg shadow-sm">
                {item.icon && (
                  <i className={`${item.icon} text-4xl mb-3`} style={{ color }} />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Highlights;
