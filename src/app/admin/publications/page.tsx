import { getCollection } from "@/lib/content";
import { AdminContentList } from "@/components/admin/AdminContentList";
import type { Publication } from "@/lib/types";

export default async function AdminPublicationsPage() {
  const publications = await getCollection<Publication>("publications");
  return (
    <AdminContentList
      title="Publications"
      collection="publications"
      items={publications}
    />
  );
}
