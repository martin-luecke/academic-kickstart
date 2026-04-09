import { z } from "zod";

export const publicationSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).default([]),
  date: z.string(),
  type: z
    .enum(["preprint", "conference", "journal", "thesis", "book"])
    .default("preprint"),
  publication: z.string().default(""),
  doi: z.string().default(""),
  url_pdf: z.string().default(""),
  url_code: z.string().default(""),
  url_slides: z.string().default(""),
  url_video: z.string().default(""),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  abstract: z.string().default(""),
});

export const projectSchema = z.object({
  title: z.string(),
  summary: z.string().default(""),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  url_code: z.string().default(""),
  url_demo: z.string().default(""),
  image: z.string().default(""),
  featured: z.boolean().default(false),
  status: z.enum(["active", "completed", "archived"]).default("active"),
});

export const presentationSchema = z.object({
  title: z.string(),
  event: z.string().default(""),
  event_url: z.string().default(""),
  location: z.string().default(""),
  date: z.string(),
  date_end: z.string().default(""),
  all_day: z.boolean().default(true),
  abstract: z.string().default(""),
  url_slides: z.string().default(""),
  url_video: z.string().default(""),
  authors: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export const blogPostSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string().default(""),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  image: z.string().default(""),
  draft: z.boolean().default(false),
});

export const schemas = {
  publications: publicationSchema,
  projects: projectSchema,
  presentations: presentationSchema,
  blog: blogPostSchema,
} as const;
