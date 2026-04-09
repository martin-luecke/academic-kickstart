import { getCollection } from "@/lib/content";
import { AdminContentList } from "@/components/admin/AdminContentList";
import type { Project } from "@/lib/types";

export default async function AdminProjectsPage() {
  const projects = await getCollection<Project>("projects");
  return (
    <AdminContentList
      title="Projects"
      collection="projects"
      items={projects}
    />
  );
}
