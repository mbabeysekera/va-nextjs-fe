import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";

const ProductPage = async () => {
  const getAllProduct = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/products/all`;
  const res = await fetch(getAllProduct, {
    cache: "no-store",
  });
  const products: ProductList = await res.json();
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-wrap justify-between">
        {products.all &&
          products.all.map((productDetails) => (
            <Link
              key={productDetails.product.id}
              href={`/products/${productDetails.product.id}`}
            >
              <ProductCard
                title={productDetails.product.title}
                brand={productDetails.product.braned}
                description={productDetails.product.description}
                price={productDetails.product.price.toFixed(2)}
                items={productDetails.items}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
