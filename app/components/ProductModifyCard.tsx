import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  productDetails: ProductDetails;
  setProductDetails: (product: ProductDetails | null) => void;
}

const ProductModifyCard = ({ productDetails, setProductDetails }: Props) => {
  const [price, setPrice] = useState(productDetails.product.price.toFixed(2));
  const [inStock, setInStock] = useState(productDetails.product.in_stock);
  const [isEditable, setIsEditable] = useState(false);

  const modifyProductByID = async () => {};

  const deleteProductByID = async () => {
    const res = await fetch(
      `/api/product/delete/${productDetails.product.id}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );
    if (!res.ok) {
      toast.error("Error while delete operation.");
    }
    setProductDetails(null);
    toast.success("Product successfully deleted.");
  };

  return (
    <Card className="flex transition-shadow hover:shadow-md py-2">
      <CardContent className="flex px-2 h-full w-full justify-between">
        <div className="flex p-2">
          <div className="grid grid-cols-3 gap-x-10 gap-y-2 text-sm">
            <span className="col-span-1 font-medium text-zinc-600">ID</span>
            <span className="col-span-2 text-zinc-900">
              {productDetails.product.id}
            </span>
            <span className="col-span-1 font-medium text-zinc-600">Title</span>
            <span className="col-span-2 text-zinc-900">
              {productDetails.product.title}
            </span>

            <span className="col-span-1 font-medium text-zinc-600">Brand</span>
            <span className="col-span-2 text-zinc-900">
              {productDetails.product.brand}
            </span>

            <span className="col-span-1 font-medium text-zinc-600">
              Category
            </span>
            <span className="col-span-2 text-zinc-900">
              {productDetails.product.category}
            </span>

            <span className="col-span-1 font-medium text-zinc-600">
              Stock Keeping Unit
            </span>
            <span className="col-span-2 font-mono text-zinc-900">
              {`${productDetails.product.sku}`}
            </span>

            <span className="col-span-1 font-medium text-zinc-600">
              Description
            </span>
            <span className="col-span-2 text-zinc-900">
              {productDetails.product.description}
            </span>

            <span className="col-span-1 font-medium text-zinc-600">
              In Stock
            </span>
            <span className="col-span-2 w-24">
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                id="in_stock"
                placeholder="Number of items available"
                required
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    setInStock(parseInt(val));
                  }
                }}
                value={inStock}
                maxLength={6}
                disabled={!isEditable}
              />
            </span>

            <span className="col-span-1 font-medium text-zinc-600">Price</span>
            <span className="col-span-2 w-24">
              <Input
                inputMode="decimal"
                pattern="^\d*\.?\d*$"
                id="price"
                required
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*\.?\d{0,2}$/.test(val)) {
                    setPrice(e.target.value);
                  }
                }}
                value={price}
                disabled={!isEditable}
              />
            </span>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <Image
            src={productDetails.items[0].image_url}
            alt={productDetails.items[0].image_url}
            width={160}
            height={160}
            className="rounded-lg"
            priority
            unoptimized
          />
          <div className="flex flex-1 items-end gap-4 justify-center">
            <span>
              {!isEditable && (
                <Button
                  variant={"default"}
                  className="text-sm"
                  onClick={() => setIsEditable(true)}
                >
                  Edit
                </Button>
              )}
              {isEditable && (
                <Button
                  variant={"default"}
                  className="text-sm"
                  onClick={modifyProductByID}
                >
                  Save
                </Button>
              )}
            </span>
            <span>
              {!isEditable && (
                <Button
                  variant={"outline"}
                  className="text-sm"
                  onClick={deleteProductByID}
                >
                  Delete
                </Button>
              )}
              {isEditable && (
                <Button
                  variant={"outline"}
                  className="text-sm"
                  onClick={() => setIsEditable(false)}
                >
                  Cancel
                </Button>
              )}
            </span>
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex-col items-start h-35 w-64">
        <CardTitle>{title}</CardTitle>
        {brand && <p className="text-xs">Brand: {brand}</p>}
        <p className="text-sm">
          Rs <span>{price}</span>
        </p>
        <CardDescription>{description}</CardDescription>
      </CardFooter> */}
    </Card>
  );
};

export default ProductModifyCard;
