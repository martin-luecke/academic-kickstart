import { HeroSection } from "@/components/home/HeroSection";
import { getCollection } from "@/lib/content";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import type { Publication, BlogPost } from "@/lib/types";

export default async function Home() {
  const publications = await getCollection<Publication>("publications");
  const recentPubs = publications.slice(0, 3);
  const blogPosts = await getCollection<BlogPost>("blog");
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <HeroSection />

      {recentPubs.length > 0 && (
        <section className="py-12 border-t border-primary-200/50 dark:border-primary-800/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Publications</h2>
            <Link
              href="/publications"
              className="flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentPubs.map((pub) => (
              <Link
                key={pub.slug}
                href={`/publications/${pub.slug}`}
                className="block rounded-lg border border-primary-200/50 dark:border-primary-800/30 p-4 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 mt-0.5 text-primary-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold">{pub.title}</h3>
                    <p className="mt-1 text-sm text-foreground/60">
                      {pub.authors?.join(", ")} &middot; {pub.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section className="py-12 border-t border-primary-200/50 dark:border-primary-800/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Posts</h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-lg border border-primary-200/50 dark:border-primary-800/30 p-4 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
              >
                <h3 className="font-semibold">{post.title}</h3>
                <p className="mt-1 text-sm text-foreground/60">
                  {post.date}
                  {post.summary && ` — ${post.summary}`}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
