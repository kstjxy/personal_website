import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/content";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link to={project.url} className="block">
      <article className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border hover:bg-card-hover group cursor-pointer relative overflow-hidden">
        {/* Hover indicator arrow */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
          <svg 
            className="w-5 h-5 text-primary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        
        <div className="grid md:grid-cols-[1fr_280px] gap-6 items-stretch">
          {/* Content */}
          <div className="space-y-4">
            {/* Date */}
            <time className="text-sm text-muted-foreground font-medium">
              {project.monthLabel}
            </time>

            {/* Title */}
            <h2 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h2>

            {/* Roles */}
            <div className="flex flex-wrap gap-2">
              {project.role.map((role, index) => (
                <span key={index} className="text-sm text-muted-foreground">
                  {role}
                  {index < project.role.length - 1 && <span className="mx-1">•</span>}
                </span>
              ))}
            </div>

            {/* Summary */}
            <p className="text-card-foreground leading-relaxed group-hover:text-foreground transition-colors">
              {project.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="aspect-video md:aspect-auto md:h-full md:min-h-[180px] rounded-lg overflow-hidden bg-muted order-first md:order-last">
            <img
              src={project.cover}
              alt={`${project.title} project thumbnail`}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                // Fallback for missing images
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='112' viewBox='0 0 200 112'%3E%3Crect width='200' height='112' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='14'%3EProject Image%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
