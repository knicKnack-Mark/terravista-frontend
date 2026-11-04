
import { Suspense } from "react";

import PropertyListingPage from "@/components/PropertyListingPage";
import { getActiveProperties } from "@/lib/property-data";

async function PropertiesContent() {
  const properties = await getActiveProperties();

  return <PropertyListingPage properties={properties} />;
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <main className="listing-page">
          <section className="listing-hero">
            <p>Loading properties...</p>
          </section>
        </main>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
