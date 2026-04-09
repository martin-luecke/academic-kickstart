import { Mail } from "lucide-react";
import { GitHubIcon, TwitterIcon } from "@/components/ui/icons";

const iconMap = {
  github: GitHubIcon,
  twitter: TwitterIcon,
  email: Mail,
} as const;

interface SocialIconProps {
  platform: keyof typeof iconMap;
  href: string;
  className?: string;
}

export function SocialIcon({ platform, href, className = "" }: SocialIconProps) {
  const Icon = iconMap[platform];
  return (
    <a
      href={href}
      target={platform !== "email" ? "_blank" : undefined}
      rel={platform !== "email" ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-2 rounded-md border border-primary-200 dark:border-primary-800/50 px-3 py-2 text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors ${className}`}
      aria-label={platform}
    >
      <Icon className="h-4 w-4" />
      <span className="capitalize">{platform}</span>
    </a>
  );
}
