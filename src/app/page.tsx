// app/page.tsx  (or components/Home.tsx) - client component
"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./components/context/LanguageContext";

// Import category sliders (assume paths exist)
import BeachList from "./components/beaches/BeachList";
import HillList from "./components/HillList";
import FortList from "./components/FortList";
import NatureList from "./components/NatureList";
import ReligiousList from "./components/ReligiousList";
import CulturalList from "./components/CulturalList";
import Translator from "./components/commonComponents/Translator";

import useFastParallax from "@/hooks/useFastParallax";

type ParallaxBannerProps = {
  image?: string;
  minScale?: number;
  maxScale?: number;
  title?: string;
  subtitle?: string;
};

/**
 * ParallaxBanner
 * scale goes from minScale -> maxScale as the banner scrolls up
 */
function ParallaxBanner({
  image = "/assets/images/beachBanner.png",
  minScale = 0.5,
  maxScale = 1,
  title = "",
  subtitle = "",
}: ParallaxBannerProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const ticking = React.useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      if (!ticking.current) {
        requestAnimationFrame(() => {
          const rect = ref.current!.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const bannerTop = rect.top;
          const bannerHeight = rect.height;

          // START: when banner bottom enters viewport bottom
          const start = viewportHeight;
          // END: when banner center reaches viewport center
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
        <Image src={image} alt={title || "Banner"} priority fill sizes="(max-width: 768px) 100vw, 1600px" style={{ objectFit: "cover" }} />
        <div className="parallax-overlay" />
      </div>

      <div className="parallax-content">
        <h1 className="display-4 text-white fw-bold">
          <Translator text={title || ""} targetLang={useLanguage().language} />
        </h1>
        {subtitle && (
          <p className="lead text-white">
            <Translator text={subtitle} targetLang={useLanguage().language} />
          </p>
        )}
      </div>

      <style jsx>{`
        .parallax-wrapper {
          background: linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.06));
        }
        .parallax-inner {
          will-change: transform;
        }
        .parallax-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(2,6,23,0.28), rgba(2,6,23,0.12));
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
      `}</style>
    </div>
  );
}

export default function Home() {
  const { language } = useLanguage();

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Enable parallax & reveal for .scrollsmooth elements
  useFastParallax({ multiplier: 1.6, disableBelow: 768 });

  // IntersectionObserver for .section-title reveal (keeps your original behavior)
  useEffect(() => {
    const titles = Array.from(document.querySelectorAll<HTMLElement>(".section-title"));
    if (!titles.length) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("reveal");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.28 }
    );

    titles.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const sections = [
    { id: "beaches", title: "Beaches", image: "/assets/images/home_iocn/beach-umbrella.svg", link: "/beaches" },
    { id: "hill-stations", title: "Hill Stations", image: "/assets/images/home_iocn/hills.svg", link: "/hills" },
    { id: "forts", title: "Forts", image: "/assets/images/home_iocn/castle-3.svg", link: "/forts" },
    { id: "wildlife", title: "Wildlife & Nature", image: "/assets/images/home_iocn/tree.svg", link: "/nature" },
    { id: "religious", title: "Religious Places", image: "/assets/images/home_iocn/temple.svg", link: "/religious" },
    { id: "cultural", title: "Cultural & Unique", image: "/assets/images/home_iocn/castle.svg", link: "/cultural" },
  ];

  return (
    <>
      {/* Banner */}
      <header className="shadow-sm">
        <div className="banner">
          <div className="text-center py-5">
            <h1 className="display-4 text-white fw-bold">
              <Translator text="Explore Maharashtra" targetLang={language} />
            </h1>
            <p className="lead text-white">
              <Translator text="Discover Beaches, Forts, Nature, and Culture of Maharashtra" targetLang={language} />
            </p>
          </div>
        </div>
      </header>

      {/* Overview */}
      <section className="container text-center py-5 home" id="overview">
        <h2 className="section-title mt-2">
          <Translator text="Overview" targetLang={language} />
        </h2>
        <p>
          <Translator
            text="Explore Maharashtra is your trusted travel companion, dedicated to showcasing the rich cultural heritage, natural beauty, and historic wonders of Maharashtra."
            targetLang={language}
          />
        </p>
        <p>
          <Translator
            text="Whether you're a weekend explorer, a history buff, or a nature lover, our platform offers in-depth insights, travel guides, and local tips to make your journey unforgettable."
            targetLang={language}
          />
        </p>
        <Link href="/about" className="btn btn-outline-dark mt-2 w-auto">
          <Translator text="Read More" targetLang={language} />
        </Link>
      </section>

      {/* Section Cards */}
      <section className="container homeLinks py-5">
        <div className="row g-4">
          {sections.map((section) => (
            <div className="col" id={section.id} key={section.id}>
              <Link href={section.link}>
                <div className="card text-center shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="card-body p-4">
                    <Image src={section.image} alt={section.title} width={100} height={100} className="m-auto" />
                    <h3 className="card-title mt-3">
                      <Translator text={section.title} targetLang={language} />
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Beaches Section */}
      <section className="container-fluid herosection py-5 px-0">
        <div className="homeBeachesBanner mb-4">
          <ParallaxBanner image="/assets/images/beachBanner.png" minScale={0.1} maxScale={1} title="Beaches" subtitle="" />
        </div>
        <section className="container">
          <div className="row py-4 justify-content-between">
            <div className="col-md-4">
              <div className="img scrollsmooth-parallax">
              <p>
                Maharashtra&rsquo;s long and scenic Konkan coastline stretches over 720 km, offering some of India&rsquo;s most diverse and picturesque beaches. From serene golden sands to adventure-filled shores, the state&rsquo;s beaches are a blend of natural beauty, rich culture, water sports, historic forts, temples, and authentic coastal cuisine.
              </p>
              <p>
                These beaches are perfect for family vacations, romantic getaways, photography, camping, adventure activities, dolphin spotting, seafood experiences, and peaceful relaxation. With clean surroundings, welcoming locals, and a variety of homestays and resorts, Maharashtra&rsquo;s coastal destinations provide a complete and memorable seaside experience for every traveler.
              </p>
              </div>

              <div className="img scrollsmooth-parallax">
                <Image src="/assets/images/hill_stations.jpg" alt="Hill Stations" width={600} height={400} className="img-fluid" />
              </div>
            </div>

            <div className="col-md-6 pt-5">
              <div className="img scrollsmooth-parallax">
                <Image src="/assets/images/hill_stations.jpg" alt="Hill Stations" width={600} height={400} className="img-fluid" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="row g-4">
                <div className="col-md-12">
                  <BeachList />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Hill stations */}
      <section className="container-fluid herosection py-5 px-0">
        <div className="homeBeachesBanner mb-4">
          <ParallaxBanner image="/assets/images/hill_stations.jpg" minScale={0.1} maxScale={1} title="Hill Stations" subtitle="" />
        </div>
        <section className="container">
          <div className="row">
            <div className="col">
              <div className="row g-4">
                <div className="col-md-12 odd">
                  <HillList />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Forts */}
      <section className="container-fluid herosection py-5 px-0">
        <div className="homeBeachesBanner mb-4">
          <ParallaxBanner image="/assets/images/forts.jpg" minScale={0.1} maxScale={1} title="Forts" subtitle="" />
        </div>
        <section className="container">
          <div className="row">
            <div className="col">
              <div className="row g-4">
                <div className="col-md-12">
                  <FortList />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Wildlife */}
      <section className="container-fluid herosection py-5 px-0">
        <div className="homeBeachesBanner mb-4">
          <ParallaxBanner image="/assets/images/wildlife_nature.jpg" minScale={0.1} maxScale={1} title="Wildlife & Nature" subtitle="" />
        </div>
        <section className="container">
          <div className="row">
            <div className="col">
              <div className="row g-4">
                <div className="col-md-12 odd">
                  <NatureList />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Religious */}
      <section className="container-fluid herosection py-5 px-0">
        <div className="homeBeachesBanner mb-4">
          <ParallaxBanner image="/assets/images/religious_places.jpg" minScale={0.1} maxScale={1} title="Religious Places" subtitle="" />
        </div>
        <section className="container">
          <div className="row">
            <div className="col">
              <div className="row g-4">
                <div className="col-md-12">
                  <ReligiousList />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Cultural */}
      <section className="container-fluid herosection py-5 px-0">
        <div className="homeBeachesBanner mb-4">
          <ParallaxBanner image="/assets/images/cultural_unique.jpg" minScale={0.1} maxScale={1} title="Cultural & Unique" subtitle="" />
        </div>
        <section className="container">
          <div className="row">
            <div className="col">
              <div className="row g-4">
                <div className="col-md-12 odd">
                  <CulturalList />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* small responsive tweaks scoped */}
      <style jsx>{`
        .parallax-wrapper { height: 56vh; }
        @media (max-width: 768px) {
          .parallax-wrapper { height: 40vh; }
          .parallax-content h1 { font-size: 26px !important; }
        }
      `}</style>
    </>
  );
}
