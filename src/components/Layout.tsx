import LeftNavigation from "./LeftNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] md:grid-cols-1">
        <div className="hidden lg:block">
          <LeftNavigation />
        </div>
        <main className="overflow-auto max-h-screen">
          {/* Mobile navigation placeholder - can be added later */}
          <div className="lg:hidden p-4 border-b border-nav-border bg-nav">
            <h1 className="text-xl font-bold">XJ Portfolio</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;