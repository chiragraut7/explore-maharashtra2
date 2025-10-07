"use client";
import React from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface GalleryImage {
  src?: string;
  thumb?: string;
  alt?: string;
}

interface GalleryProps {
  images?: GalleryImage[];
  color?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images = [], color = "#00aaff" }) => {
  if (!images.length) return null;

  return (
    <section id="gallery" className="mb-8">
      <SectionTitle title="Image Gallery" color={color} />

      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
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
          className="gallery-swiper py-2"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="!h-auto">
              <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200">
                {img.thumb ? (
                  <Image
                    src={img.thumb}
                    alt={img.alt || `Gallery Image ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : img.src ? (
                  <Image
                    src={img.src}
                    alt={img.alt || `Gallery Image ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-sm bg-gray-100">
                    No Image
                  </div>
                )}
                {/* Optional gradient overlay for style */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: color }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
