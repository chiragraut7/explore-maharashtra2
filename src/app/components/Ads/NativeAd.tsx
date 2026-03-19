"use client";

import { useEffect, useRef, useState } from "react";
import Translator from "../commonComponents/Translator";
import { useLanguage } from "../context/LanguageContext";

interface NativeAdProps {
  slot: string;
}

export default function NativeAd({ slot }: NativeAdProps) {
  const { language } = useLanguage();
  const adLoaded = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Ensure component is mounted on the client to avoid Hydration Mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        // 2. Only push if the library is available and we haven't pushed for this mount
        if (typeof window !== "undefined" && (window as any).adsbygoogle) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          adLoaded.current = true;
        }
      } catch (e) {
        // Catching the "All ins elements must have an ad-client" error
        console.error("AdSense Error:", e);
      }
    }
    
    // Cleanup: Reset ref if the slot changes to allow re-injection
    return () => {
      adLoaded.current = false;
    };
  }, [isMounted, slot]); 

  if (!isMounted) return null;

  return (
    <div className="native-ad-container mx-auto my-5 w-100">
      <div className="ad-header-ui">
        <div className="ad-pill">
          <i className="fas fa-crown me-2"></i>
          <Translator text="Travel Partner" targetLang={language} />
        </div>
      </div>

      <div className="ad-frame shadow-lg rounded-5 overflow-hidden border border-light bg-white">
        {/* 3. The key={slot} ensures React re-renders this if the ID changes */}
        <ins
          key={slot}
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-9512553309798745"}
          data-ad-slot={slot}
        ></ins>
        
        {/* Skeleton only shows if the ad hasn't loaded a height yet */}
        <div className="ad-skeleton-bg">
           <p className="small fw-bold text-muted opacity-50 tracking-widest text-uppercase">
             Curating Heritage Content...
           </p>
        </div>
      </div>

      <style jsx>{`
        .native-ad-container { max-width: 850px; position: relative; }
        .ad-header-ui { display: flex; justify-content: center; margin-bottom: -15px; position: relative; z-index: 10; }
        .ad-pill { background: #ff5722; color: white; font-size: 0.65rem; font-weight: 900; letter-spacing: 2px; padding: 6px 20px; border-radius: 100px; text-transform: uppercase; box-shadow: 0 10px 20px rgba(255, 87, 34, 0.2); }
        .ad-frame { min-height: 280px; position: relative; display: flex; align-items: center; justify-content: center; }
        .ad-skeleton-bg { position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: center; background: #f8f9fa; pointer-events: none; }
        .adsbygoogle { position: relative; z-index: 5; width: 100%; min-height: 280px; }
        
        /* Ensures the skeleton disappears once Google injects the ad */
        .adsbygoogle[data-ad-status="filled"] + .ad-skeleton-bg {
          display: none;
        }
      `}</style>
    </div>
  );
}