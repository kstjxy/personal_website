import LeftNavigation from "./LeftNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid md:grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <LeftNavigation />
        </div>
        <main className="max-h-screen overflow-auto">
          {/* Mobile navigation placeholder - can be added later */}
          <div className="border-b border-nav-border bg-nav p-4 lg:hidden">
            <h1 className="text-xl font-bold">Xiaoyue Jin</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
