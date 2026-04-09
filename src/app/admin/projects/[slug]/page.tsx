import { getContentBySlug } from "@/lib/content";
import { ContentForm } from "@/components/admin/ContentForm";
import { projectFields } from "@/lib/admin-fields";
import type { Project } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminProjectEditPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "new") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">New Project</h1>
        <ContentForm collection="projects" fields={projectFields} isNew />
      </div>
    );
  }

  const item = await getContentBySlug<Project>("projects", slug);
  const { content, slug: _, ...frontmatter } = item;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <ContentForm
        collection="projects"
        fields={projectFields}
        initialData={frontmatter}
        initialContent={content}
        slug={slug}
      />
    </div>
  );
}
