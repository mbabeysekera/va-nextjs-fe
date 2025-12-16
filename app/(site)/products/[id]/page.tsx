import ProductSelectImageGallery from "@/app/components/ProductSelectImageGallery";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
const ProductSelectPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const getProductByID = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/products/${id}`;
  const res = await fetch(getProductByID, {
    cache: "no-store",
  });

  const product: ProductDetails = await res.json();

  return <ProductSelectImageGallery productDetails={product} />;
};

export default ProductSelectPage;
