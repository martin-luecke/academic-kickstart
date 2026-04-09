import type { Metadata } from "next";
import { getCollection } from "@/lib/content";
import type { Presentation } from "@/lib/types";
import { MapPin, ExternalLink, Film, Presentation as SlidesIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Presentations",
  description: "Talks and presentations",
};

export default async function PresentationsPage() {
  const presentations = await getCollection<Presentation>("presentations");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold mb-8">Presentations</h1>

      {presentations.length === 0 && (
        <p className="text-foreground/60">No presentations yet.</p>
      )}

      <div className="space-y-6">
        {presentations.map((pres) => (
          <div
            key={pres.slug}
            className="rounded-lg border border-primary-200/50 dark:border-primary-800/30 p-5"
          >
            <h3 className="font-semibold text-lg">{pres.title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/60">
              {pres.event && (
                <span className="flex items-center gap-1">
                  {pres.event_url ? (
                    <a
                      href={pres.event_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      {pres.event}
                    </a>
                  ) : (
                    pres.event
                  )}
                </span>
              )}
              {pres.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {pres.location}
                </span>
              )}
              <span>{pres.date}</span>
            </div>
            {pres.abstract && (
              <p className="mt-3 text-sm text-foreground/70">{pres.abstract}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {pres.url_slides && (
                <a
                  href={pres.url_slides}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-primary-200 dark:border-primary-800/50 px-2 py-1 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <SlidesIcon className="h-3 w-3" /> Slides
                </a>
              )}
              {pres.url_video && (
                <a
                  href={pres.url_video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-primary-200 dark:border-primary-800/50 px-2 py-1 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <Film className="h-3 w-3" /> Video
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
