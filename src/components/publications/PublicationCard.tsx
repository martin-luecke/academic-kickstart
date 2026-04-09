import Link from "next/link";
import { ExternalLink, FileText, Code, Film } from "lucide-react";
import type { Publication } from "@/lib/types";

export function PublicationCard({ pub }: { pub: Publication }) {
  const authorList = pub.authors.map((author, i) => {
    const isSelf = author.includes("Lücke") || author.includes("Lucke");
    return (
      <span key={i}>
        {i > 0 && ", "}
        {isSelf ? <strong>{author}</strong> : author}
      </span>
    );
  });

  return (
    <div className="rounded-lg border border-primary-200/50 dark:border-primary-800/30 p-5 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
      <Link href={`/publications/${pub.slug}`}>
        <h3 className="font-semibold text-lg leading-snug hover:text-primary-600 dark:hover:text-primary-400">
          {pub.title}
        </h3>
      </Link>
      <p className="mt-2 text-sm text-foreground/60">{authorList}</p>
      {pub.publication && (
        <p className="mt-1 text-sm italic text-foreground/50">
          {pub.publication}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary-100 dark:bg-primary-900/30 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:text-primary-300 capitalize">
          {pub.type}
        </span>
        {pub.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs text-foreground/60"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {pub.url_pdf && (
          <a
            href={pub.url_pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-primary-200 dark:border-primary-800/50 px-2 py-1 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <FileText className="h-3 w-3" /> PDF
          </a>
        )}
        {pub.url_code && (
          <a
            href={pub.url_code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-primary-200 dark:border-primary-800/50 px-2 py-1 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <Code className="h-3 w-3" /> Code
          </a>
        )}
        {pub.doi && (
          <a
            href={`https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-primary-200 dark:border-primary-800/50 px-2 py-1 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <ExternalLink className="h-3 w-3" /> DOI
          </a>
        )}
        {pub.url_video && (
          <a
            href={pub.url_video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-primary-200 dark:border-primary-800/50 px-2 py-1 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <Film className="h-3 w-3" /> Video
          </a>
        )}
      </div>
    </div>
  );
}
