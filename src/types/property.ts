export type PropertyView = {
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
  featured: boolean;
};