import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug } from "@/lib/content";
import { MDXProvider } from "@mdx-js/react";
import Gallery from "@/components/mdx/Gallery";
import LinkButtons from "@/components/mdx/LinkButtons";
import QuickLinks from "@/components/mdx/QuickLinks";
import { QuickLinksProvider } from "@/components/mdx/QuickLinksContext";
import YouTube from "@/components/mdx/YouTube";
import SideDecor from "@/components/mdx/SideDecor";
import Columns from "@/components/mdx/Columns";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="py-12 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Project Not Found</h1>
          <p className="mb-6 text-muted-foreground">The requested project could not be found.</p>
          <Button asChild>
            <Link to="/work">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-6 pt-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/work">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-4xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {project.monthLabel}
            </span>
            <span className="inline-flex items-center gap-1">
              <User className="h-4 w-4" /> {project.role.join(" • ")}
            </span>
          </div>
          {!!project.links?.length && (
            <div className="flex flex-wrap items-center gap-2">
              {project.links!.map((l) => (
                <Button
                  key={`${l.label}-${l.href}`}
                  asChild
                  size="sm"
                  variant="secondary"
                  className="gap-2"
                >
                  <a href={l.href} target="_blank" rel="noreferrer noopener">
                    <ExternalLink className="h-4 w-4" />
                    {l.label}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
        <h1 className="mb-3 mt-2 text-4xl font-bold text-foreground">{project.title}</h1>
        <p className="text-lg leading-relaxed text-foreground">{project.summary}</p>
        {/* Tags above hero image */}
        {!!project.tags?.length && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Wider hero image */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 h-64 overflow-y-hidden rounded-xl bg-muted md:h-80 lg:h-96">
          <img
            src={project.cover}
            alt={`${project.title} hero`}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='800' viewBox='0 0 1600 800'%3E%3Crect width='1600' height='800' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='24'%3EProject Image%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-6">
        {/* Tags moved above hero image */}

        {/* Project Content */}
        <div className="prose-neutral dark:prose-invert prose mx-auto max-w-4xl px-0">
          {project.MDXContent ? (
            <QuickLinksProvider value={{ links: project.links }}>
              <MDXProvider
                components={{ Gallery, LinkButtons, YouTube, QuickLinks, SideDecor, Columns }}
              >
                <project.MDXContent />
              </MDXProvider>
            </QuickLinksProvider>
          ) : (
            <div className="whitespace-pre-wrap text-foreground">{project.content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
