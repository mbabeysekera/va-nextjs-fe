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
  const [price, setPrice] = useState("");
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
      <CardContent className="flex px-2 h-full w-full">
        <div className="p-2">
          <div className="grid grid-cols-3 gap-x-2 gap-y-2 text-sm">
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

            <span className="col-span-1 font-medium text-zinc-600">Price</span>
            <Input
              inputMode="decimal"
              pattern="^\d*\.?\d*$"
              id="price"
              placeholder={`${productDetails.product.price.toFixed(2)}`}
              required
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d{0,2}$/.test(val)) {
                  setPrice(e.target.value);
                }
              }}
              value={price}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Image
            src={productDetails.items[0].image_url}
            alt={productDetails.items[0].image_url}
            width={160}
            height={160}
            className="rounded-lg"
            priority
            unoptimized
          />
          <div className="flex flex-1 items-end gap-4">
            <span>
              <Button variant={"ghost"} className="text-sm">
                Edit
              </Button>
            </span>
            <span>
              <Button
                variant={"outline"}
                className="text-sm"
                onClick={deleteProductByID}
              >
                Delete
              </Button>
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
