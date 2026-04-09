import type { Metadata } from "next";
import { getCollection } from "@/lib/content";
import { PostCard } from "@/components/blog/PostCard";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts and articles",
};

interface Props {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const allPosts = await getCollection<BlogPost>("blog");

  const posts = tag
    ? allPosts.filter((post) => post.tags.includes(tag))
    : allPosts;

  // Collect all tags for the filter
  const allTags = [...new Set(allPosts.flatMap((p) => p.tags))].sort();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <a
            href="/blog"
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              !tag
                ? "bg-primary-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All
          </a>
          {allTags.map((t) => (
            <a
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                tag === t
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {t}
            </a>
          ))}
        </div>
      )}

      {posts.length === 0 && (
        <p className="text-foreground/60">No blog posts yet.</p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
