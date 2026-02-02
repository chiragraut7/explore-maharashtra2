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
    // This is the "Safety" verification method you needed
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8239510590682431"
          crossOrigin="anonymous"
          strategy="afterInteractive" 
        />
      </head>
      <body className={quicksand.className}>
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