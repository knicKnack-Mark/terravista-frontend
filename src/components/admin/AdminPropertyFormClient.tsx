
"use client";

import styles from "./AdminPropertyFormClient.module.css";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  MapPin,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  Home,
  BedDouble,
  Bath,
  Maximize2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

console.log("TERRAVISTA FORM CSS:", styles);
console.log("TERRAVISTA CSS KEYS:", Object.keys(styles));

type PropertyStatus = "Published" | "Draft" | "Sold";

type Property = {
  id: number;
  title: string;
  slug: string;
  type: string;
  status: PropertyStatus;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  amenities: string[];
  [key: string]: unknown;
};

const STORAGE_KEY = "terravista-admin-properties";

const emptyProperty: Property = {
  id: 0,
  title: "",
  slug: "",
  type: "House & Lot",
  status: "Draft",
  description: "",
  price: 0,
  location: "",
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  image: "",
  amenities: [],
};

const propertyTypes = [
  "House & Lot",
  "Condominium",
  "Villa",
  "Land",
  "Commercial",
  "Townhouse",
];

const availableAmenities = [
  "Swimming Pool",
  "Garden",
  "Parking",
  "24/7 Security",
  "Gated Community",
  "Balcony",
  "Air Conditioning",
  "Furnished",
  "Mountain View",
  "Near Schools",
  "Near Hospitals",
  "Pet Friendly",
];

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function AdminPropertyFormClient({
  mode,
  slug,
}: {
  mode: "create" | "edit";
  slug?: string;
}) {
  const router = useRouter();

  const [form, setForm] = useState<Property>(emptyProperty);
  const [customAmenity, setCustomAmenity] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [loading, setLoading] = useState(mode === "edit");
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode !== "edit" || !slug) {
      setLoading(false);
      return;
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const properties: Property[] = saved ? JSON.parse(saved) : [];
      const existing = properties.find((property) => property.slug === slug);

      if (!existing) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setForm({
        ...emptyProperty,
        ...existing,
        amenities: Array.isArray(existing.amenities)
          ? existing.amenities
          : [],
      });

      setSlugManuallyEdited(true);
    } catch {
      setError("Unable to load this property. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [mode, slug]);

  function updateField<K extends keyof Property>(
    field: K,
    value: Property[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugManuallyEdited ? current.slug : createSlug(value),
    }));
  }

  function handleSlugChange(value: string) {
    setSlugManuallyEdited(true);
    updateField("slug", createSlug(value));
  }

  function toggleAmenity(amenity: string) {
    setForm((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity)
        ? current.amenities.filter((item) => item !== amenity)
        : [...current.amenities, amenity],
    }));
  }

  function addCustomAmenity() {
    const value = customAmenity.trim();

    if (!value || form.amenities.includes(value)) return;

    updateField("amenities", [...form.amenities, value]);
    setCustomAmenity("");
  }

  function removeAmenity(amenity: string) {
    updateField(
      "amenities",
      form.amenities.filter((item) => item !== amenity),
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Please enter a property title.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Please enter a property slug.");
      return;
    }

    if (!form.location.trim()) {
      setError("Please enter the property location.");
      return;
    }

    if (form.price <= 0) {
      setError("Please enter a valid property price.");
      return;
    }

    setSaving(true);

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const properties: Property[] = saved ? JSON.parse(saved) : [];

      const duplicate = properties.some(
        (property) =>
          property.slug === form.slug &&
          (mode === "create" || property.slug !== slug),
      );

      if (duplicate) {
        setError("This property slug is already in use. Please change it.");
        setSaving(false);
        return;
      }

      const propertyToSave: Property = {
        ...form,
        id: mode === "create" ? Date.now() : form.id,
        title: form.title.trim(),
        slug: form.slug.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area),
      };

      const updatedProperties =
        mode === "create"
          ? [propertyToSave, ...properties]
          : properties.map((property) =>
              property.slug === slug ? propertyToSave : property,
            );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedProperties),
      );

      router.push("/admin/properties");
      router.refresh();
    } catch {
      setError("Unable to save the property. Please check your browser storage.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loader} />
        <p>Loading property details...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className={styles.notFound}>
        <AlertCircle size={34} />
        <h2>Property not found</h2>
        <p>
          This property could not be found in your browser storage.
          Open the property inventory first and try again.
        </p>
        <Link href="/admin/properties" className={styles.primaryButton}>
          <ArrowLeft size={16} /> Back to properties
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div>
          <Link href="/admin/properties" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to properties
          </Link>

          <div className={styles.heading}>
            <span className={styles.eyebrow}>PROPERTY MANAGEMENT</span>
            <h1>{mode === "create" ? "Add Property" : "Edit Property"}</h1>
            <p>
              {mode === "create"
                ? "Add a new listing to your TerraVista inventory."
                : "Update the information and details of this property."}
            </p>
          </div>
        </div>

        <div className={styles.topActions}>
          <Link href="/admin/properties" className={styles.cancelButton}>
            Cancel
          </Link>
          <button
            type="submit"
            form="property-form"
            className={styles.primaryButton}
            disabled={saving}
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save property"}
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          <AlertCircle size={17} />
          {error}
        </div>
      )}

      <form id="property-form" onSubmit={handleSubmit}>
        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <section className={styles.card}>
              <div className={styles.sectionHeading}>
                <div className={styles.sectionIcon}>
                  <Home size={18} />
                </div>
                <div>
                  <h2>Basic information</h2>
                  <p>Start with the property's name and description.</p>
                </div>
              </div>

              <div className={styles.fields}>
                <label className={styles.field}>
                  <span>Property title <b>*</b></span>
                  <input
                    value={form.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    placeholder="e.g. The Aurelia Residence"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span>Property URL slug <b>*</b></span>
                  <input
                    value={form.slug}
                    onChange={(event) => handleSlugChange(event.target.value)}
                    placeholder="the-aurelia-residence"
                    required
                  />
                  <small>Used in the property's web address.</small>
                </label>

                <label className={styles.field}>
                  <span>Property type <b>*</b></span>
                  <select
                    value={form.type}
                    onChange={(event) => updateField("type", event.target.value)}
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Listing status</span>
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField("status", event.target.value as PropertyStatus)
                    }
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Sold">Sold</option>
                  </select>
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>Description</span>
                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    placeholder="Describe the property, its features, and what makes it special..."
                    rows={6}
                  />
                </label>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.sectionHeading}>
                <div className={styles.sectionIcon}>
                  <MapPin size={18} />
                </div>
                <div>
                  <h2>Location and pricing</h2>
                  <p>Set the property's address and asking price.</p>
                </div>
              </div>

              <div className={styles.fields}>
                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>Property location <b>*</b></span>
                  <input
                    value={form.location}
                    onChange={(event) =>
                      updateField("location", event.target.value)
                    }
                    placeholder="e.g. Naga City, Camarines Sur"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span>Asking price (PHP) <b>*</b></span>
                  <input
                    type="number"
                    min="1"
                    value={form.price || ""}
                    onChange={(event) =>
                      updateField("price", Number(event.target.value))
                    }
                    placeholder="12500000"
                    required
                  />
                </label>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.sectionHeading}>
                <div className={styles.sectionIcon}>
                  <Maximize2 size={18} />
                </div>
                <div>
                  <h2>Property specifications</h2>
                  <p>Provide the size and room details.</p>
                </div>
              </div>

              <div className={styles.specGrid}>
                <label className={styles.field}>
                  <span><BedDouble size={15} /> Bedrooms</span>
                  <input
                    type="number"
                    min="0"
                    value={form.bedrooms}
                    onChange={(event) =>
                      updateField("bedrooms", Number(event.target.value))
                    }
                  />
                </label>

                <label className={styles.field}>
                  <span><Bath size={15} /> Bathrooms</span>
                  <input
                    type="number"
                    min="0"
                    value={form.bathrooms}
                    onChange={(event) =>
                      updateField("bathrooms", Number(event.target.value))
                    }
                  />
                </label>

                <label className={styles.field}>
                  <span><Maximize2 size={15} /> Floor / lot area (sqm)</span>
                  <input
                    type="number"
                    min="0"
                    value={form.area}
                    onChange={(event) =>
                      updateField("area", Number(event.target.value))
                    }
                  />
                </label>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.sectionHeading}>
                <div className={styles.sectionIcon}>
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h2>Amenities and features</h2>
                  <p>Select the features available in this property.</p>
                </div>
              </div>

              <div className={styles.amenities}>
                {availableAmenities.map((amenity) => (
                  <label key={amenity} className={styles.amenity}>
                    <input
                      type="checkbox"
                      checked={form.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>

              <div className={styles.customAmenity}>
                <input
                  value={customAmenity}
                  onChange={(event) => setCustomAmenity(event.target.value)}
                  placeholder="Add a custom feature..."
                />
                <button type="button" onClick={addCustomAmenity}>
                  <Plus size={15} /> Add
                </button>
              </div>

              {form.amenities.length > 0 && (
                <div className={styles.selectedAmenities}>
                  {form.amenities.map((amenity) => (
                    <span key={amenity}>
                      {amenity}
                      <button
                        type="button"
                        onClick={() => removeAmenity(amenity)}
                        aria-label={`Remove ${amenity}`}
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className={styles.sideColumn}>
            <section className={styles.card}>
              <div className={styles.sectionHeading}>
                <div className={styles.sectionIcon}>
                  <ImagePlus size={18} />
                </div>
                <div>
                  <h2>Property image</h2>
                  <p>Paste an image URL to preview it.</p>
                </div>
              </div>

              <label className={styles.field}>
                <span>Image URL</span>
                <input
                  type="url"
                  value={form.image}
                  onChange={(event) => updateField("image", event.target.value)}
                  placeholder="https://example.com/property.jpg"
                />
              </label>

              <div className={styles.imagePreview}>
                {form.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.image}
                    alt={form.title || "Property preview"}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className={styles.emptyImage}>
                    <ImagePlus size={30} />
                    <span>Image preview will appear here</span>
                  </div>
                )}
              </div>

              <p className={styles.helper}>
                Use a publicly accessible image URL. File uploads are not
                configured in this frontend-only version.
              </p>
            </section>

            <section className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span><Eye size={15} /> LISTING PREVIEW</span>
                <span className={styles.status}>{form.status}</span>
              </div>

              <div className={styles.previewImage}>
                {form.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.image} alt="" />
                ) : (
                  <div className={styles.emptyImage}>
                    <ImagePlus size={25} />
                  </div>
                )}
              </div>

              <div className={styles.previewBody}>
                <span className={styles.previewType}>{form.type}</span>
                <h3>{form.title || "Your property title"}</h3>
                <p className={styles.previewLocation}>
                  <MapPin size={13} />
                  {form.location || "Property location"}
                </p>
                <strong>{formatPrice(Number(form.price))}</strong>
                <div className={styles.previewSpecs}>
                  <span><BedDouble size={14} /> {form.bedrooms} Beds</span>
                  <span><Bath size={14} /> {form.bathrooms} Baths</span>
                  <span><Maximize2 size={14} /> {form.area} sqm</span>
                </div>
              </div>
            </section>

            <div className={styles.tip}>
              <AlertCircle size={17} />
              <p>
                <strong>Remember</strong>
                This demo form stores changes in this browser only. Your
                public property pages still use the database listings.
              </p>
            </div>
          </aside>
        </div>

        <div className={styles.bottomActions}>
          <Link href="/admin/properties" className={styles.cancelButton}>
            Cancel
          </Link>
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={saving}
          >
            <Save size={16} />
            {saving ? "Saving..." : mode === "create" ? "Create property" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
