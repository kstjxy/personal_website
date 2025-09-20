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
    <aside className="sticky top-0 flex h-screen w-[260px] flex-col border-r border-nav-border bg-nav p-6">
      {/* Site Header */}
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-foreground">Xiaoyue Jin</h1>
        <p className="text-sm text-muted-foreground">Software & Gameplay/Graphics Engineer</p>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname.startsWith(item.path)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Identity Card */}
      <div className="mt-auto rounded-xl border bg-card p-4 shadow-card">
        <div className="mb-3">
          <h3 className="mb-1 font-semibold text-card-foreground">Xiaoyue Jin</h3>
          <p className="mb-2 text-sm text-muted-foreground">
            C++ • TypeScript • Java • Unity • Unreal • Lua • OpenGL • CUDA
          </p>
        </div>

        <div className="space-y-1">
          <Badge variant="secondary" className="text-xs">
            Open to SWE & Gameplay internship roles
          </Badge>
          <p className="text-xs text-muted-foreground">
            Rendering • Gameplay systems • Networking • UI/UX
          </p>
        </div>
      </div>
    </aside>
  );
};

export default LeftNavigation;
