import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

import { ReactNode } from "react";
import { Quicksand } from "next/font/google";
import Script from "next/script";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./components/context/LanguageContext";
import BootstrapClient from "./BootstrapClient";
import SmoothScroll from "./components/SmoothScroll";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://goexploremaharashtra.in"),
  title: {
    default: "GoExploreMaharashtra | Premium Heritage & Travel Guide",
    template: "%s | GoExploreMaharashtra"
  },
  description: "Discover the hidden gems of Maharashtra: Pristine Beaches, Majestic Forts, and Misty Hill Stations.",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "nWdKg1FTf44kQHUOT4ikINwbPxuW5EdyCCDDHJK35qw",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* --- 1. Google Tag Manager (GTM) --- */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PW39ZFWG');
            `,
          }}
        />

        {/* --- 2. Google Analytics (GA4) --- */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PW1K1P3MC7"
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PW1K1P3MC7');
            `,
          }}
        />

        {/* --- 3. Google AdSense --- */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8239510590682431"
          crossOrigin="anonymous"
          strategy="afterInteractive" 
        />
      </head>
      <body className={quicksand.className}>
        {/* --- GTM Noscript Fallback --- */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PW39ZFWG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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