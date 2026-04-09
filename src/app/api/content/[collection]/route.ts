import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CollectionName } from "@/lib/types";

const contentDir = path.join(process.cwd(), "src", "content");
const validCollections: CollectionName[] = [
  "publications",
  "projects",
  "presentations",
  "blog",
];

function isValidCollection(name: string): name is CollectionName {
  return validCollections.includes(name as CollectionName);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collection } = await params;
  if (!isValidCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  const dir = path.join(contentDir, collection);
  if (!fs.existsSync(dir)) {
    return NextResponse.json([]);
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const items = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    return { ...data, slug, content };
  });

  return NextResponse.json(items);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collection } = await params;
  if (!isValidCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  const body = await request.json();
  const { slug, content, ...frontmatter } = body;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const dir = path.join(contentDir, collection);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `${slug}.mdx`);
  const fileContent = matter.stringify(content || "", frontmatter);
  fs.writeFileSync(filePath, fileContent);

  return NextResponse.json({ success: true, slug });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collection } = await params;
  if (!isValidCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  const { slug } = await request.json();
  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const dir = path.join(contentDir, collection);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);

  if (fs.existsSync(mdxPath)) {
    fs.unlinkSync(mdxPath);
  } else if (fs.existsSync(mdPath)) {
    fs.unlinkSync(mdPath);
  } else {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
