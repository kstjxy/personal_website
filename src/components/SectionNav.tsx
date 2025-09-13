import React from "react";
import { cn } from "@/lib/utils";

export interface SectionItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionItem[];
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const SectionNav: React.FC<SectionNavProps> = ({ items, left, right }) => {
  const [active, setActive] = React.useState<string>(items[0]?.id ?? "");

  React.useEffect(() => {
    const OFFSET = 120; // approximate sticky height + margin
    const handler = () => {
      const positions = items.map((it) => {
        const el = document.getElementById(it.id);
        const top = el ? el.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
        return { id: it.id, top };
      });

      // Prefer the last section whose top is above the offset
      const visible = positions.filter((p) => p.top <= OFFSET);
      if (visible.length > 0) {
        const current = visible.reduce((prev, cur) => (cur.top > prev.top ? cur : prev));
        setActive(current.id);
        return;
      }
      // If none are past the offset, we're above the first section
      if (items[0]) setActive(items[0].id);
    };

    // Initialize and bind listeners
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    // If page loads with a hash, honor it
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) setActive(hash);

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [items]);

  return (
    <div className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto max-w-4xl px-4">
        <div className="flex items-center gap-4 py-3">
          {left ? <div className="shrink-0">{left}</div> : null}
          <div className="flex-1 overflow-x-auto">
            <ul className="flex items-center gap-4">
              {items.map((it) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    className={cn(
                      "px-1 py-1 text-sm transition-colors",
                      active === it.id
                        ? "border-b-2 border-primary text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => setActive(it.id)}
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </div>
      </nav>
    </div>
  );
};

export default SectionNav;
