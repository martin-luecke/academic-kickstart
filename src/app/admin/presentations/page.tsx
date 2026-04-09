import { getCollection } from "@/lib/content";
import { AdminContentList } from "@/components/admin/AdminContentList";
import type { Presentation } from "@/lib/types";

export default async function AdminPresentationsPage() {
  const presentations = await getCollection<Presentation>("presentations");
  return (
    <AdminContentList
      title="Presentations"
      collection="presentations"
      items={presentations}
    />
  );
}
