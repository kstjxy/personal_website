import { useSearchParams } from "react-router-dom";
import { getProjectsByView } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";
import ViewToggle from "@/components/ViewToggle";

const Work = () => {
  const [searchParams] = useSearchParams();
  const view = (searchParams.get("view") as "relevance" | "chronological") || "relevance";

  const projects = getProjectsByView(view);

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">My Work</h1>
        <p className="text-muted-foreground">
          Here's a collection of projects I've built—games, apps, and interactive experiences that
          I'm excited to share.
        </p>
      </div>

      {/* View Toggle */}
      <ViewToggle active={view} />

      {/* Project Grid */}
      <div className="space-y-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No projects found for the selected view.</p>
        </div>
      )}
    </div>
  );
};

export default Work;
