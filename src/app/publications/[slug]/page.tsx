import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import type { Publication } from "@/lib/types";
import { ArrowLeft, ExternalLink, FileText, Code, Film } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getContentSlugs("publications");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const pub = await getContentBySlug<Publication>("publications", slug);
    return { title: pub.title, description: pub.abstract || pub.title };
  } catch {
    return { title: "Publication" };
  }
}

export default async function PublicationPage({ params }: Props) {
  const { slug } = await params;
  let pub: (Publication & { slug: string; content: string }) | null = null;
  try {
    pub = await getContentBySlug<Publication>("publications", slug);
  } catch {
    notFound();
  }

  const mdxContent = pub.content.trim()
    ? await renderMDX(pub.content)
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/publications"
        className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to publications
      </Link>

      <h1 className="text-3xl font-bold mb-3">{pub.title}</h1>
      <p className="text-foreground/60 mb-2">
        {pub.authors.map((a, i) => {
          const isSelf = a.includes("Lücke") || a.includes("Lucke");
          return (
            <span key={i}>
              {i > 0 && ", "}
              {isSelf ? <strong>{a}</strong> : a}
            </span>
          );
        })}
      </p>
      <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/50 mb-6">
        <span>{pub.date}</span>
        <span className="rounded-full bg-primary-100 dark:bg-primary-900/30 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:text-primary-300 capitalize">
          {pub.type}
        </span>
        {pub.publication && <span className="italic">{pub.publication}</span>}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {pub.url_pdf && (
          <a
            href={pub.url_pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-primary-200 dark:border-primary-800/50 px-3 py-1.5 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <FileText className="h-4 w-4" /> PDF
          </a>
        )}
        {pub.url_code && (
          <a
            href={pub.url_code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-primary-200 dark:border-primary-800/50 px-3 py-1.5 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <Code className="h-4 w-4" /> Code
          </a>
        )}
        {pub.doi && (
          <a
            href={`https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-primary-200 dark:border-primary-800/50 px-3 py-1.5 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <ExternalLink className="h-4 w-4" /> DOI
          </a>
        )}
        {pub.url_video && (
          <a
            href={pub.url_video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-primary-200 dark:border-primary-800/50 px-3 py-1.5 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <Film className="h-4 w-4" /> Video
          </a>
        )}
      </div>

      {pub.abstract && (
        <div className="mb-8 rounded-lg bg-primary-50/50 dark:bg-primary-900/10 p-6 border border-primary-200/50 dark:border-primary-800/30">
          <h2 className="text-lg font-semibold mb-2">Abstract</h2>
          <p className="text-foreground/80 leading-relaxed">{pub.abstract}</p>
        </div>
      )}

      {mdxContent && (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {mdxContent}
        </div>
      )}
    </div>
  );
}
