import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import type { Project } from "@/lib/types";
import { ArrowLeft, Code, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getContentSlugs("projects");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getContentBySlug<Project>("projects", slug);
    return { title: project.title };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  let project: (Project & { slug: string; content: string }) | null = null;
  try {
    project = await getContentBySlug<Project>("projects", slug);
  } catch {
    notFound();
  }

  const mdxContent = project.content.trim()
    ? await renderMDX(project.content)
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
      {project.summary && (
        <p className="text-lg text-foreground/70 mb-4">{project.summary}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {project.url_code && (
          <a
            href={project.url_code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-primary-200 dark:border-primary-800/50 px-3 py-1.5 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <Code className="h-4 w-4" /> Code
          </a>
        )}
        {project.url_demo && (
          <a
            href={project.url_demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-primary-200 dark:border-primary-800/50 px-3 py-1.5 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <ExternalLink className="h-4 w-4" /> Demo
          </a>
        )}
      </div>

      {mdxContent && (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {mdxContent}
        </div>
      )}
    </div>
  );
}
