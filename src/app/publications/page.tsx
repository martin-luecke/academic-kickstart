import type { Metadata } from "next";
import { getCollection } from "@/lib/content";
import { PublicationCard } from "@/components/publications/PublicationCard";
import type { Publication } from "@/lib/types";

export const metadata: Metadata = {
  title: "Publications",
  description: "Research publications and papers",
};

export default async function PublicationsPage() {
  const publications = await getCollection<Publication>("publications");

  // Group by year
  const byYear = publications.reduce<Record<string, Publication[]>>(
    (acc, pub) => {
      const year = new Date(pub.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(pub);
      return acc;
    },
    {}
  );

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold mb-8">Publications</h1>

      {years.length === 0 && (
        <p className="text-foreground/60">No publications yet.</p>
      )}

      {years.map((year) => (
        <section key={year} className="mb-10">
          <h2 className="text-xl font-semibold text-foreground/70 mb-4 border-b border-primary-200/50 dark:border-primary-800/30 pb-2">
            {year}
          </h2>
          <div className="space-y-4">
            {byYear[year].map((pub) => (
              <PublicationCard key={pub.slug} pub={pub} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
