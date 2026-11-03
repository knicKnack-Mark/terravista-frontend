
import dotenv from "dotenv";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import { properties } from "../src/data/properties";

dotenv.config({ path: ".env.local" });
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting TerraVista property seed...");

  for (const property of properties) {
    const price = Number(property.price.replace(/[^\d.]/g, ""));

    if (!Number.isFinite(price) || price <= 0) {
      throw new Error(`Invalid price for ${property.slug}`);
    }

    const data = {
      title: property.title,
      location: property.location,
      price,
      currency: "PHP",
      type: property.type === "buy" ? "BUY" as const : "RENT" as const,
      category: property.category,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      lotArea: property.lotArea,
      image: property.image,
      gallery: property.gallery,
      description: property.description,
      amenities: property.amenities,
      featured: property.featured ?? false,
      status: "ACTIVE" as const,
    };

    await prisma.property.upsert({
      where: { slug: property.slug },
      update: data,
      create: {
        slug: property.slug,
        ...data,
      },
    });

    console.log(`Seeded: ${property.title}`);
  }

  const count = await prisma.property.count();

  console.log(`Finished! Total properties in database: ${count}`);
}

main()
  .catch((error) => {
    console.error("Property seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
