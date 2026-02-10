import { ReactNode } from "react";
import { Quicksand } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "leaflet/dist/leaflet.css";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./components/context/LanguageContext";
import BootstrapClient from "./BootstrapClient";
import SmoothScroll from "./components/SmoothScroll";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["500", "700"], display: "swap" });

export const metadata = {
  metadataBase: new URL("https://goexploremaharashtra.in"),
  title: { default: "GoExploreMaharashtra | Heritage & Travel Guide", template: "%s | GoExploreMaharashtra" },
  description: "Discover the hidden gems of Maharashtra: Pristine Beaches, Majestic Forts, and Misty Hill Stations.",
  verification: { google: "nWdKg1FTf44kQHUOT4ikINwbPxuW5EdyCCDDHJK35qw" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  return (
    <html lang="en">
      {/* 🚀 Optimized Third-Party Loading */}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      
      <body className={quicksand.className}>
        <SmoothScroll>
          <BootstrapClient />
          <LanguageProvider>
            <Header />
            <main role="main">{children}</main>
            <Footer />
          </LanguageProvider>
        </SmoothScroll>

        {/* 🛡️ Standard Google Analytics (GA4) */}
        {gaId && <GoogleAnalytics gaId={gaId} />}

        {/* 💰 Google AdSense */}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive" 
          />
        )}

        {/* 🔒 Optional: Security Script (Keep it after main content) */}
        <Script id="disable-inspect" strategy="lazyOnload">
          {`
            document.addEventListener('contextmenu', (e) => e.preventDefault());
            document.onkeydown = (e) => {
              if (e.keyCode === 123) return false;
              if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) return false;
              if (e.ctrlKey && e.keyCode === 85) return false;
            };
          `}
        </Script>

        <Analytics />
      </body>
    </html>
  );
}