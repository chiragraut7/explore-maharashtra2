"use client";
import React from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";

interface GeographyProps {
  content?: {
    image?: string;
    intro?: string;
    details?: { icon?: string; label?: string; value?: string }[];
    climate?: {
      description?: string;
      seasons?: { icon?: string; text?: string }[];
    };
    conclusion?: string;
    [key: string]: any;
  };
  color?: string;
}

const Geography: React.FC<GeographyProps> = ({ content, color = "#00aaff" }) => {
  if (!content) return null;

  return (
    <section id="geography" className="mb-8">
      {/* ✅ Dynamic section title color */}
      <SectionTitle title="Geography" color={color} />

      <div className="geography-card flex flex-col md:flex-row gap-4">
        {content.image && (
          <div className="relative w-full md:w-1/2 h-64 md:h-auto">
            <Image
              src={content.image}
              alt="Beach Geography"
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="flex-1">
          {/* Intro */}
          {content.intro && (
            <p className="text-gray-700 mb-3 leading-relaxed">{content.intro}</p>
          )}

          {/* Details */}
          {content.details?.map((detail, idx) => (
            <p
              key={idx}
              className="flex items-center gap-2 text-gray-700 mb-2"
            >
              {detail.icon && (
                <i
                  className={detail.icon}
                  style={{ color }}
                ></i>
              )}
              <strong>{detail.label}:</strong> {detail.value}
            </p>
          ))}

          {/* Climate Section */}
          {content.climate && (
            <div className="mt-4">
              {content.climate.description && (
                <p className="text-gray-700">{content.climate.description}</p>
              )}

              <div className="grid grid-cols-2 gap-3 mt-3">
                {content.climate.seasons?.map((season, i) => (
                  <div
                    key={i}
                    className="highlight-item text-center border rounded-lg py-2 px-3 shadow-sm"
                    style={{ borderColor: color }}
                  >
                    {season.icon && (
                      <i
                        className={`${season.icon} text-xl`}
                        style={{ color }}
                      ></i>
                    )}
                    <br />
                    <span className="text-gray-700">{season.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {content.conclusion && (
            <p className="text-gray-700 mt-3 leading-relaxed">
              {content.conclusion}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Geography;
