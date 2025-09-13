import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const TopNav = () => {
  const location = useLocation();
  const items = [
    { path: "/work", label: "Projects" },
    { path: "/about", label: "About" },
    { path: "/resume", label: "Resume" },
  ];

  return (
    <div className="sticky top-0 z-30 border-b border-nav-border bg-nav/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 p-4">
        <Link to="/" className="text-base font-semibold text-foreground">
          Xiaoyue Jin
        </Link>
        <nav className="flex items-center gap-1">
          {items.map((it) => {
            const active = location.pathname.startsWith(it.path);
            return (
              <Link
                key={it.path}
                to={it.path}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TopNav;
