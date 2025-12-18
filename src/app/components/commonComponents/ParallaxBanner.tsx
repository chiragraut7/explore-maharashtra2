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
  minScale = 0.9,
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

          const progress =
            1 - Math.min(Math.max(rect.top / viewportHeight, 0), 1);

          // Scale
          const scale = minScale + (maxScale - minScale) * progress;

          // Flip effect (window opening)
          const rotateX = 15 - progress * 15; // 15deg → 0deg
          const translateY = (1 - progress) * 40;

          ref.current!.style.transform = `
            perspective(1200px)
            translateY(${translateY}px)
            scale(${scale})
            rotateX(${rotateX}deg)
          `;

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [minScale, maxScale]);

  return (
    <div className="parallax-wrapper">
      {/* Background Layer */}
      <div ref={ref} className="parallax-inner">
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
          <Translator text={title} targetLang={language} />
        </h1>

        {subtitle && (
          <p className="lead text-white">
            <Translator text={subtitle} targetLang={language} />
          </p>
        )}
      </div>

      <style jsx>{`
        .parallax-wrapper {
          position: relative;
          height: 56vh;
          overflow: hidden;
          perspective: 1200px;
          background: #000;
        }
        .parallax-wrapper {
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06));
        }

        .parallax-inner {
          position: absolute;
          inset: 0;
          transform-origin: center;
          transition: transform 0.12s ease-out;
          will-change: transform;
        }

        .parallax-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(2, 6, 23, 0.35),
            rgba(2, 6, 23, 0.15)
          );
        }

        .parallax-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 1.25rem;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .parallax-wrapper {
            height: 40vh;
          }
          .parallax-inner {
            transform: scale(1) rotateX(0deg) !important;
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
