"use client";

import { useEffect, useState } from "react";
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
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
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
      {/* Banner/Header */}
      <header className="shadow-sm">
        <div className="banner">
          <div className="text-center py-5">
            <h1 className="display-4 text-white fw-bold">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
            <p className="lead text-white">
              Explore the best {category} of Maharashtra
            </p>
          </div>
        </div>
      </header>

      {/* Overview */}
      <section className="container py-5">
        <div className="home text-center mb-4">
          <h2 className="section-title mt-2">Overview</h2>
          <p>
            Maharashtra&apos;s{" "}
            {category === "beaches"
              ? "coastline stretches over 700 km with pristine beaches and vibrant culture."
              : category === "hills"
              ? "hill stations are known for their lush greenery, cool climate, and trekking trails."
              : category === "forts"
              ? "forts showcase the valor of Maratha empire and historic significance."
              : `amazing ${category}.`}
          </p>
        </div>

        {/* Timeline List */}
        <div className="timeline">
          {loading ? (
              <div className="page-loader">
                <div className="spinner"></div>
                <div className="txt">
                  <img src="/assets/images/logo_icon.png" width="200" alt="Logo" />
                  <p className="pt-5">Loading...</p>
                </div>
              </div>
          ) : error ? (
            <p className="text-center text-danger">Error: {error}</p>
          ) : items.length === 0 ? (
            <p className="text-center">No items found in this category.</p>
          ) : (
            items.map((item, index) => (
              <div
                key={item.id || index}
                className={`containertimeline ${index % 2 === 0 ? "left" : "right"}`}
              >
                <div
                  className="year"
                  data-aos="fade-down"
                  style={{ backgroundColor: item.color || "#00aaff" }}
                >
                  {item.title || item.name}
                </div>
                <div
                  className="content"
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                >
                  {item.bannerImage && (
                    <Image
                      src={item.bannerImage}
                      alt={item.title || item.name || "Image"}
                      width={600}
                      height={300}
                      className="rounded"
                      priority={index < 2}
                    />
                  )}
                  <div className="contenttimeline">
                    <p>{item.subtitle}</p>
                    <Link
                      href={`/${category}/${generateSlug(item)}`}
                      className="btn btn-outline-primary"
                      style={{ backgroundColor: item.color || "#00aaff", borderColor: item.color || "#00aaff" }}
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
