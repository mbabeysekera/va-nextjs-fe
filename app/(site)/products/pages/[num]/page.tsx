import ProductListCard from "@/app/components/ProductListCard";

interface ProductPageProps {
  params?: Promise<{
    num: string;
  }>;
  searchParams?: Promise<{
    category?: string;
  }>;
}
const ProductPaginatedPage = async ({
  params,
  searchParams,
}: ProductPageProps) => {
  const num = (await params)?.num ?? "1";
  const category = (await searchParams)?.category ?? null;

  const pageNumber = parseInt(num);
  const getAllProduct = `${process.env.BACKEND_URL}${
    process.env.API_BASE_URL
  }/products/all?page=${pageNumber}&count=${12}${
    category ? `&category=${category}` : ""
  }`;
  const res = await fetch(getAllProduct, {
    cache: "no-store",
  });
  const products: ProductList = await res.json();
  const pageCount = 2; //Math.ceil(products.count / 10);
  return (
    <ProductListCard
      productList={products}
      currentPage={pageNumber}
      totalPages={pageCount}
    />
  );
};

export default ProductPaginatedPage;
