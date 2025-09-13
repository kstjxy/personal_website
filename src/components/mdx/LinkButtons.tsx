import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export type LinkItem = { label: string; href: string };

interface LinkButtonsProps {
  links: LinkItem[];
  align?: "left" | "center" | "right";
}

const LinkButtons: React.FC<LinkButtonsProps> = ({ links, align = "left" }) => {
  if (!links?.length) return null;
  const justify = align === "right" ? "justify-end" : align === "center" ? "justify-center" : "justify-start";
  return (
    <div className={`flex flex-wrap items-center gap-2 my-4 ${justify}`}>
      {links.map((l) => (
        <Button key={l.href + l.label} asChild size="sm" variant="secondary" className="gap-2">
          <a href={l.href} target="_blank" rel="noreferrer noopener">
            <ExternalLink className="h-4 w-4" />
            {l.label}
          </a>
        </Button>
      ))}
    </div>
  );
};

export default LinkButtons;
