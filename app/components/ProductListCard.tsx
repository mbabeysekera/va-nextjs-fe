import Link from "next/link";
import ProductCard from "./ProductCard";
import AppPagination from "./AppPagination";

interface Props {
  productList: ProductList;
  currentPage: number;
  totalPages: number;
}

const ProductListCard = ({ productList, currentPage, totalPages }: Props) => {
  return (
    <div className="flex flex-col items-center w-full h-lvh gap-5 justify-between">
      <div className="grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
        {productList.all &&
          productList.all.map((productDetails) => (
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
        {!productList.all && <div></div>}
      </div>
      <AppPagination
        hrefBase="/products/pages/"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ProductListCard;
