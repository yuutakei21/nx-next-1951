import Header from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-layout flex flex-row h-screen">
      <Sidebar />
      <div className='w-full'>
        <Header />
        {children}
      </div>
    </div>
  );
}
