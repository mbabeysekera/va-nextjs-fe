import { introspectAdmin, IntrospectResponse } from "@/lib/auth/introspect";
import ProductPage from "./(site)/products/page";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

const Home = async () => {
  const userInstrospect: IntrospectResponse | null = await introspectAdmin();
  return (
    <>
      <NavBar user={userInstrospect} />
      <div className="flex items-center mx-auto max-w-7xl px-6 py-1">
        <ProductPage />
      </div>
      <Footer />
    </>
  );
};

export default Home;
