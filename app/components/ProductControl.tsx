import CreateNewProductCard from "./CreateNewProductCard";

const ProductControl = () => {
  return (
    <div className="flex flex-col w-4xl h-full ml-2 p-2">
      <p className="font-semibold text-3xl pt-3">Add New Product Here</p>
      <div className="flex flex-col w-full h-full items-center pt-4">
        <CreateNewProductCard />
      </div>
    </div>
  );
};

export default ProductControl;
