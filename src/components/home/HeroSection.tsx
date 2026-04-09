import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-8 py-16 sm:flex-row sm:gap-12">
      <div className="shrink-0">
        <Image
          src={siteConfig.avatar}
          alt={siteConfig.name}
          width={180}
          height={180}
          className="rounded-full border-4 border-primary-200 dark:border-primary-800/50"
          priority
        />
      </div>
      <div className="text-center sm:text-left">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-lg text-foreground/70">
          {siteConfig.role} at {siteConfig.affiliation}
        </p>
        <p className="mt-4 max-w-lg text-foreground/80 leading-relaxed">
          {siteConfig.bio}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
          <SocialIcon platform="email" href={siteConfig.social.email} />
          <SocialIcon platform="github" href={siteConfig.social.github} />
          <SocialIcon platform="twitter" href={siteConfig.social.twitter} />
        </div>
      </div>
    </section>
  );
}
