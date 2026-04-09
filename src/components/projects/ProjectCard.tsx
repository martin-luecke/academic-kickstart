import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Code } from "lucide-react";
import type { Project } from "@/lib/types";

const statusColors = {
  active: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  completed:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  archived:
    "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-primary-200/50 dark:border-primary-800/30 overflow-hidden hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={300}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-semibold text-lg hover:text-primary-600 dark:hover:text-primary-400">
              {project.title}
            </h3>
          </Link>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize shrink-0 ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
        </div>
        {project.summary && (
          <p className="mt-2 text-sm text-foreground/70">{project.summary}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs text-foreground/60"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.url_code && (
            <a
              href={project.url_code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-primary-200 dark:border-primary-800/50 px-2 py-1 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              <Code className="h-3 w-3" /> Code
            </a>
          )}
          {project.url_demo && (
            <a
              href={project.url_demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-primary-200 dark:border-primary-800/50 px-2 py-1 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              <ExternalLink className="h-3 w-3" /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
