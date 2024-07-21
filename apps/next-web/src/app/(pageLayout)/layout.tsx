import Footer from '../components/Footer';
import Header from '../components/Header';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
