"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, Loader2 } from "lucide-react";

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "select" | "tags" | "boolean";
  options?: string[];
  required?: boolean;
}

interface ContentFormProps {
  collection: string;
  fields: Field[];
  initialData?: Record<string, unknown>;
  initialContent?: string;
  slug?: string;
  isNew?: boolean;
}

export function ContentForm({
  collection,
  fields,
  initialData = {},
  initialContent = "",
  slug: existingSlug,
  isNew = false,
}: ContentFormProps) {
  const router = useRouter();
  const [data, setData] = useState<Record<string, unknown>>(initialData);
  const [content, setContent] = useState(initialContent);
  const [slug, setSlug] = useState(existingSlug || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/content/${collection}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slug, content }),
      });
      if (res.ok) {
        router.push(`/admin/${collection}`);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/content/${collection}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (res.ok) {
        router.push(`/admin/${collection}`);
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  };

  const updateField = (name: string, value: unknown) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Slug */}
      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          disabled={!isNew}
          className="w-full rounded-md border border-primary-200 dark:border-primary-800/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          placeholder="my-content-slug"
        />
      </div>

      {/* Fields */}
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.type === "text" && (
            <input
              type="text"
              value={(data[field.name] as string) || ""}
              onChange={(e) => updateField(field.name, e.target.value)}
              className="w-full rounded-md border border-primary-200 dark:border-primary-800/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          )}
          {field.type === "textarea" && (
            <textarea
              value={(data[field.name] as string) || ""}
              onChange={(e) => updateField(field.name, e.target.value)}
              rows={3}
              className="w-full rounded-md border border-primary-200 dark:border-primary-800/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          )}
          {field.type === "date" && (
            <input
              type="date"
              value={(data[field.name] as string) || ""}
              onChange={(e) => updateField(field.name, e.target.value)}
              className="rounded-md border border-primary-200 dark:border-primary-800/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          )}
          {field.type === "select" && (
            <select
              value={(data[field.name] as string) || ""}
              onChange={(e) => updateField(field.name, e.target.value)}
              className="rounded-md border border-primary-200 dark:border-primary-800/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
          {field.type === "tags" && (
            <input
              type="text"
              value={((data[field.name] as string[]) || []).join(", ")}
              onChange={(e) =>
                updateField(
                  field.name,
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
              className="w-full rounded-md border border-primary-200 dark:border-primary-800/50 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="tag1, tag2, tag3"
            />
          )}
          {field.type === "boolean" && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(data[field.name] as boolean) || false}
                onChange={(e) => updateField(field.name, e.target.checked)}
                className="rounded border-primary-200 dark:border-primary-800/50"
              />
              <span className="text-sm">{field.label}</span>
            </label>
          )}
        </div>
      ))}

      {/* Content (Markdown) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Content (Markdown/MDX)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="w-full rounded-md border border-primary-200 dark:border-primary-800/50 bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-primary-200/50 dark:border-primary-800/30">
        <button
          onClick={handleSave}
          disabled={saving || !slug}
          className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save
        </button>
        {!isNew && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-md border border-red-200 dark:border-red-800/50 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 disabled:opacity-50 transition-colors"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
