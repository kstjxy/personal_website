import React from "react";
import { Button } from "@/components/ui/button";

export type LinkItem = { label: string; href: string };

interface LinkButtonsProps {
  links: LinkItem[];
}

const LinkButtons: React.FC<LinkButtonsProps> = ({ links }) => {
  if (!links?.length) return null;
  return (
    <div className="flex flex-wrap gap-3 my-4">
      {links.map((l) => (
        <Button key={l.href + l.label} asChild variant="link" className="px-0">
          <a href={l.href} target="_blank" rel="noreferrer noopener">
            {l.label}
          </a>
        </Button>
      ))}
    </div>
  );
};

export default LinkButtons;

