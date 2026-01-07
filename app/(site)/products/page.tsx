import ProductListCard from "@/app/components/ProductListCard";

const ProductPage = async () => {
  const getAllProduct = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/products/all?count=12`;
  const res = await fetch(getAllProduct, {
    cache: "no-store",
  });
  const products: ProductList = await res.json();
  const pageCount = 2; //Math.ceil(products.count / 10);
  return (
    <ProductListCard
      productList={products}
      currentPage={1}
      totalPages={pageCount}
    />
  );
};

export default ProductPage;
