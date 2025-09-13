import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug } from "@/lib/content";
import { MDXProvider } from "@mdx-js/react";

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm">
          <Link to="/work">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Project Header */}
      <header className="mb-8">
        <div className="grid md:grid-cols-[1fr_360px] gap-8 items-start">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time className="font-medium">{project.monthLabel}</time>
            </div>
            <h1 className="text-4xl font-bold text-foreground mt-2 mb-3">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <User className="h-4 w-4" />
              <span>
                {project.role.map((role, index) => (
                  <span key={index}>
                    {role}
                    {index < project.role.length - 1 && <span className="mx-2">•</span>}
                  </span>
                ))}
              </span>
            </div>
            <p className="text-lg text-foreground leading-relaxed">
              {project.summary}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Image */}
          <div className="aspect-video md:aspect-auto md:h-full md:min-h-[220px] rounded-xl overflow-hidden bg-muted">
            <img
              src={project.cover}
              alt={`${project.title} project image`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='202' viewBox='0 0 360 202'%3E%3Crect width='360' height='202' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='16'%3EProject Image%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>
      </header>

      {/* Project Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-2xl mx-auto px-4">
        {project.MDXContent ? (
          <MDXProvider>
            <project.MDXContent />
          </MDXProvider>
        ) : (
          <div className="whitespace-pre-wrap text-foreground">
            {project.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
