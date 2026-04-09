export interface Publication {
  slug: string;
  title: string;
  authors: string[];
  date: string;
  type: "preprint" | "conference" | "journal" | "thesis" | "book";
  publication: string;
  doi: string;
  url_pdf: string;
  url_code: string;
  url_slides: string;
  url_video: string;
  tags: string[];
  featured: boolean;
  abstract: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  url_code: string;
  url_demo: string;
  image: string;
  featured: boolean;
  status: "active" | "completed" | "archived";
}

export interface Presentation {
  slug: string;
  title: string;
  event: string;
  event_url: string;
  location: string;
  date: string;
  date_end: string;
  all_day: boolean;
  abstract: string;
  url_slides: string;
  url_video: string;
  authors: string[];
  featured: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  featured: boolean;
  image: string;
  draft: boolean;
}

export type ContentItem = Publication | Project | Presentation | BlogPost;

export type CollectionName = "publications" | "projects" | "presentations" | "blog";
