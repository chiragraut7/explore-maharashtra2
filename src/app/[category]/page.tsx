'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

interface Item {
  id?: string | number;
  slug?: string;
  title?: string;
  name?: string;
  bannerImage?: string;
  subtitle?: string;
  color?: string;
}

export default function CategoryPage() {
  const { category } = useParams() as { category: string };
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/${category}`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const json = await res.json();
        const data: Item[] = json.success ? json.data : [];
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    if (category) fetchItems();
  }, [category]);

  // Slug generator
  const generateSlug = (item: Item) => {
    if (item.slug) return item.slug;
    if (item.id) return item.id.toString();
    if (item.title) return item.title.toLowerCase().replace(/\s+/g, "-");
    if (item.name) return item.name.toLowerCase().replace(/\s+/g, "-");
    return "";
  };

  // Capitalize category for display
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      {/* Banner/Header */}
      <header className="shadow-sm">
        <div className="banner">
          <div className="text-center py-5">
            <h1 className="display-4 text-white fw-bold">{categoryTitle}</h1>
            <p className="lead text-white">
              Explore the best {categoryTitle} of Maharashtra
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
              : category === "nature"
              ? "nature spots include wildlife, waterfalls, and scenic landscapes."
              : category === "religious"
              ? "religious places reflect Maharashtra's rich spiritual heritage."
              : category === "cultural"
              ? "cultural sites display local arts, crafts, and unique traditions."
              : `amazing ${category}.`}
          </p>
        </div>

        {/* Timeline / Items */}
        <div className="timeline position-relative">
          {loading ? (
            <div className="page-loader text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status"></div>
              <div className="txt">
                <Image
                  src="/assets/images/logo_icon.png"
                  alt="Logo"
                  width={150}
                  height={150}
                  className="rounded"
                  priority
                />
                <p className="pt-3">Loading...</p>
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
                  style={{
                    backgroundColor: item.color || "#00aaff",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "8px",
                  }}
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
                      priority={index < 2}
                      className="rounded"
                    />
                  )}
                  <div className="contenttimeline">
                    {item.subtitle && <p>{item.subtitle}</p>}
                    <Link
                      href={`/${category}/${generateSlug(item)}`}
                      className="btn btn-outline-primary"
                      style={{
                        backgroundColor: item.color || "#00aaff",
                        borderColor: item.color || "#00aaff",
                        color: "#fff",
                      }}
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
