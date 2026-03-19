import { ReactNode } from "react";
import { Quicksand } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

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
// 🚀 Import the new loader
import AdSenseLoader from "./components/Ads/AdSenseLoader";

// 🚀 1. Import the new modal component
import GreetingModal from "./components/GreetingModal";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["500", "700"], display: "swap" });

export const metadata = {
  metadataBase: new URL("https://goexploremaharashtra.in"),
  title: { default: "Explore Maharashtra | Heritage & Travel Guide", template: "%s | Explore Maharashtra" },
  description: "Explore the pristine beaches, majestic forts, and misty hill stations of Maharashtra.",
  verification: { google: "nWdKg1FTf44kQHUOT4ikINwbPxuW5EdyCCDDHJK35qw" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        {/* 🛠️ Modern Tracking & Ads Setup */}
        {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />}
        <AdSenseLoader />

        {/* 🚀 2. Add the modal here */}
        <GreetingModal />

        <SmoothScroll>
          <BootstrapClient />
          <LanguageProvider>
            <Header />
            <main role="main">{children}</main>
            <Footer />
          </LanguageProvider>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}