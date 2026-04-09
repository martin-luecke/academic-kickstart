export const siteConfig = {
  name: "Martin Lücke",
  role: "PhD Student",
  affiliation: "University of Edinburgh",
  email: "martin.luecke@ed.ac.uk",
  avatar: "/avatar.png",
  bio: "I am a PhD student at the University of Edinburgh, working on compilers and programming languages. My research focuses on functional pattern-based languages and MLIR.",
  social: {
    twitter: "https://twitter.com/martin_luecke",
    github: "https://github.com/martin-luecke",
    email: "mailto:martin.luecke@ed.ac.uk",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "Publications", href: "/publications" },
    { label: "Projects", href: "/projects" },
    { label: "Presentations", href: "/presentations" },
    { label: "Blog", href: "/blog" },
    { label: "CV", href: "/cv" },
  ],
  baseUrl: "https://martin-luecke.github.io",
} as const;
