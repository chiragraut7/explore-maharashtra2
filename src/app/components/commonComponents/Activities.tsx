"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useLanguage } from "../context/LanguageContext";
import Translator from "../commonComponents/Translator";

import "swiper/css";
import "swiper/css/navigation";

interface DetailItem {
  label?: string;
  value?: string;
}

interface Activity {
  icon?: string;
  title?: string;
  description?: string;
  details?: DetailItem[];
}

interface ActivitiesProps {
  activities?: Activity[];
  color?: string;
}

const Activities: React.FC<ActivitiesProps> = ({
  activities = [],
  color = "#00aaff",
}) => {
  const { language } = useLanguage();

  if (!activities.length) return null;

  return (
    <section id="activities" className="mb-8">
      {/* 🏷️ Auto-translated title */}
      <SectionTitle title="Activities" color={color} />

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
          className="activities-swiper py-2"
        >
          {activities.map((act, idx) => (
            <SwiperSlide key={idx} className="!h-auto px-1">
              <div className="highlight-item h-full flex flex-col justify-start p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                {/* 🎯 Icon */}
                {act.icon && (
                  <i className={`${act.icon} text-3xl mb-3`} style={{ color }} />
                )}

                {/* 🧭 Title */}
                {act.title && (
                  <h3 className="font-semibold text-lg">
                    <Translator text={act.title} targetLang={language} />
                  </h3>
                )}

                {/* 📝 Description */}
                {act.description && (
                  <p className="text-gray-600 text-sm mb-2">
                    <Translator text={act.description} targetLang={language} />
                  </p>
                )}

                {/* 📋 Details */}
                {act.details && act.details.length > 0 && (
                  <div className="mt-auto text-sm text-gray-700 space-y-1">
                    {act.details.map((detail, i) => (
                      <p key={i}>
                        {detail.label && (
                          <>
                            <strong>
                              <Translator text={detail.label} targetLang={language} />:
                            </strong>{" "}
                          </>
                        )}
                        {detail.value && (
                          <Translator text={detail.value} targetLang={language} />
                        )}
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

export default Activities;
