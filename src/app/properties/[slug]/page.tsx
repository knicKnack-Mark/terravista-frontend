import { Suspense } from "react";
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
import { getActiveProperties, getPropertyBySlug } from "@/lib/property-data";
import PropertyInquiryForm from "@/components/PropertyInquiryForm";
import PropertyGallery from "@/components/PropertyGallery";
import styles from "@/components/PropertyDetails.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function PropertyDetails({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const allProperties = await getActiveProperties();
  const similarProperties = allProperties
    .filter((item) => item.slug !== property.slug)
    .sort((a, b) => {
      const aMatch = a.category === property.category ? 1 : 0;
      const bMatch = b.category === property.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const isRental = property.type === "rent";

  return (
    <main className={styles.page}>
      <header className={styles.navbar}>
        <Link href="/" className={styles.brand} aria-label="TerraVista home">
          <span className={styles.brandMark}>T</span>
          <span className={styles.brandCopy}>
            <strong>TERRAVISTA</strong>
            <small>YOUR FUTURE, ELEVATED</small>
          </span>
        </Link>

        <nav className={styles.navLinks} aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/properties" className={styles.navActive}>Properties</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Link href="/contact" className={styles.navContact}>
          Get in touch <ArrowUpRight size={15} />
        </Link>
      </header>

      <div className={styles.container}>
        <Link href="/properties" className={styles.backLink}>
          <ArrowLeft size={15} />
          Back to properties
        </Link>

        <section className={styles.intro}>
          <div className={styles.introCopy}>
            <div className={styles.eyebrow}>
              <span />
              {property.category}
              <i />
              {isRental ? "FOR RENT" : "FOR SALE"}
            </div>
            <h1>{property.title}</h1>
            <p className={styles.location}>
              <MapPin size={16} />
              {property.location}
            </p>
          </div>

          <div className={styles.priceBlock}>
            <span>{isRental ? "MONTHLY RENT" : "ASKING PRICE"}</span>
            <strong>{property.price}</strong>
            <small>Contact us for availability</small>
          </div>
        </section>

        <PropertyGallery
          title={property.title}
          coverImage={property.image}
          images={property.gallery}
        />

        <div className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <section className={styles.specifications} aria-label="Property specifications">
              <div className={styles.specification}>
                <BedDouble size={20} />
                <div><strong>{property.bedrooms}</strong><span>Bedrooms</span></div>
              </div>
              <div className={styles.specification}>
                <Bath size={20} />
                <div><strong>{property.bathrooms}</strong><span>Bathrooms</span></div>
              </div>
              <div className={styles.specification}>
                <Maximize2 size={20} />
                <div><strong>{property.area || "—"}</strong><span>Floor area</span></div>
              </div>
              <div className={styles.specification}>
                <Maximize2 size={20} />
                <div><strong>{property.lotArea || "—"}</strong><span>Lot area</span></div>
              </div>
            </section>

            <section className={styles.descriptionSection}>
              <span className={styles.sectionEyebrow}>ABOUT THIS PROPERTY</span>
              <h2>A place designed for <em>living.</em></h2>
              <p>{property.description}</p>
            </section>

            {property.amenities.length > 0 && (
              <section className={styles.amenitiesSection}>
                <span className={styles.sectionEyebrow}>PROPERTY HIGHLIGHTS</span>
                <h2>Features &amp; amenities</h2>
                <div className={styles.amenitiesGrid}>
                  {property.amenities.map((amenity) => (
                    <div className={styles.amenity} key={amenity}>
                      <span><Check size={13} /></span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className={styles.confidenceNote}>
              <ShieldCheck size={23} />
              <div>
                <strong>Discover with confidence</strong>
                <p>Contact TerraVista to request further property information and arrange a private viewing.</p>
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.inquiryCard}>
              <span className={styles.sectionEyebrow}>INTERESTED IN THIS PROPERTY?</span>
              <h2>Make it <em>yours.</em></h2>
              <p>Tell us a little about what you are looking for. Our property team will help you with the next steps.</p>

              <div className={styles.inquiryProperty}>
                {property.image ? <img src={property.image} alt="" /> : <div className={styles.inquiryImageFallback} />}
                <div>
                  <strong>{property.title}</strong>
                  <span>{property.location}</span>
                </div>
              </div>

              <PropertyInquiryForm
                propertyTitle={property.title}
                propertySlug={property.slug}
              />

              <div className={styles.responseNote}>
                <CalendarDays size={15} />
                <span>Request a property viewing or more information.</span>
              </div>
            </div>
          </aside>
        </div>

        {similarProperties.length > 0 && (
          <section className={styles.similarSection}>
            <div className={styles.similarHeading}>
              <div>
                <span className={styles.sectionEyebrow}>CURATED FOR YOU</span>
                <h2>Explore similar <em>properties.</em></h2>
              </div>
              <Link href="/properties" className={styles.viewAll}>
                View all properties <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className={styles.similarGrid}>
              {similarProperties.map((item) => (
                <Link href={`/properties/${item.slug}`} className={styles.similarCard} key={item.id}>
                  <div className={styles.similarImage}>
                    {item.image ? <img src={item.image} alt={item.title} loading="lazy" /> : null}
                    <span>{item.type === "rent" ? "FOR RENT" : "FOR SALE"}</span>
                    <i><MoveUpRight size={17} /></i>
                  </div>
                  <div className={styles.similarBody}>
                    <span className={styles.similarLocation}><MapPin size={12} />{item.location}</span>
                    <h3>{item.title}</h3>
                    <div className={styles.similarMeta}>
                      <span><BedDouble size={13} />{item.bedrooms} Beds</span>
                      <span><Bath size={13} />{item.bathrooms} Baths</span>
                      <span><Maximize2 size={13} />{item.area}</span>
                    </div>
                    <strong>{item.price}</strong>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className={styles.footer}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}>T</span>
            <span className={styles.brandCopy}>
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

function PropertyLoading() {
  return (
    <main className={styles.loadingPage}>
      <span className={styles.loadingMark}>T</span>
      <p>Preparing your property experience...</p>
    </main>
  );
}

export default function PropertyPage({ params }: PageProps) {
  return (
    <Suspense fallback={<PropertyLoading />}>
      <PropertyDetails params={params} />
    </Suspense>
  );
}
