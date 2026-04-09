import { getContentBySlug } from "@/lib/content";
import { ContentForm } from "@/components/admin/ContentForm";
import { blogFields } from "@/lib/admin-fields";
import type { BlogPost } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminBlogEditPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "new") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">New Blog Post</h1>
        <ContentForm collection="blog" fields={blogFields} isNew />
      </div>
    );
  }

  const item = await getContentBySlug<BlogPost>("blog", slug);
  const { content, slug: _, ...frontmatter } = item;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      <ContentForm
        collection="blog"
        fields={blogFields}
        initialData={frontmatter}
        initialContent={content}
        slug={slug}
      />
    </div>
  );
}
