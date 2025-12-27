import ProductListCard from "@/app/components/ProductListCard";

const ProductPage = async () => {
  const getAllProduct = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/products/all`;
  const res = await fetch(getAllProduct, {
    cache: "no-store",
  });
  const products: ProductList = await res.json();
  const pageCount = Math.ceil(products.count / 10);
  return (
    <ProductListCard
      productList={products}
      currentPage={1}
      totalPages={pageCount}
    />
  );
};

export default ProductPage;
