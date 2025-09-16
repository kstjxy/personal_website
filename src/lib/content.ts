// Using MDX frontmatter exports; gray-matter not needed

export interface Project {
  title: string;
  slug: string;
  date: string;
  role: string[];
  cover: string;
  summary: string;
  tags: string[];
  highlight: boolean;
  url: string;
  year: number;
  monthLabel: string;
  content: string;
  MDXContent?: React.ComponentType;
  links?: { label: string; href: string }[];
}

// Import all MDX modules with frontmatter export
type MDXModule = {
  default: React.ComponentType;
  frontmatter: {
    title: string;
    slug?: string;
    date: string;
    role?: string[];
    cover?: string;
    summary: string;
    tags?: string[];
    highlight?: boolean;
    links?: { label: string; href: string }[];
  };
  // Optional named exports from MDX for assets
  cover?: string;
};

const modules = import.meta.glob("/content/projects/*.mdx", {
  eager: true,
}) as Record<string, MDXModule>;

function processModule(filePath: string, mod: MDXModule): Project {
  const fm = mod.frontmatter || ({} as MDXModule["frontmatter"]);
  const slug = (fm.slug ?? filePath.split("/").pop()?.replace(".mdx", "")) || "";

  const date = new Date(fm.date);
  const year = date.getFullYear();
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);

  const cover = (mod as unknown as { cover?: string }).cover || fm.cover || "/placeholder.svg";

  return {
    title: fm.title,
    slug,
    date: fm.date,
    role: fm.role || [],
    cover,
    summary: fm.summary,
    tags: fm.tags || [],
    highlight: fm.highlight || false,
    url: `/work/${slug}`,
    year,
    monthLabel,
    content: "",
    MDXContent: mod.default,
    links: fm.links,
  };
}

// Process all projects
export const allProjects: Project[] = Object.entries(modules).map(([filePath, mod]) => {
  return processModule(filePath, mod as MDXModule);
});

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}

export function getProjectsByView(view: "relevance" | "chronological"): Project[] {
  switch (view) {
    case "chronological":
      return [...allProjects].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

    case "relevance":
    default:
      // Relevance = highlights first (most important), then by date
      const sortedByDate = [...allProjects].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      const highlights = sortedByDate.filter((p) => p.highlight);
      const regular = sortedByDate.filter((p) => !p.highlight);
      return [...highlights, ...regular];
  }
}
