import { siteConfig } from "@/lib/site-config";
import { Mail } from "lucide-react";
import { GitHubIcon, TwitterIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-primary-200/50 dark:border-primary-800/30">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
          <a
            href={siteConfig.social.email}
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
