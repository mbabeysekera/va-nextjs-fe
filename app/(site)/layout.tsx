import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/NavBar";
export default async function GeneralSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavBar />
      <div className="flex items-center mx-auto max-w-7xl px-6 py-1">
        {children}
      </div>
      <Footer />
    </section>
  );
}
