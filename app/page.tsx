import ProductPage from "./(site)/products/page";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

const Home = async () => {
  return (
    <>
      <NavBar />
      <div className="flex items-center mx-auto max-w-7xl px-6 py-1">
        <ProductPage />
      </div>
      <Footer />
    </>
  );
};

export default Home;
