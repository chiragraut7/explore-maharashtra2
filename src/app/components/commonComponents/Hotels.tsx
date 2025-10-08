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

  // Fetch hotels and icons
  useEffect(() => {
    if (!category || !id) return;

    async function fetchHotels() {
      try {
        const res = await fetch(`/api/${category}/${id}/hotels`);
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data: Hotel[] = await res.json();
        setHotels(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
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
      } catch (err) {
        console.error(err);
      }
    }

    fetchHotels();
    fetchIcons();
  }, [category, id]);

  if (!category || !id) return <p className="text-center py-4">Loading destination...</p>;
  if (loading) return <p className="text-center py-4">Loading hotels...</p>;
  if (error) return <p className="text-center text-red-600 py-4">Error: {error}</p>;
  if (!hotels.length) return <p className="text-center py-4">No hotels found.</p>;

  return (
    <section id="hotels" className="mb-5">
      {/* Header + View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title text-2xl font-semibold">Nearby Hotels</h2>
        <div className="flex gap-2">
          <button
            className={`btn btn-secondary ${view === "tile" ? "active" : ""}`}
            onClick={() => setView("tile")}
            title="Tile View"
          >
            <i className="fa fa-th-large"></i>
          </button>
          <button
            className={`btn btn-secondary ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
            title="List View"
          >
            <i className="fa fa-list"></i>
          </button>
        </div>
      </div>

      {/* Hotels Grid/List */}
      <div className={view === "tile" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
        {hotels.map((hotel, i) => (
          <Link
            key={i}
            href={`/${category}/${id}/${hotel.slug}`}
            className={`hotel-card border rounded overflow-hidden hover:shadow-lg transition ${
              view === "list" ? "flex flex-col md:flex-row" : ""
            }`}
          >
            {/* Image Gallery */}
            {hotel.gallery && hotel.gallery.length > 0 && (
              <div className={`${view === "list" ? "md:w-1/3 pr-3" : "w-full h-64"} relative`}>
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="h-full"
                >
                  {hotel.gallery.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <Image
                        src={img.startsWith("http") || img.startsWith("/") ? img : `/${img.replace(/^\/+/, "")}`}
                        alt={hotel.name}
                        fill
                        className="object-cover w-full h-full"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* Hotel Info */}
            <div className={`${view === "list" ? "md:w-2/3 p-3" : "p-3"} flex flex-col justify-between`}>
              <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>

              {view === "tile" && (
                <>
                  {hotel.rating && <div className="mb-1">⭐ {hotel.rating}</div>}
                  <div className="flex gap-2 flex-wrap">
                    {(hotel.facilitiesN || []).slice(0, 4).map((f) => (
                      <span key={f} dangerouslySetInnerHTML={{ __html: icons[f] || "" }} />
                    ))}
                  </div>
                </>
              )}

              {view === "list" && (
                <>
                  {hotel.overview && <p className="text-gray-700 mb-2">{hotel.overview.slice(0, 500)}</p>}

                  <div className="flex flex-wrap gap-2 mb-2">
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
                          <a
                            href={hotel.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
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
                      {hotel.location.map_embed && (
                        <div dangerouslySetInnerHTML={{ __html: hotel.location.map_embed }} />
                      )}
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
