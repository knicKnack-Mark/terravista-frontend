"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Eye,
  Filter,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

type PropertyStatus = "Published" | "Draft" | "Sold";

type Property = {
  id: number;
  title: string;
  slug: string;
  location: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: PropertyStatus;
  image: string;
};

const initialProperties: Property[] = [
  {
    id: 1,
    title: "The Aurelia Residence",
    slug: "the-aurelia-residence",
    location: "Naga City, Camarines Sur",
    price: 12500000,
    type: "House & Lot",
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
  },
  {
    id: 2,
    title: "Casa Verde Estate",
    slug: "casa-verde-estate",
    location: "Pili, Camarines Sur",
    price: 8900000,
    type: "House & Lot",
    bedrooms: 3,
    bathrooms: 2,
    area: 185,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
  },
  {
    id: 3,
    title: "The Meridian Penthouse",
    slug: "the-meridian-penthouse",
    location: "Legazpi City, Albay",
    price: 15800000,
    type: "Condominium",
    bedrooms: 3,
    bathrooms: 3,
    area: 160,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
  },
  {
    id: 4,
    title: "Solana Private Villas",
    slug: "solana-private-villas",
    location: "Daraga, Albay",
    price: 18900000,
    type: "Villa",
    bedrooms: 4,
    bathrooms: 4,
    area: 310,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
  },
  {
    id: 5,
    title: "The Ridgeview Lot",
    slug: "the-ridgeview-lot",
    location: "Camaligan, Camarines Sur",
    price: 3200000,
    type: "Land",
    bedrooms: 0,
    bathrooms: 0,
    area: 450,
    status: "Sold",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
  },
  {
    id: 6,
    title: "Oakwood Modern Home",
    slug: "oakwood-modern-home",
    location: "Naga City, Camarines Sur",
    price: 9700000,
    type: "House & Lot",
    bedrooms: 3,
    bathrooms: 2,
    area: 195,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);

const filters = ["All", "Published", "Draft", "Sold"] as const;

export default function AdminPropertiesClient() {
  const [properties, setProperties] = useState(initialProperties);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [selectedType, setSelectedType] = useState("All");
  const [notice, setNotice] = useState("");

  const stats = {
    total: properties.length,
    published: properties.filter((p) => p.status === "Published").length,
    drafts: properties.filter((p) => p.status === "Draft").length,
    sold: properties.filter((p) => p.status === "Sold").length,
  };

  const filteredProperties = useMemo(() => {
    const query = search.trim().toLowerCase();

    return properties.filter((property) => {
      const matchesSearch =
        !query ||
        `${property.title} ${property.location} ${property.type}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        activeFilter === "All" || property.status === activeFilter;

      const matchesType =
        selectedType === "All" || property.type === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [properties, search, activeFilter, selectedType]);

  function toggleStatus(id: number) {
    setProperties((current) =>
      current.map((property) => {
        if (property.id !== id) return property;

        const nextStatus: PropertyStatus =
          property.status === "Published" ? "Draft" : "Published";

        return { ...property, status: nextStatus };
      }),
    );

    setNotice("Property status updated.");
  }

  function deleteProperty(id: number) {
    const property = properties.find((item) => item.id === id);

    if (!property) return;

    const confirmed = window.confirm(
      `Delete "${property.title}" from this demo inventory?`,
    );

    if (!confirmed) return;

    setProperties((current) => current.filter((item) => item.id !== id));
    setNotice("Property removed from the demo inventory.");
  }

  return (
    <main className="admin-properties-page">
      <header className="admin-properties-header">
        <div>
          <div className="admin-properties-eyebrow">
            <span />
            TERRAVISTA / PROPERTY MANAGEMENT
          </div>

          <h1>Properties</h1>
          <p>
            Manage your property inventory, listing visibility, and property
            information.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="admin-properties-add"
        >
          <Plus size={17} />
          Add property
        </Link>
      </header>

      {notice && (
        <div className="admin-properties-notice" role="status">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss message">
            ×
          </button>
        </div>
      )}

      <section className="admin-properties-stats">
        <StatCard
          label="TOTAL PROPERTIES"
          value={stats.total}
          icon={<Building2 size={19} />}
        />
        <StatCard
          label="PUBLISHED"
          value={stats.published}
          icon={<Eye size={19} />}
        />
        <StatCard
          label="DRAFT LISTINGS"
          value={stats.drafts}
          icon={<Pencil size={19} />}
        />
        <StatCard
          label="SOLD"
          value={stats.sold}
          icon={<ArrowUpRight size={19} />}
        />
      </section>

      <section className="admin-properties-inventory">
        <div className="admin-properties-inventory-heading">
          <div>
            <span className="admin-properties-section-label">
              INVENTORY OVERVIEW
            </span>
            <h2>All listings</h2>
          </div>

          <span className="admin-properties-count">
            {filteredProperties.length} results
          </span>
        </div>

        <div className="admin-properties-toolbar">
          <label className="admin-properties-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search by property or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="admin-properties-type-filter">
            <Filter size={15} />
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              aria-label="Filter by property type"
            >
              <option value="All">All property types</option>
              <option value="House & Lot">House & Lot</option>
              <option value="Condominium">Condominium</option>
              <option value="Villa">Villa</option>
              <option value="Land">Land</option>
            </select>
          </label>
        </div>

        <div className="admin-properties-tabs">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              <span>
                {filter === "All"
                  ? stats.total
                  : properties.filter((p) => p.status === filter).length}
              </span>
            </button>
          ))}
        </div>

        <div className="admin-properties-table-wrap">
          <table className="admin-properties-table">
            <thead>
              <tr>
                <th>PROPERTY</th>
                <th>TYPE</th>
                <th>PRICE</th>
                <th>DETAILS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.id}>
                  <td>
                    <div className="admin-properties-property-cell">
                      <img src={property.image} alt="" />
                      <div>
                        <strong>{property.title}</strong>
                        <span>
                          <MapPin size={12} />
                          {property.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>{property.type}</td>

                  <td className="admin-properties-price">
                    {formatPrice(property.price)}
                  </td>

                  <td>
                    <span className="admin-properties-details">
                      {property.bedrooms > 0 &&
                        `${property.bedrooms} bed · `}
                      {property.bathrooms > 0 &&
                        `${property.bathrooms} bath · `}
                      {property.area} sqm
                    </span>
                  </td>

                  <td>
                    <span
                      className={`admin-properties-status ${property.status.toLowerCase()}`}
                    >
                      <span />
                      {property.status}
                    </span>
                  </td>

                  <td>
                    <div className="admin-properties-actions">
                      <Link
                        href={`/properties/${property.slug}`}
                        target="_blank"
                        title="View public listing"
                        aria-label={`View ${property.title}`}
                      >
                        <Eye size={16} />
                      </Link>

                      <Link
                        href={`/admin/properties/${property.slug}/edit`}
                        title="Edit property"
                        aria-label={`Edit ${property.title}`}
                      >
                        <Pencil size={16} />
                      </Link>

                      {property.status !== "Sold" && (
                        <button
                          onClick={() => toggleStatus(property.id)}
                          title={
                            property.status === "Published"
                              ? "Unpublish property"
                              : "Publish property"
                          }
                          aria-label={`Change status of ${property.title}`}
                        >
                          <ArrowUpRight size={16} />
                        </button>
                      )}

                      <button
                        className="delete"
                        onClick={() => deleteProperty(property.id)}
                        title="Delete property"
                        aria-label={`Delete ${property.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProperties.length === 0 && (
            <div className="admin-properties-empty">
              <Building2 size={28} />
              <h3>No properties found</h3>
              <p>Try changing your search or filters.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                  setSelectedType("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <div className="admin-properties-table-footer">
          Showing {filteredProperties.length} of {properties.length} properties
        </div>
      </section>

      <p className="admin-properties-demo-note">
        Demo mode: changes are held in local page state and reset when you
        refresh. No database records are changed.
      </p>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <article className="admin-properties-stat">
      <div className="admin-properties-stat-top">
        <span>{label}</span>
        <span className="admin-properties-stat-icon">{icon}</span>
      </div>
      <strong>{value.toString().padStart(2, "0")}</strong>
    </article>
  );
}