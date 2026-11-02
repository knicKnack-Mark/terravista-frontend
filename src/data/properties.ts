
export type Property = {
  id: number;
  slug: string;
  title: string;
  location: string;
  price: string;
  type: "buy" | "rent";
  category: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  lotArea: string;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  featured?: boolean;
};

export const properties: Property[] = [
  {
    id: 1,
    slug: "the-glasswood-residence",
    title: "The Glasswood Residence",
    location: "Makati City, Metro Manila",
    price: "₱28,500,000",
    type: "buy",
    category: "Luxury Villa",
    bedrooms: 4,
    bathrooms: 3,
    area: "320 sqm",
    lotArea: "450 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A refined contemporary residence designed around natural light, generous living spaces, and a seamless connection between indoor and outdoor living. The Glasswood Residence offers a considered balance of privacy, comfort, and modern architectural character.",
    amenities: [
      "Private garden",
      "Covered parking",
      "Modern kitchen",
      "Spacious living area",
      "Balcony",
      "24-hour security",
    ],
    featured: true,
  },
  {
    id: 2,
    slug: "the-solana-estate",
    title: "The Solana Estate",
    location: "Nuvali, Santa Rosa",
    price: "₱19,800,000",
    type: "buy",
    category: "Modern House",
    bedrooms: 3,
    bathrooms: 3,
    area: "245 sqm",
    lotArea: "300 sqm",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A welcoming modern home with thoughtfully arranged spaces for everyday living. The Solana Estate combines contemporary design with a comfortable residential setting.",
    amenities: [
      "Gated community",
      "Landscaped garden",
      "Covered parking",
      "Modern kitchen",
      "Community clubhouse",
      "24-hour security",
    ],
  },
  {
    id: 3,
    slug: "azure-heights-residence",
    title: "Azure Heights Residence",
    location: "Bonifacio Global City",
    price: "₱85,000 / month",
    type: "rent",
    category: "Condominium",
    bedrooms: 2,
    bathrooms: 2,
    area: "95 sqm",
    lotArea: "N/A",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A contemporary condominium residence offering comfortable city living. Its practical layout and modern interiors make it a convenient home base close to urban destinations.",
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Lobby reception",
      "Elevator access",
      "Resident lounge",
      "24-hour security",
    ],
    featured: true,
  },
  {
    id: 4,
    slug: "the-linden-house",
    title: "The Linden House",
    location: "Alabang, Muntinlupa",
    price: "₱15,500,000",
    type: "buy",
    category: "Family Home",
    bedrooms: 4,
    bathrooms: 3,
    area: "210 sqm",
    lotArea: "260 sqm",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A spacious family home with a practical layout and room to grow. The Linden House offers comfortable living areas in an established residential location.",
    amenities: [
      "Private garden",
      "Covered parking",
      "Maid's room",
      "Service area",
      "Gated community",
      "24-hour security",
    ],
  },
  {
    id: 5,
    slug: "one-palm-residences",
    title: "One Palm Residences",
    location: "Makati City, Metro Manila",
    price: "₱65,000 / month",
    type: "rent",
    category: "Luxury Apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: "82 sqm",
    lotArea: "N/A",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A stylish apartment with inviting interiors and a convenient city address. One Palm Residences is designed for residents who value accessibility and comfortable everyday living.",
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Resident lounge",
      "Lobby reception",
      "Elevator access",
      "24-hour security",
    ],
  },
  {
    id: 6,
    slug: "the-haven-retreat",
    title: "The Haven Retreat",
    location: "Tagaytay City, Cavite",
    price: "₱32,000,000",
    type: "buy",
    category: "Private Estate",
    bedrooms: 5,
    bathrooms: 4,
    area: "410 sqm",
    lotArea: "650 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A generous private estate with expansive living spaces and a relaxed residential atmosphere. The Haven Retreat is imagined as a place to slow down and enjoy more room for family and guests.",
    amenities: [
      "Private garden",
      "Outdoor entertainment area",
      "Covered parking",
      "Spacious kitchen",
      "Guest room",
      "Gated entrance",
    ],
  },
];
