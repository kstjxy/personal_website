import LeftNavigation from "./LeftNavigation";
import TopNav from "./TopNav";

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
          <TopNav />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
