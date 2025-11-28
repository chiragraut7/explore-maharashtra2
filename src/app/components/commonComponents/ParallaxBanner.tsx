"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Translator from "../commonComponents/Translator";
import { useLanguage } from "../context/LanguageContext";

interface ParallaxBannerProps {
  image?: string;
  minScale?: number;
  maxScale?: number;
  title?: string;
  subtitle?: string;
}

const ParallaxBanner: React.FC<ParallaxBannerProps> = ({
  image = "/assets/images/beachBanner.png",
  minScale = 0.5,
  maxScale = 1,
  title = "",
  subtitle = "",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const ticking = useRef(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      if (!ticking.current) {
        requestAnimationFrame(() => {
          const rect = ref.current!.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          const bannerTop = rect.top;
          const bannerHeight = rect.height;

          const start = viewportHeight; // Starts when bottom enters viewport
          const bannerCenter = bannerTop + bannerHeight / 2;
          const viewportCenter = viewportHeight / 2;

          const end = viewportCenter - bannerHeight / 2;

          // progress 0..1
          let progress = (start - bannerTop) / (start - end);
          progress = Math.min(Math.max(progress, 0), 1);

          const scale = minScale + (maxScale - minScale) * progress;
          ref.current!.style.transform = `scale(${scale})`;

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    if (ref.current) ref.current.style.transform = `scale(${minScale})`;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [minScale, maxScale]);

  return (
    <div className="parallax-wrapper" style={{ position: "relative", height: "56vh", overflow: "hidden" }}>
      
      {/* Background Parallax Layer */}
      <div
        ref={ref}
        className="parallax-inner"
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "center",
          transition: "transform 0.08s linear",
          willChange: "transform",
        }}
      >
        <Image
          src={image}
          alt={title || "Banner"}
          priority
          fill
          sizes="(max-width: 768px) 100vw, 1600px"
          style={{ objectFit: "cover" }}
        />

        <div className="parallax-overlay" />
      </div>

      {/* Text Overlay */}
      <div className="parallax-content">
        <h1 className="display-4 text-white fw-bold">
          <Translator text={title || ""} targetLang={language} />
        </h1>

        {subtitle && (
          <p className="lead text-white">
            <Translator text={subtitle} targetLang={language} />
          </p>
        )}
      </div>

      <style jsx>{`
        .parallax-wrapper {
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06));
        }
        .parallax-inner {
          will-change: transform;
        }
        .parallax-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(2, 6, 23, 0.28), rgba(2, 6, 23, 0.12));
          pointer-events: none;
        }
        .parallax-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 2;
          padding: 3rem 1.25rem;
          pointer-events: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .parallax-wrapper {
            height: 40vh;
          }
          .parallax-content h1 {
            font-size: 26px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ParallaxBanner;
