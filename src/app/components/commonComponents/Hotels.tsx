"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Hotel {
  slug?: string;
  name: string;
  rating?: string;
  overview?: string;
  facilitiesN?: string[];
  gallery?: string[];
  location?: {
    address?: string;
    distance_from_beach?: string;
    map_embed?: string;
  };
  contact?: {
    host?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
}

export default function Hotels() {
  const params = useParams();
  const category = params?.category;
  const id = params?.id;

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [icons, setIcons] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"tile" | "list">("tile");

  useEffect(() => {
    if (!category || !id) return;

    async function fetchHotels() {
      try {
        const res = await fetch(`/api/${category}/${id}/hotels`);
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data: Hotel[] = await res.json();
        setHotels(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    async function fetchIcons() {
      try {
        const res = await fetch(`/api/hotel-icons`);
        if (!res.ok) throw new Error("Failed to fetch icons");
        const data: Record<string, string> = await res.json();
        setIcons(data);
      } catch (err: unknown) {
        console.error(err);
      }
    }

    fetchHotels();
    fetchIcons();
  }, [category, id]);

  if (!category || !id) return <p>Loading destination...</p>;
  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!hotels.length) return <p>No hotels found.</p>;

  return (
    <section id="hotels" className="mb-5">
      <div className="row justify-content-between">
        <div className="col-auto">
          <h2 className="section-title text-2xl font-semibold mb-4">Nearby Hotels</h2>
        </div>
        <div className="col-auto">
          <div className="flex justify-end mb-4">
            <div className="btn-group" role="group" aria-label="View Toggle">
              <button
                type="button"
                className={`btn btn-secondary ${view === "tile" ? "active" : ""}`}
                onClick={() => setView("tile")}
                title="Tile View"
              >
                <i className="fa fa-th-large"></i>
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${view === "list" ? "active" : ""}`}
                onClick={() => setView("list")}
                title="List View"
              >
                <i className="fa fa-list"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={view === "tile" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
        {hotels.map((hotel, i) => (
          <Link
            key={i}
            href={`/${category}/${id}/${hotel.slug}`}
            className={`hotel-card p-3 ${view === "list" ? "md:flex-row d-flex" : ""}`}
          >
            {hotel.gallery && hotel.gallery.length > 0 && (
              <div className={`${view === "list" ? "md:w-1/3 pr-3" : "pb-3"} relative`}>
                <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }}>
                  {hotel.gallery.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <Image
                        src={img.startsWith("http") || img.startsWith("/") ? img : `/${img.replace(/^\/+/, "")}`}
                        alt={hotel.name}
                        fill
                        className="imgWidth"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            <div className={`${view === "list" ? "md:w-2/3 p-0" : "p-0"} hotel-content`}>
              <div className="hotel-title">{hotel.name}</div>

              {view === "tile" && (
                <>
                  {hotel.rating && <div className="rating">⭐ {hotel.rating}</div>}
                  <div className="hotel-facilities flex gap-2">
                    {(hotel.facilitiesN || []).slice(0, 4).map((f) => (
                      <span key={f} dangerouslySetInnerHTML={{ __html: icons[f] || "" }} />
                    ))}
                  </div>
                </>
              )}

              {view === "list" && (
                <>
                  {hotel.overview && <p className="text-sm text-gray-700 mb-2">{hotel.overview.slice(0, 500)}</p>}
                  <div className="hotel-facilities flex flex-wrap gap-2 mb-2">
                    {(hotel.facilitiesN || []).map((f) => (
                      <span key={f} dangerouslySetInnerHTML={{ __html: icons[f] || "" }} />
                    ))}
                  </div>

                  {hotel.contact && (
                    <div className="text-sm text-gray-600 mb-2">
                      {hotel.contact.host && <p>Host: {hotel.contact.host}</p>}
                      {hotel.contact.phone && <p>Phone: {hotel.contact.phone}</p>}
                      {hotel.contact.email && <p>Email: {hotel.contact.email}</p>}
                      {hotel.contact.website && (
                        <p>
                          Website:{" "}
                          <a href={hotel.contact.website} target="_blank" rel="noopener noreferrer">
                            {hotel.contact.website}
                          </a>
                        </p>
                      )}
                    </div>
                  )}

                  {hotel.location && (
                    <div className="text-sm text-gray-600">
                      {hotel.location.address && <p>Address: {hotel.location.address}</p>}
                      {hotel.location.distance_from_beach && <p>Distance: {hotel.location.distance_from_beach}</p>}
                      {hotel.location.map_embed && <div dangerouslySetInnerHTML={{ __html: hotel.location.map_embed }} />}
                    </div>
                  )}
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
