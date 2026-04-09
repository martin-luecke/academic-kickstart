import { getCollection } from "@/lib/content";
import { FileText, FolderGit2, Presentation, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [publications, projects, presentations, blog] = await Promise.all([
    getCollection("publications"),
    getCollection("projects"),
    getCollection("presentations"),
    getCollection("blog"),
  ]);

  const stats = [
    {
      label: "Publications",
      count: publications.length,
      href: "/admin/publications",
      icon: FileText,
    },
    {
      label: "Projects",
      count: projects.length,
      href: "/admin/projects",
      icon: FolderGit2,
    },
    {
      label: "Presentations",
      count: presentations.length,
      href: "/admin/presentations",
      icon: Presentation,
    },
    {
      label: "Blog Posts",
      count: blog.length,
      href: "/admin/blog",
      icon: BookOpen,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-primary-200/50 dark:border-primary-800/30 p-5 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <stat.icon className="h-5 w-5 text-primary-500" />
              <div>
                <p className="text-2xl font-bold">{stat.count}</p>
                <p className="text-sm text-foreground/60">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
