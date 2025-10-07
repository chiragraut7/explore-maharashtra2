"use client";
import React from "react";

interface BannerProps {
  title?: string;
  subtitle?: string;
  image?: string;
  view?: "info" | "hotels";
  setView?: (v: "info" | "hotels") => void;
  color?: string; // coming from JSON
}

const Banner: React.FC<BannerProps> = ({
  title = "No Title",
  subtitle = "",
  image = "",
  view = "info",
  setView,
  color = "#000000", // fallback color if JSON doesn't provide
}) => {
  return (
    <div
      className="banner relative"
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional overlay if needed */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="container">
        <div className="row justify-content-between align-items-end">
          <div className="col-auto">
            <div
              className="relative z-10 text-white px-3 pt-3 pb-1 mb-4 d-inline-block rounded-lg"
              style={{ backgroundColor: `${color}80` }} // semi-transparent bg from JSON
            >
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="mt-2 text-lg">{subtitle}</p>
            </div>
          </div>
          <div className="col-auto">
            <div className="btn-group mb-4"><button
                onClick={() => setView && setView("info")}
                className="btn"
                style={{
                  borderColor: color,
                  backgroundColor: view === "info" ? color : "transparent",
                  color: view === "info" ? "#fff" : color,
                }}
              >
                <i className="fa-solid fa-compass me-1"></i> Info
              </button>

              <button
                onClick={() => setView && setView("hotels")}
                className="btn"
                style={{
                  borderColor: color,
                  backgroundColor: view === "hotels" ? color : "transparent",
                  color: view === "hotels" ? "#fff" : color,
                }}
              >
                <i className="fa-solid fa-bed me-1"></i> Hotels
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
