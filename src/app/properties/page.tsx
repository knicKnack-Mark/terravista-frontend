
import PropertyListingPage from "@/components/PropertyListingPage";
import { getActiveProperties } from "@/lib/property-data";

export default async function PropertiesPage() {
  const properties = await getActiveProperties();

  return <PropertyListingPage properties={properties} />;
}
