import Link from "next/link";
import { Plus, Edit } from "lucide-react";

interface AdminContentListProps {
  title: string;
  collection: string;
  items: { slug: string; title: string; date: string }[];
}

export function AdminContentList({
  title,
  collection,
  items,
}: AdminContentListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link
          href={`/admin/${collection}/new`}
          className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> New
        </Link>
      </div>

      {items.length === 0 && (
        <p className="text-foreground/60">No items yet.</p>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/admin/${collection}/${item.slug}`}
            className="flex items-center justify-between rounded-lg border border-primary-200/50 dark:border-primary-800/30 p-4 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-foreground/50">{item.date}</p>
            </div>
            <Edit className="h-4 w-4 text-foreground/40" />
          </Link>
        ))}
      </div>
    </div>
  );
}
