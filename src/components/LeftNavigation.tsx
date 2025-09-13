import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const LeftNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/work", label: "Projects" },
    { path: "/about", label: "About" },
    { path: "/resume", label: "Resume" },
  ];

  return (
    <aside className="sticky top-0 h-screen w-[260px] bg-nav border-r border-nav-border p-6 flex flex-col">
      {/* Site Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">XJ</h1>
        <p className="text-sm text-muted-foreground">Portfolio</p>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname.startsWith(item.path)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Identity Card */}
      <div className="mt-auto bg-card rounded-xl p-4 shadow-card border">
        <div className="mb-3">
          <h3 className="font-semibold text-card-foreground mb-1">XJ</h3>
          <p className="text-sm text-muted-foreground mb-2">Game Developer & Designer</p>
        </div>
        
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            Available for Internships
          </Badge>
          <p className="text-xs text-muted-foreground">
            Specializing in gameplay programming, AI systems, and procedural generation.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default LeftNavigation;