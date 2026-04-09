import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { schemas } from "../../content-schema";
import type { CollectionName } from "./types";

const contentDir = path.join(process.cwd(), "src", "content");

export async function getCollection<T = Record<string, unknown>>(
  name: CollectionName
): Promise<(T & { slug: string })[]> {
  const dir = path.join(contentDir, name);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const items = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    const schema = schemas[name];
    const parsed = schema.parse(data);
    return { ...parsed, slug } as unknown as T & { slug: string };
  });

  // Sort by date descending
  items.sort((a, b) => {
    const aDate = (a as Record<string, unknown>).date as string;
    const bDate = (b as Record<string, unknown>).date as string;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  // Filter out drafts for blog
  if (name === "blog") {
    return items.filter(
      (item) => !(item as Record<string, unknown>).draft
    );
  }

  return items;
}

export async function getContentBySlug<T = Record<string, unknown>>(
  collection: CollectionName,
  slug: string
): Promise<T & { slug: string; content: string }> {
  const dir = path.join(contentDir, collection);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const schema = schemas[collection];
  const parsed = schema.parse(data);

  return { ...parsed, slug, content } as unknown as T & { slug: string; content: string };
}

export async function getContentSlugs(collection: CollectionName) {
  const dir = path.join(contentDir, collection);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}
