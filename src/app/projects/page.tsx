import type { Metadata } from "next";
import { getCollection } from "@/lib/content";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/lib/types";

export const metadata: Metadata = {
  title: "Projects",
  description: "Research and software projects",
};

export default async function ProjectsPage() {
  const projects = await getCollection<Project>("projects");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>

      {projects.length === 0 && (
        <p className="text-foreground/60">No projects yet.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
