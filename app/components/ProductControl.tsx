import CreateNewProductCard from "./CreateNewProductCard";

const ProductControl = () => {
  return (
    <div className="flex h-full w-full flex-col gap-6 px-6 py-4">
      <div className="border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Add New Product
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Enter product details and items to create a new product.
        </p>
      </div>
      <div className="flex flex-1 items-start justify-center">
        <CreateNewProductCard />
      </div>
    </div>
  );
};

export default ProductControl;
