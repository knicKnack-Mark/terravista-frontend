import { getActiveProperties } from "@/lib/property-data";
import FeaturedPropertiesClient from "@/components/FeaturedPropertiesClient";

export default async function FeaturedProperties() {
  const properties = await getActiveProperties();

  return <FeaturedPropertiesClient properties={properties} />;
}