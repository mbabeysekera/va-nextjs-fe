import { Input } from "@/components/ui/input";
import ProductModifyCard from "./ProductModifyCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ModifyExistingProductCard = () => {
  const [productID, setProductID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>();

  const findProductByID = async () => {
    const res = await fetch(`/api/product/get/${productID}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      setProductDetails(null);
      setIsLoading(false);
      toast.error("Product does not exists in the system");
      return;
    }
    const product: ProductDetails = await res.json();
    setProductDetails(product);
    toast.success("Product fetched from the system");
  };

  return (
    <div className="w-full max-w-2xl p-0">
      <p className="font-semibold">Find Product:</p>
      <div className="flex gap-2 justify-center ">
        <Input
          placeholder="Product ID"
          inputMode="numeric"
          pattern="[0-9]*"
          id="productID"
          onChange={(e) => {
            setProductID(e.target.value);
            setProductDetails(null);
            setIsLoading(false);
          }}
          value={productID}
          maxLength={12}
        />
        <Button
          disabled={!productID || isLoading}
          variant={"outline"}
          onClick={() => {
            setIsLoading(true);
            findProductByID();
          }}
          type="button"
        >
          Check
        </Button>
      </div>
      {productDetails && (
        <div className="mt-4">
          <ProductModifyCard
            items={productDetails.items}
            product={productDetails.product}
          />
        </div>
      )}
    </div>
  );
};

export default ModifyExistingProductCard;
