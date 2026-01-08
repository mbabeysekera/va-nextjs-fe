import ProductListCard from "@/app/components/ProductListCard";

const ProductPage = async () => {
  const numberOfProductsToFetch = 12;
  const getAllProduct = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/products/all?count=${numberOfProductsToFetch}`;
  const res = await fetch(getAllProduct, {
    cache: "no-store",
  });
  const products: ProductList = await res.json();
  const pageCount = products.count === numberOfProductsToFetch ? 2 : 1;
  return (
    <ProductListCard
      productList={products}
      currentPage={1}
      totalPages={pageCount}
    />
  );
};

export default ProductPage;
