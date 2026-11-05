
import { Suspense } from "react";
import AdminPropertyFormClient from "@/components/admin/AdminPropertyFormClient";

function EditPropertyLoading() {
  return (
    <div
      style={{
        minHeight: "350px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#b99a6b",
        fontSize: "13px",
      }}
    >
      Loading property details...
    </div>
  );
}

async function EditPropertyContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <AdminPropertyFormClient mode="edit" slug={slug} />;
}

export default function EditPropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<EditPropertyLoading />}>
      <EditPropertyContent params={params} />
    </Suspense>
  );
}
