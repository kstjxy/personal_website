import React from "react";
import LinkButtons, { type LinkItem } from "@/components/mdx/LinkButtons";
import { QuickLinksContext } from "@/components/mdx/QuickLinksContext";

type QuickLinksProps = {
  links?: LinkItem[];
  align?: "left" | "center" | "right";
};

const QuickLinks: React.FC<QuickLinksProps> = ({ links, align }) => {
  const ctx = React.useContext(QuickLinksContext);
  const resolved = links ?? ctx.links ?? [];
  if (!resolved.length) return null;
  return <LinkButtons links={resolved} align={align} />;
};

export default QuickLinks;
