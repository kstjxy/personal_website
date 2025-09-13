import React from "react";
import { cn } from "@/lib/utils";

type SideDecorProps = {
  leftSrc?: string;
  leftAlt?: string;
  rightSrc?: string;
  rightAlt?: string;
  leftClassName?: string;
  rightClassName?: string;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Layout helper: side decorative images with centered content.
 * Usage in MDX:
 * <SideDecor leftSrc="/images/left.png" rightSrc="/images/right.png">
 *   <h2>Story</h2>
 *   <p>...</p>
 * </SideDecor>
 */
const SideDecor: React.FC<SideDecorProps> = ({
  leftSrc,
  leftAlt = "",
  rightSrc,
  rightAlt = "",
  leftClassName,
  rightClassName,
  children,
  className,
}) => {
  return (
    <div className={cn("not-prose my-8", className)}>
      <div className="grid grid-cols-[1fr_minmax(0,700px)_1fr] items-center gap-6">
        <div className="justify-self-end">
          {leftSrc ? (
            <img
              src={leftSrc}
              alt={leftAlt}
              className={cn(
                "h-28 md:h-40 object-contain select-none pointer-events-none",
                leftClassName,
              )}
            />
          ) : null}
        </div>
        <div className="prose prose-neutral dark:prose-invert max-w-none">{children}</div>
        <div className="justify-self-start">
          {rightSrc ? (
            <img
              src={rightSrc}
              alt={rightAlt}
              className={cn(
                "h-28 md:h-40 object-contain select-none pointer-events-none",
                rightClassName,
              )}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SideDecor;

