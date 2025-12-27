import AppPagination from "@/app/components/AppPagination";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{
    num: string;
  }>;
  searchParams: Promise<{
    category?: string;
  }>;
}
const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { num } = await params;
  const { category } = await searchParams;

  const pageNumber = parseInt(num) ?? 1;
  const getAllProduct = `${process.env.BACKEND_URL}${
    process.env.API_BASE_URL
  }/products/all?page=${pageNumber}&count=${10}${
    category ? `&category=${category}` : ""
  }`;
  const res = await fetch(getAllProduct, {
    cache: "no-store",
  });
  const products: ProductList = await res.json();
  return (
    <div className="flex flex-col items-center w-full gap-5">
      <div className="grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
        {products.all &&
          products.all.map((productDetails) => (
            <Link
              key={productDetails.product.id}
              href={`/products/${productDetails.product.id}`}
              className="block"
            >
              <ProductCard
                title={productDetails.product.title}
                brand={productDetails.product.brand}
                description={productDetails.product.description}
                price={productDetails.product.price.toFixed(2)}
                items={productDetails.items}
              />
            </Link>
          ))}
      </div>
      <AppPagination
        hrefBase="/products/pages/"
        currentPage={pageNumber}
        totalPages={4}
      />
    </div>
  );
};

export default ProductPage;
