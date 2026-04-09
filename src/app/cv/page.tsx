import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum Vitae",
};

export default function CVPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Curriculum Vitae</h1>
        <div className="flex gap-3">
          <a
            href="/files/luecke_cv.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
          <a
            href="https://github.com/martin-luecke/cv/blob/master/luecke_cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-primary-200 dark:border-primary-800/50 px-4 py-2 text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <ExternalLink className="h-4 w-4" /> View on GitHub
          </a>
        </div>
      </div>

      <div className="rounded-lg border border-primary-200/50 dark:border-primary-800/30 overflow-hidden bg-white dark:bg-gray-900">
        <iframe
          src="/files/luecke_cv.pdf"
          className="w-full h-[80vh]"
          title="CV"
        />
      </div>
    </div>
  );
}
