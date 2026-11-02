
"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Property = {
  id: number;
  title: string;
  location: string;
  price: string;
  type: "buy" | "rent";
  category: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured?: boolean;
};

const properties: Property[] = [
  {
    id: 1,
    title: "The Glasswood Residence",
    location: "Makati City, Metro Manila",
    price: "₱28,500,000",
    type: "buy",
    category: "Luxury Villa",
    bedrooms: 4,
    bathrooms: 3,
    area: "320 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    id: 2,
    title: "The Solana Estate",
    location: "Nuvali, Santa Rosa",
    price: "₱19,800,000",
    type: "buy",
    category: "Modern House",
    bedrooms: 3,
    bathrooms: 3,
    area: "245 sqm",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Azure Heights Residence",
    location: "Bonifacio Global City",
    price: "₱85,000 / month",
    type: "rent",
    category: "Condominium",
    bedrooms: 2,
    bathrooms: 2,
    area: "95 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    id: 4,
    title: "The Linden House",
    location: "Alabang, Muntinlupa",
    price: "₱15,500,000",
    type: "buy",
    category: "Family Home",
    bedrooms: 4,
    bathrooms: 3,
    area: "210 sqm",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "One Palm Residences",
    location: "Makati City, Metro Manila",
    price: "₱65,000 / month",
    type: "rent",
    category: "Luxury Apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: "82 sqm",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "The Haven Retreat",
    location: "Tagaytay City, Cavite",
    price: "₱32,000,000",
    type: "buy",
    category: "Private Estate",
    bedrooms: 5,
    bathrooms: 4,
    area: "410 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function FeaturedProperties() {
  const [filter, setFilter] = useState<"all" | "buy" | "rent">("all");

  const visibleProperties = properties.filter((property) => {
    return filter === "all" || property.type === filter;
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-heading > *",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".featured-section",
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".property-card",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".property-grid",
            start: "top 82%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [filter]);

  return (
    <section className="featured-section" id="featured">
      <div className="featured-container">
        <div className="featured-heading">
          <div className="featured-heading-copy">
            <span className="section-eyebrow">
              <span />
              CURATED FOR YOUR LIFESTYLE
            </span>

            <h2>
              Discover exceptional
              <br />
              <em>places to call home.</em>
            </h2>

            <p>
              Explore a handpicked collection of remarkable properties,
              selected for their character, design, and location.
            </p>
          </div>

          <div className="featured-filter" aria-label="Filter properties">
            <button
              type="button"
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All properties
            </button>
            <button
              type="button"
              className={filter === "buy" ? "active" : ""}
              onClick={() => setFilter("buy")}
            >
              For sale
            </button>
            <button
              type="button"
              className={filter === "rent" ? "active" : ""}
              onClick={() => setFilter("rent")}
            >
              For rent
            </button>
          </div>
        </div>

        <div className="property-grid">
          {visibleProperties.map((property) => (
            <article className="property-card" key={property.id}>
              <a
                href="#contact"
                className="property-image-link"
                aria-label={`Enquire about ${property.title}`}
              >
                <div className="property-card-image">
                  <img
                    src={property.image}
                    alt={`${property.category} - ${property.title}`}
                    loading="lazy"
                  />

                  <span className="property-type">
                    {property.category}
                  </span>

                  {property.featured && (
                    <span className="property-featured">
                      FEATURED
                    </span>
                  )}

                  <span className="property-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </a>

              <div className="property-card-content">
                <div className="property-card-location">
                  <MapPin size={13} />
                  <span>{property.location}</span>
                </div>

                <div className="property-card-title-row">
                  <h3>{property.title}</h3>
                </div>

                <div className="property-card-meta">
                  <span>
                    <BedDouble size={15} />
                    {property.bedrooms} Beds
                  </span>
                  <span>
                    <Bath size={15} />
                    {property.bathrooms} Baths
                  </span>
                  <span>
                    <Maximize2 size={14} />
                    {property.area}
                  </span>
                </div>

                <div className="property-card-bottom">
                  <div>
                    <span className="property-price-label">
                      {property.type === "rent" ? "MONTHLY RENT" : "ASKING PRICE"}
                    </span>
                    <strong>{property.price}</strong>
                  </div>

                  <a href="#contact" aria-label={`View ${property.title}`}>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="featured-bottom">
          <span>
            SHOWING {visibleProperties.length.toString().padStart(2, "0")}{" "}
            PROPERTIES
          </span>

          <a href="#contact" className="view-all-properties">
            View all properties
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
