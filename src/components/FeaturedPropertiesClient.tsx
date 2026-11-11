
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
} from "lucide-react";
import { usePropertyPageAnimations } from "@/hooks/usePropertyPageAnimations";
import type { PropertyView } from "@/types/property";

type Props = {
  properties: PropertyView[];
};

export default function FeaturedPropertiesClient({
  properties,
}: Props) {
  usePropertyPageAnimations("featured");

  const [filter, setFilter] = useState<"all" | "buy" | "rent">("all");

  const visibleProperties = properties.filter((property) => {
    return filter === "all" || property.type === filter;
  });

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
              <Link
                href={`/properties/${property.slug}`}
                className="property-image-link"
                aria-label={`View ${property.title}`}
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
                    <span className="property-featured">FEATURED</span>
                  )}

                  <span className="property-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </Link>

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
                      {property.type === "rent"
                        ? "MONTHLY RENT"
                        : "ASKING PRICE"}
                    </span>

                    <strong>{property.price}</strong>
                  </div>

                  <Link
                    href={`/properties/${property.slug}`}
                    aria-label={`View details for ${property.title}`}
                  >
                    <ArrowRight size={18} />
                  </Link>
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

          <Link href="/properties" className="view-all-properties">
            View all properties
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
