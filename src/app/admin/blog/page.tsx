import { getCollection } from "@/lib/content";
import { AdminContentList } from "@/components/admin/AdminContentList";
import type { BlogPost } from "@/lib/types";

export default async function AdminBlogPage() {
  const posts = await getCollection<BlogPost>("blog");
  return (
    <AdminContentList title="Blog Posts" collection="blog" items={posts} />
  );
}
