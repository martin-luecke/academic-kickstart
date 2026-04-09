import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import type { BlogPost } from "@/lib/types";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getContentSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getContentBySlug<BlogPost>("blog", slug);
    return { title: post.title, description: post.summary || post.title };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post: (BlogPost & { slug: string; content: string }) | null = null;
  try {
    post = await getContentBySlug<BlogPost>("blog", slug);
  } catch {
    notFound();
  }

  const mdxContent = await renderMDX(post.content);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>

      <article>
        <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-foreground/50 mb-2">
          <Calendar className="h-3.5 w-3.5" />
          <time>{post.date}</time>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs text-foreground/60 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {mdxContent}
        </div>
      </article>
    </div>
  );
}
