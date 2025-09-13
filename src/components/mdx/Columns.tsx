import React from "react";
import { cn } from "@/lib/utils";

type ColumnsProps = {
  cols?: 2 | 3 | 4; // md+ columns; mobile remains 1
  className?: string;
  gap?: string; // tailwind gap size like "gap-6"
  children?: React.ReactNode;
};

/**
 * Simple grid columns for MDX content blocks.
 * <Columns cols={2}><img .../><img .../></Columns>
 */
const Columns: React.FC<ColumnsProps> = ({ cols = 2, className, gap = "gap-6", children }) => {
  const mdCols = cols === 4 ? "md:grid-cols-4" : cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <div className={cn("not-prose my-6 grid grid-cols-1", mdCols, gap, className)}>
      {children}
    </div>
  );
};

export default Columns;

