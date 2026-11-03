import "server-only";

import { prisma } from "@/lib/prisma";
import type { PropertyView } from "@/types/property";

function toPropertyView(property: {
  id: number;
  slug: string;
  title: string;
  location: string;
  price: { toNumber(): number };
  type: "BUY" | "RENT";
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
}): PropertyView {
  const amount = property.price.toNumber();

  const formattedPrice = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);

  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    location: property.location,
    price:
      property.type === "RENT"
        ? `${formattedPrice} / month`
        : formattedPrice,
    type: property.type === "BUY" ? "buy" : "rent",
    category: property.category,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    lotArea: property.lotArea,
    image: property.image,
    gallery: property.gallery,
    description: property.description,
    amenities: property.amenities,
    featured: property.featured,
  };
}

export async function getActiveProperties(): Promise<PropertyView[]> {
  const properties = await prisma.property.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: [
      { featured: "desc" },
      { createdAt: "desc" },
    ],
  });

  return properties.map(toPropertyView);
}

export async function getPropertyBySlug(
  slug: string
): Promise<PropertyView | null> {
  const property = await prisma.property.findFirst({
    where: {
      slug,
      status: "ACTIVE",
    },
  });

  return property ? toPropertyView(property) : null;
}