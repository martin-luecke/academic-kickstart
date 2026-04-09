export const publicationFields = [
  { name: "title", label: "Title", type: "text" as const, required: true },
  { name: "authors", label: "Authors", type: "tags" as const },
  { name: "date", label: "Date", type: "date" as const, required: true },
  {
    name: "type",
    label: "Type",
    type: "select" as const,
    options: ["preprint", "conference", "journal", "thesis", "book"],
  },
  { name: "publication", label: "Venue / Journal", type: "text" as const },
  { name: "doi", label: "DOI", type: "text" as const },
  { name: "url_pdf", label: "PDF URL", type: "text" as const },
  { name: "url_code", label: "Code URL", type: "text" as const },
  { name: "url_slides", label: "Slides URL", type: "text" as const },
  { name: "url_video", label: "Video URL", type: "text" as const },
  { name: "tags", label: "Tags", type: "tags" as const },
  { name: "featured", label: "Featured", type: "boolean" as const },
  { name: "abstract", label: "Abstract", type: "textarea" as const },
];

export const projectFields = [
  { name: "title", label: "Title", type: "text" as const, required: true },
  { name: "summary", label: "Summary", type: "textarea" as const },
  { name: "date", label: "Date", type: "date" as const, required: true },
  { name: "tags", label: "Tags", type: "tags" as const },
  { name: "url_code", label: "Code URL", type: "text" as const },
  { name: "url_demo", label: "Demo URL", type: "text" as const },
  { name: "image", label: "Image Path", type: "text" as const },
  { name: "featured", label: "Featured", type: "boolean" as const },
  {
    name: "status",
    label: "Status",
    type: "select" as const,
    options: ["active", "completed", "archived"],
  },
];

export const presentationFields = [
  { name: "title", label: "Title", type: "text" as const, required: true },
  { name: "event", label: "Event", type: "text" as const },
  { name: "event_url", label: "Event URL", type: "text" as const },
  { name: "location", label: "Location", type: "text" as const },
  { name: "date", label: "Date", type: "date" as const, required: true },
  { name: "date_end", label: "End Date", type: "date" as const },
  { name: "abstract", label: "Abstract", type: "textarea" as const },
  { name: "url_slides", label: "Slides URL", type: "text" as const },
  { name: "url_video", label: "Video URL", type: "text" as const },
  { name: "authors", label: "Authors", type: "tags" as const },
  { name: "featured", label: "Featured", type: "boolean" as const },
];

export const blogFields = [
  { name: "title", label: "Title", type: "text" as const, required: true },
  { name: "date", label: "Date", type: "date" as const, required: true },
  { name: "summary", label: "Summary", type: "textarea" as const },
  { name: "tags", label: "Tags", type: "tags" as const },
  { name: "featured", label: "Featured", type: "boolean" as const },
  { name: "image", label: "Image", type: "text" as const },
  { name: "draft", label: "Draft", type: "boolean" as const },
];
