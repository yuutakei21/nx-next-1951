import Header from '../components/Header';
import { SidebarProvider } from '../components/Sidebar/useSidebar';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-layout flex flex-row h-screen">
      <SidebarProvider>
        <div className="w-full">
          <Header />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
