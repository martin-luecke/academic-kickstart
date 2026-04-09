import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  FolderGit2,
  Presentation,
  BookOpen,
} from "lucide-react";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Publications", href: "/admin/publications", icon: FileText },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Presentations", href: "/admin/presentations", icon: Presentation },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      <aside className="w-56 shrink-0 border-r border-primary-200/50 dark:border-primary-800/30 bg-primary-50/30 dark:bg-primary-900/10 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-4">
          Admin
        </h2>
        <nav className="space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
