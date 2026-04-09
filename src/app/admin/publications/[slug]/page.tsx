import { getContentBySlug } from "@/lib/content";
import { ContentForm } from "@/components/admin/ContentForm";
import { publicationFields } from "@/lib/admin-fields";
import type { Publication } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminPublicationEditPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "new") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">New Publication</h1>
        <ContentForm
          collection="publications"
          fields={publicationFields}
          isNew
        />
      </div>
    );
  }

  const item = await getContentBySlug<Publication>("publications", slug);
  const { content, slug: _, ...frontmatter } = item;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Publication</h1>
      <ContentForm
        collection="publications"
        fields={publicationFields}
        initialData={frontmatter}
        initialContent={content}
        slug={slug}
      />
    </div>
  );
}
