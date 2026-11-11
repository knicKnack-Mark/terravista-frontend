
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Bath,
  Maximize2,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { usePropertyPageAnimations } from "@/hooks/usePropertyPageAnimations";
import type { PropertyView } from "@/types/property";

type PropertyType = "all" | "buy" | "rent";
type SortOption = "featured" | "price-low" | "price-high" | "name";

const PAGE_SIZE = 6;

function getNumericPrice(price: string) {
  return Number(price.replace(/[^\d.]/g, "")) || 0;
}

type PropertyListingPageProps = {
  properties: PropertyView[];
};

export default function PropertyListingPage({
  properties,
}: PropertyListingPageProps) {
  usePropertyPageAnimations("listing");

  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType>("all");
  const [priceRange, setPriceRange] = useState("any");
  const [bedrooms, setBedrooms] = useState("any");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const priceOptions = useMemo(() => {
    if (propertyType === "rent") {
      return [
        { value: "any", label: "Any price" },
        { value: "under-20k", label: "Under ₱20,000" },
        { value: "20k-40k", label: "₱20,000 – ₱40,000" },
        { value: "40k-80k", label: "₱40,000 – ₱80,000" },
        { value: "over-80k", label: "Over ₱80,000" },
      ];
    }

    return [
      { value: "any", label: "Any price" },
      { value: "under-10m", label: "Under ₱10M" },
      { value: "10m-20m", label: "₱10M – ₱20M" },
      { value: "20m-50m", label: "₱20M – ₱50M" },
      { value: "over-50m", label: "Over ₱50M" },
    ];
  }, [propertyType]);

  const filteredProperties = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = properties.filter((property) => {
      const matchesSearch =
        !normalizedSearch ||
        property.title.toLowerCase().includes(normalizedSearch) ||
        property.location.toLowerCase().includes(normalizedSearch) ||
        property.category.toLowerCase().includes(normalizedSearch);

      const matchesType =
        propertyType === "all" || property.type === propertyType;

      const price = getNumericPrice(property.price);
      let matchesPrice = true;

      if (priceRange !== "any") {
        if (propertyType === "rent") {
          if (priceRange === "under-20k") matchesPrice = price < 20000;
          if (priceRange === "20k-40k")
            matchesPrice = price >= 20000 && price <= 40000;
          if (priceRange === "40k-80k")
            matchesPrice = price > 40000 && price <= 80000;
          if (priceRange === "over-80k") matchesPrice = price > 80000;
        } else {
          if (priceRange === "under-10m") matchesPrice = price < 10000000;
          if (priceRange === "10m-20m")
            matchesPrice = price >= 10000000 && price <= 20000000;
          if (priceRange === "20m-50m")
            matchesPrice = price > 20000000 && price <= 50000000;
          if (priceRange === "over-50m") matchesPrice = price > 50000000;
        }
      }

      const minimumBedrooms =
        bedrooms === "any" ? 0 : Number(bedrooms);

      const matchesBedrooms = property.bedrooms >= minimumBedrooms;

      return (
        matchesSearch &&
        matchesType &&
        matchesPrice &&
        matchesBedrooms
      );
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return getNumericPrice(a.price) - getNumericPrice(b.price);
        case "price-high":
          return getNumericPrice(b.price) - getNumericPrice(a.price);
        case "name":
          return a.title.localeCompare(b.title);
        case "featured":
        default:
          return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      }
    });
  }, [properties, search, propertyType, priceRange, bedrooms, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProperties.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);
  const visibleProperties = filteredProperties.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function updateType(value: PropertyType) {
    setPropertyType(value);
    setPriceRange("any");
    setPage(1);
  }

  function resetFilters() {
    setSearch("");
    setPropertyType("all");
    setPriceRange("any");
    setBedrooms("any");
    setSortBy("featured");
    setPage(1);
  }

  return (
    <main className="listing-page">
      <header className="listing-navbar">
        <Link href="/" className="listing-brand">
          <span className="listing-brand-mark">T</span>
          <span>
            <strong>TERRAVISTA</strong>
            <small>YOUR FUTURE, ELEVATED</small>
          </span>
        </Link>

        <nav className="listing-nav-links">
          <Link href="/">Home</Link>
          <Link href="/buyers">Buyers</Link>
          <Link href="/properties" className="active">Properties</Link>
          <Link href="/news">News</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Link href="/#contact" className="listing-contact-link">
          Get in touch <ArrowRight size={16} />
        </Link>
      </header>

      <section className="listing-hero">
        <div className="listing-hero-inner">
          <Link href="/" className="listing-back-link">
            <ArrowLeft size={15} /> Back to home
          </Link>

          <span className="listing-eyebrow">THE TERRAVISTA COLLECTION</span>
          <h1>
            Find a place
            <br />
            <em>to call yours.</em>
          </h1>
          <p>
            Explore thoughtfully selected properties, from modern city
            residences to private homes designed around the way you live.
          </p>

          <div className="listing-hero-meta">
            <span>CURATED PROPERTIES</span>
            <span className="listing-meta-line" />
            <span>{properties.length.toString().padStart(2, "0")} LISTINGS</span>
          </div>
        </div>
      </section>

      <section className="listing-content">
        <div className="listing-section-heading">
          <div>
            <span className="listing-eyebrow">EXPLORE REAL ESTATE</span>
            <h2>Available properties</h2>
          </div>
          <span className="listing-result-count">
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1 ? "PROPERTY" : "PROPERTIES"} FOUND
          </span>
        </div>

        <div className="listing-filter-panel">
          <div className="listing-filter-top">
            <div className="listing-filter-title">
              <SlidersHorizontal size={17} />
              <span>Refine your search</span>
            </div>
            <button className="listing-reset" onClick={resetFilters}>
              <X size={14} /> Reset filters
            </button>
          </div>

          <div className="listing-filter-grid">
            <label className="listing-search-field">
              <span>Search</span>
              <div className="listing-input-wrap">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Property name or location"
                />
              </div>
            </label>

            <label>
              <span>Listing type</span>
              <select
                value={propertyType}
                onChange={(event) =>
                  updateType(event.target.value as PropertyType)
                }
              >
                <option value="all">Buy & Rent</option>
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </label>

            <label>
              <span>Price range</span>
              <select
                value={priceRange}
                onChange={(event) => {
                  setPriceRange(event.target.value);
                  setPage(1);
                }}
              >
                {priceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Bedrooms</span>
              <select
                value={bedrooms}
                onChange={(event) => {
                  setBedrooms(event.target.value);
                  setPage(1);
                }}
              >
                <option value="any">Any bedrooms</option>
                <option value="1">1+ bedrooms</option>
                <option value="2">2+ bedrooms</option>
                <option value="3">3+ bedrooms</option>
                <option value="4">4+ bedrooms</option>
                <option value="5">5+ bedrooms</option>
              </select>
            </label>
          </div>
        </div>

        <div className="listing-toolbar">
          <span>
            Showing{" "}
            <strong>
              {filteredProperties.length === 0
                ? 0
                : (currentPage - 1) * PAGE_SIZE + 1}
              –
              {Math.min(currentPage * PAGE_SIZE, filteredProperties.length)}
            </strong>{" "}
            of <strong>{filteredProperties.length}</strong> properties
          </span>

          <label className="listing-sort">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value as SortOption);
                setPage(1);
              }}
            >
              <option value="featured">Featured first</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="name">Name: A to Z</option>
            </select>
            <ArrowDown size={14} />
          </label>
        </div>

        {visibleProperties.length > 0 ? (
          <div className="listing-property-grid">
            {visibleProperties.map((property, index) => (
              <Link
                href={`/properties/${property.slug}`}
                className="listing-property-card"
                key={property.id}
              >
                <div className="listing-card-image">
                  <img
                    src={property.image}
                    alt={property.title}
                    loading={index > 2 ? "lazy" : "eager"}
                  />
                  <span className="listing-card-type">
                    {property.type === "buy" ? "FOR SALE" : "FOR RENT"}
                  </span>
                  {property.featured && (
                    <span className="listing-card-featured">FEATURED</span>
                  )}
                  <span className="listing-card-arrow">
                    <ArrowRight size={18} />
                  </span>
                </div>

                <div className="listing-card-body">
                  <span className="listing-card-location">
                    {property.location}
                  </span>
                  <h3>{property.title}</h3>
                  <p className="listing-card-category">{property.category}</p>

                  <div className="listing-card-specs">
                    <span><BedDouble size={15} /> {property.bedrooms} Beds</span>
                    <span><Bath size={15} /> {property.bathrooms} Baths</span>
                    <span><Maximize2 size={14} /> {property.area}</span>
                  </div>

                  <div className="listing-card-price-row">
                    <strong>{property.price}</strong>
                    <span>VIEW DETAILS <ArrowRight size={13} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="listing-empty-state">
            <Search size={30} />
            <h3>No properties found</h3>
            <p>
              We couldn&apos;t find a property matching those filters.
              Try changing your search criteria.
            </p>
            <button onClick={resetFilters}>Clear all filters</button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="listing-pagination">
            <button
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ArrowLeft size={17} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={currentPage === pageNumber ? "active" : ""}
                  onClick={() => setPage(pageNumber)}
                  aria-label={`Page ${pageNumber}`}
                  aria-current={
                    currentPage === pageNumber ? "page" : undefined
                  }
                >
                  {pageNumber.toString().padStart(2, "0")}
                </button>
              )
            )}

            <button
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </section>

      <footer className="listing-footer">
        <Link href="/" className="listing-footer-brand">TERRAVISTA.</Link>
        <span>EXCEPTIONAL PROPERTIES. EXTRAORDINARY LIVING.</span>
        <span>
          © {currentYear ?? "2026"} TERRAVISTA
        </span>
      </footer>
    </main>
  );
}
