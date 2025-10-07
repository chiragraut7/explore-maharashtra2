"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Hotel = {
  slug?: string;
  name: string;
  overview?: string;
  rating?: string;
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
  rooms?: {
    type: string;
    rate_for_two: string;
    extra_person?: string;
  }[];
  // Extend with other fields as per your data
};

export default function HotelDetail() {
  const params = useParams<{ category: string; id: string; hotelSlug: string }>();
  const { category, id, hotelSlug } = params;

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category || !id || !hotelSlug) return;

    async function fetchHotel() {
      try {
        const res = await fetch(`/api/${category}/${id}/hotels/${hotelSlug}`);
        if (!res.ok) throw new Error(`Error fetching hotel: ${res.statusText}`);

        const data: Hotel = await res.json();
        setHotel(data);
      } catch (err: any) {
        setError(err.message || "Failed to load hotel");
      } finally {
        setLoading(false);
      }
    }

    fetchHotel();
  }, [category, id, hotelSlug]);

  if (loading) return <p>Loading hotel details...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!hotel) return <p>Hotel not found.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>

      {hotel.rating && <div className="mb-4">⭐ Rating: {hotel.rating}</div>}

      {hotel.gallery && hotel.gallery.length > 0 && (
        <div className="mb-6 flex gap-3 overflow-x-auto">
          {hotel.gallery.map((img, i) => (
            <img
              key={i}
              src={img.startsWith("http") ? img : `/${img.replace(/^\/+/, "")}`}
              alt={`${hotel.name} image ${i + 1}`}
              className="h-40 rounded"
            />
          ))}
        </div>
      )}

      {hotel.overview && <p className="mb-6">{hotel.overview}</p>}

      {hotel.location && (
        <div className="mb-6">
          <h2 className="font-semibold mb-1">Location</h2>
          <p>{hotel.location.address}</p>
          <p>{hotel.location.distance_from_beach}</p>
          {hotel.location.map_embed && (
            <div dangerouslySetInnerHTML={{ __html: hotel.location.map_embed }} />
          )}
        </div>
      )}

      {hotel.rooms?.length ? (
        <section className="mb-6">
          <h2 className="font-semibold mb-2">Rooms & Rates</h2>
          <ul className="list-disc pl-5">
            {hotel.rooms.map((room) => (
              <li key={room.type}>
                <b>{room.type}:</b> {room.rate_for_two}{" "}
                {room.extra_person && ` | Extra: ${room.extra_person}`}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {hotel.facilitiesN?.length && (
        <section className="mb-6">
          <h2 className="font-semibold mb-2">Facilities</h2>
          <ul className="list-disc pl-5">
            {hotel.facilitiesN.map((facility) => (
              <li key={facility}>{facility}</li>
            ))}
          </ul>
        </section>
      )}

      {hotel.contact && (
        <section className="mb-6">
          <h2 className="font-semibold mb-2">Contact</h2>
          {hotel.contact.host && <p>Host: {hotel.contact.host}</p>}
          {hotel.contact.phone && <p>Phone: {hotel.contact.phone}</p>}
          {hotel.contact.email && <p>Email: {hotel.contact.email}</p>}
          {hotel.contact.website && (
            <p>
              Website:{" "}
              <a href={hotel.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {hotel.contact.website}
              </a>
            </p>
          )}
        </section>
      )}
    </div>
  );
}
