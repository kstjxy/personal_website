import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug } from "@/lib/content";
import { MDXProvider } from "@mdx-js/react";
import HeroHeader from "@/components/HeroHeader";
import SectionNav from "@/components/SectionNav";
import Gallery from "@/components/mdx/Gallery";
import LinkButtons from "@/components/mdx/LinkButtons";
import YouTube from "@/components/mdx/YouTube";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested project could not be found.</p>
          <Button asChild>
            <Link to="/work">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const sectionItems = project.sections ?? [
    { id: "overview", label: "Overview" },
    { id: "game-details", label: "Game Details" },
    { id: "my-duties", label: "My Duties" },
  ];

  return (
    <div>
      <HeroHeader
        title={project.title}
        image={project.cover}
        alt={`${project.title} hero`}
        meta={
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {project.monthLabel}</span>
            <span className="inline-flex items-center gap-1"><User className="h-4 w-4" /> {project.role.join(" • ")}</span>
          </div>
        }
      />

      <SectionNav
        items={sectionItems}
        left={
          <Button asChild variant="ghost" size="sm">
            <Link to="/work">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        }
      />

      <div className="max-w-4xl mx-auto p-6">
        {/* Quick Links */}
          {!!project.links?.length && (
        <div className="flex items-center justify-end mb-6">
            <div className="flex gap-3">
              {project.links!.map((l) => (
                <a key={`${l.label}-${l.href}`} href={l.href} target="_blank" rel="noreferrer noopener" className="text-sm text-primary underline inline-flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" /> {l.label}
                </a>
              ))}
            </div>
        </div>
          )}

        {/* Tags */}
        {!!project.tags?.length && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Project Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-2xl mx-auto px-4">
          {project.MDXContent ? (
            <MDXProvider components={{ Gallery, LinkButtons, YouTube }}>
              <project.MDXContent />
            </MDXProvider>
          ) : (
            <div className="whitespace-pre-wrap text-foreground">
              {project.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
