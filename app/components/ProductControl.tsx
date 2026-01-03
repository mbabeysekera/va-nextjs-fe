import CreateNewProductCard from "./CreateNewProductCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModifyExistingProductCard from "./ModifyExistingProductCard";

const ProductControl = () => {
  return (
    <div className="flex h-full w-full flex-col gap-6 px-6 py-2">
      <div className="flex flex-1 items-start justify-center">
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="h-12 w-2xl">
            <TabsTrigger value="add" className="text-lg text-zinc-600">
              Add Product
            </TabsTrigger>
            <TabsTrigger value="modify" className="text-lg text-zinc-600">
              Modify / Delete Product
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="add"
            className="flex flex-1 flex-col items-center"
          >
            <p className="mt-1 text-lg font-normal w-full text-zinc-600 border-b mb-4">
              Enter product details and items to create a new product.
            </p>
            <CreateNewProductCard />
          </TabsContent>
          <TabsContent
            value="modify"
            className="flex flex-1 flex-col items-center"
          >
            <p className="mt-1 text-lg font-normal w-full text-zinc-600 border-b mb-4">
              Modify / Remove product from the active list.
            </p>
            <ModifyExistingProductCard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductControl;
