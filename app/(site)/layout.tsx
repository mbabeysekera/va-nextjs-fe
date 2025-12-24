import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/NavBar";
import { introspectAdmin, IntrospectResponse } from "@/lib/auth/introspect";

export default async function GeneralSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInstrospect: IntrospectResponse | null = await introspectAdmin();
  return (
    <section>
      <NavBar user={userInstrospect} />
      <div className="flex items-center mx-auto max-w-7xl px-6 py-1">
        {children}
      </div>
      <Footer />
    </section>
  );
}
