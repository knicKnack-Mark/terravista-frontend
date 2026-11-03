import { Suspense } from "react";

import HomePageClient from "@/components/HomePageClient";
import FeaturedProperties from "@/components/FeaturedProperties";

export default function HomePage() {
  return (
    <>
      <HomePageClient />

      <Suspense
        fallback={
          <section className="featured-properties">
            <p>Loading properties...</p>
          </section>
        }
      >
        <FeaturedProperties />
      </Suspense>
    </>
  );
}