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
      {/* Mobile layout: images inline above content */}
      {(leftSrc || rightSrc) && (
        <div className="mb-4 flex items-center justify-center gap-4 md:hidden">
          {leftSrc ? (
            <img
              src={leftSrc}
              alt={leftAlt}
              loading="lazy"
              className={cn("h-20 w-auto select-none object-contain", leftClassName)}
            />
          ) : null}
          {rightSrc ? (
            <img
              src={rightSrc}
              alt={rightAlt}
              loading="lazy"
              className={cn("h-20 w-auto select-none object-contain", rightClassName)}
            />
          ) : null}
        </div>
      )}

      {/* Desktop/tablet layout: side decor with centered content */}
      <div className="hidden items-center gap-6 md:grid md:grid-cols-[1fr_minmax(0,700px)_1fr]">
        <div className="justify-self-end">
          {leftSrc ? (
            <img
              src={leftSrc}
              alt={leftAlt}
              loading="lazy"
              className={cn(
                "pointer-events-none h-28 select-none object-contain md:h-40",
                leftClassName,
              )}
            />
          ) : null}
        </div>
        <div className="prose-neutral dark:prose-invert prose max-w-none">{children}</div>
        <div className="justify-self-start">
          {rightSrc ? (
            <img
              src={rightSrc}
              alt={rightAlt}
              loading="lazy"
              className={cn(
                "pointer-events-none h-28 select-none object-contain md:h-40",
                rightClassName,
              )}
            />
          ) : null}
        </div>
      </div>

      {/* Mobile content (full width) */}
      <div className="prose-neutral dark:prose-invert prose max-w-none md:hidden">{children}</div>
    </div>
  );
};

export default SideDecor;
