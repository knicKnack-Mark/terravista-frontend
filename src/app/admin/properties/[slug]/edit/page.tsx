
import AdminPropertyFormClient from "@/components/admin/AdminPropertyFormClient";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <AdminPropertyFormClient mode="edit" slug={slug} />;
}
