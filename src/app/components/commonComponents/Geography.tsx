"use client";
import React from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";

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
  description?: string;
  seasons?: Season[];
}

interface GeographyContent {
  image?: string;
  intro?: string;
  details?: DetailItem[];
  climate?: Climate;
  conclusion?: string;
}

interface GeographyProps {
  content?: GeographyContent;
  color?: string;
}

const Geography: React.FC<GeographyProps> = ({ content, color = "#00aaff" }) => {
  if (!content) return null;

  return (
    <section id="geography" className="mb-8">
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
          {content.intro && (
            <p className="text-gray-700 mb-3 leading-relaxed">{content.intro}</p>
          )}

          {content.details?.map((detail, idx) => (
            <p key={idx} className="flex items-center gap-2 text-gray-700 mb-2">
              {detail.icon && <i className={detail.icon} style={{ color }}></i>}
              <strong>{detail.label}:</strong> {detail.value}
            </p>
          ))}

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
                    {season.icon && <i className={`${season.icon} text-xl`} style={{ color }} />}
                    <br />
                    <span className="text-gray-700">{season.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {content.conclusion && (
            <p className="text-gray-700 mt-3 leading-relaxed">{content.conclusion}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Geography;
