"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Item {
  id?: string;
  slug?: string;
  title: string;
  name?: string;
  bannerImage?: string;
  subtitle?: string;
  color?: string;
}

interface CategoryPageClientProps {
  category: string;
}

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/${category}`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const data: Item[] = await res.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [category]);

  const generateSlug = (item: Item) => {
    if (item.slug) return item.slug;
    if (item.id) return item.id;
    if (item.title) return item.title.toLowerCase().replace(/\s+/g, "-");
    return "";
  };

  return (
    <>
      {/* Banner */}
      <header className="shadow-sm bg-blue-700 text-white py-5 text-center">
        <h1 className="text-4xl font-bold capitalize">{category}</h1>
        <p className="mt-2 text-lg">
          Explore the best {category} of Maharashtra
        </p>
      </header>

      {/* Overview */}
      <section className="container py-5 text-center">
        <h2 className="section-title mb-3">Overview</h2>
        <p className="text-gray-700">
          {category === "beaches"
            ? "Maharashtra's coastline stretches over 700 km with pristine beaches and vibrant culture."
            : category === "hills"
            ? "Hill stations are known for lush greenery, cool climate, and trekking trails."
            : category === "forts"
            ? "Forts showcase the valor of Maratha empire and historic significance."
            : `Discover amazing ${category}.`}
        </p>
      </section>

      {/* Timeline/List of Items */}
      <section className="container py-5">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">Error: {error}</p>
        ) : items.length === 0 ? (
          <p className="text-center">No items found in this category.</p>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id || index}
              className={`flex flex-col md:flex-row mb-8 items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {item.bannerImage && (
                <div className="relative w-full md:w-1/2 h-64 md:h-80">
                  <Image
                    src={item.bannerImage}
                    alt={item.title || item.name || "Image"}
                    fill
                    className="object-cover rounded shadow-md"
                    priority={index < 2}
                  />
                </div>
              )}
              <div className="md:w-1/2 p-4">
                <h3
                  className="text-2xl font-semibold mb-2"
                  style={{ color: item.color || "#00aaff" }}
                >
                  {item.title || item.name}
                </h3>
                <p className="text-gray-700 mb-3">{item.subtitle}</p>
                <Link
                  href={`/${category}/${generateSlug(item)}`}
                  className="inline-block px-4 py-2 text-white rounded"
                  style={{
                    backgroundColor: item.color || "#00aaff",
                  }}
                >
                  View More
                </Link>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
