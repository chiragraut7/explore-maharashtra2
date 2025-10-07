"use client";
import React from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Attraction {
  image?: string;
  title?: string;
  description?: string;
  icon?: string;
  label?: string;
  value?: string;
}

interface AttractionsProps {
  items?: Attraction[];
  color?: string;
}

const Attractions: React.FC<AttractionsProps> = ({ items = [], color = "#00aaff" }) => {
  if (!items.length) return null;

  return (
    <section id="attractions" className="mb-8">
      <SectionTitle title="Nearby Attractions" color={color} />

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
          className="attractions-swiper py-2"
        >
          {items.map((attr, idx) => (
            <SwiperSlide key={idx} className="!h-auto px-1">
              <div className="attraction-card h-full flex flex-col border rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                {/* Image */}
                {attr.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={attr.image}
                      alt={attr.title || "Attraction"}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  {attr.title && (
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color }}
                    >
                      {attr.title}
                    </h3>
                  )}

                  {attr.description && (
                    <p className="text-gray-600 text-sm mb-2">
                      {attr.description}
                    </p>
                  )}

                  {attr.label && attr.value && (
                    <p className="text-sm text-gray-700 mt-auto">
                      {attr.icon && (
                        <i
                          className={`${attr.icon} mr-2`}
                          style={{ color }}
                        ></i>
                      )}
                      <strong>{attr.label}:</strong> {attr.value}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Attractions;
