
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  Check,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";
import { properties } from "@/data/properties";
import PropertyInquiryForm from "@/components/PropertyInquiryForm";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="property-details-page">
      <header className="details-navbar">
        <Link href="/" className="details-brand">
          <span className="details-brand-mark">T</span>
          <span>
            <strong>TERRAVISTA</strong>
            <small>YOUR FUTURE, ELEVATED</small>
          </span>
        </Link>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/#properties">Properties</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <Link href="/#contact" className="details-contact">
          Get in touch <ArrowUpRight size={15} />
        </Link>
      </header>

      <div className="details-container">
        <Link href="/#featured" className="back-to-properties">
          <ArrowLeft size={16} />
          Back to properties
        </Link>

        <div className="details-heading">
          <div>
            <span className="details-category">{property.category}</span>
            <h1>{property.title}</h1>
            <p>
              <MapPin size={16} />
              {property.location}
            </p>
          </div>

          <div className="details-price">
            <span>
              {property.type === "rent" ? "MONTHLY RENT" : "ASKING PRICE"}
            </span>
            <strong>{property.price}</strong>
          </div>
        </div>

        <section className="details-gallery" aria-label="Property photos">
          <div className="gallery-main">
            <img src={property.gallery[0]} alt={`${property.title} main view`} />
          </div>

          {property.gallery.slice(1, 3).map((image, index) => (
            <div className="gallery-secondary" key={image}>
              <img
                src={image}
                alt={`${property.title} photo ${index + 2}`}
              />
            </div>
          ))}
        </section>

        <div className="details-layout">
          <div className="details-main-content">
            <section className="details-specifications">
              <div className="specification">
                <BedDouble size={20} />
                <div>
                  <strong>{property.bedrooms}</strong>
                  <span>Bedrooms</span>
                </div>
              </div>

              <div className="specification">
                <Bath size={20} />
                <div>
                  <strong>{property.bathrooms}</strong>
                  <span>Bathrooms</span>
                </div>
              </div>

              <div className="specification">
                <Maximize2 size={20} />
                <div>
                  <strong>{property.area}</strong>
                  <span>Floor area</span>
                </div>
              </div>

              <div className="specification">
                <Maximize2 size={20} />
                <div>
                  <strong>{property.lotArea}</strong>
                  <span>Lot area</span>
                </div>
              </div>
            </section>

            <section className="details-description">
              <span className="details-eyebrow">ABOUT THIS PROPERTY</span>
              <h2>A place designed for living.</h2>
              <p>{property.description}</p>
            </section>

            <section className="details-amenities">
              <span className="details-eyebrow">PROPERTY HIGHLIGHTS</span>
              <h2>Features & amenities</h2>

              <div className="amenities-grid">
                {property.amenities.map((amenity) => (
                  <div className="amenity-item" key={amenity}>
                    <span>
                      <Check size={14} />
                    </span>
                    {amenity}
                  </div>
                ))}
              </div>
            </section>

            <section className="details-note">
              <ShieldCheck size={22} />
              <div>
                <strong>Discover with confidence</strong>
                <p>
                  Contact TerraVista to request further property information
                  and arrange a viewing.
                </p>
              </div>
            </section>
          </div>

          <aside className="details-sidebar">
            <div className="inquiry-card">
              <span className="details-eyebrow">INTERESTED IN THIS PROPERTY?</span>
              <h2>Make it yours.</h2>
              <p>
                Send us an inquiry and our property team can help you with
                the next steps.
              </p>

              <div className="inquiry-property">
                <img src={property.image} alt="" />
                <div>
                  <strong>{property.title}</strong>
                  <span>{property.location}</span>
                </div>
              </div>

              <PropertyInquiryForm
                propertyTitle={property.title}
                propertySlug={property.slug}
              />

              <div className="inquiry-response-note">
                <CalendarDays size={15} />
                <span>Request a property viewing or more information.</span>
              </div>
            </div>
          </aside>
        </div>

        <footer className="details-footer">
          <Link href="/" className="details-brand">
            <span className="details-brand-mark">T</span>
            <span>
              <strong>TERRAVISTA</strong>
              <small>YOUR FUTURE, ELEVATED</small>
            </span>
          </Link>

          <span>EXCEPTIONAL PROPERTIES. EXTRAORDINARY LIVING.</span>
        </footer>
      </div>
    </main>
  );
}
