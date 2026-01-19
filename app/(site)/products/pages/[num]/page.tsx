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
  const numberOfProductsToFetch = 12;

  const getAllProduct = `${process.env.BACKEND_URL}${
    process.env.API_BASE_URL
  }/products/all?page=${pageNumber}&count=${numberOfProductsToFetch}${
    category ? `&category=${category}` : ""
  }`;

  const res = await fetch(getAllProduct, {
    headers: {
      "X-App-Id": process.env.APP_ID || "",
    },
    cache: "no-store",
  });

  const products: ProductList = await res.json();
  const pageCount =
    products.count === numberOfProductsToFetch ? pageNumber + 1 : pageNumber;

  return (
    <ProductListCard
      productList={products}
      currentPage={pageNumber}
      totalPages={pageCount}
    />
  );
};

export default ProductPaginatedPage;
