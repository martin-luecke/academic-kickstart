import { getContentBySlug } from "@/lib/content";
import { ContentForm } from "@/components/admin/ContentForm";
import { presentationFields } from "@/lib/admin-fields";
import type { Presentation } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminPresentationEditPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "new") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">New Presentation</h1>
        <ContentForm
          collection="presentations"
          fields={presentationFields}
          isNew
        />
      </div>
    );
  }

  const item = await getContentBySlug<Presentation>("presentations", slug);
  const { content, slug: _, ...frontmatter } = item;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Presentation</h1>
      <ContentForm
        collection="presentations"
        fields={presentationFields}
        initialData={frontmatter}
        initialContent={content}
        slug={slug}
      />
    </div>
  );
}
