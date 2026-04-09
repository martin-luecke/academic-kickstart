import Link from "next/link";
import { Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/types";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block rounded-lg border border-primary-200/50 dark:border-primary-800/30 p-5 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors"
    >
      <h3 className="font-semibold text-lg hover:text-primary-600 dark:hover:text-primary-400">
        {post.title}
      </h3>
      <div className="mt-2 flex items-center gap-2 text-sm text-foreground/50">
        <Calendar className="h-3.5 w-3.5" />
        <span>{post.date}</span>
      </div>
      {post.summary && (
        <p className="mt-2 text-sm text-foreground/70 line-clamp-2">
          {post.summary}
        </p>
      )}
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs text-foreground/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
