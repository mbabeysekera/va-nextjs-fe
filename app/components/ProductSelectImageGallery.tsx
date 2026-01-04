"use client";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import IconMinus from "@/lib/icons/IconMinus";
import IconPlus from "@/lib/icons/IconPlus";
import Image from "next/image";
import { useState } from "react";

interface Props {
  productDetails: ProductDetails;
}

const ProductSelectImageGallery = ({ productDetails }: Props) => {
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const setQuantityOnClick = (val: number) => {
    if (val === -1) {
      if (quantity !== 1) {
        setQuantity(quantity - 1);
      }
    }
    if (val === 1) {
      if (quantity !== 3) {
        setQuantity(quantity + 1);
      }
    }
  };
  return (
    <div className="flex flex-row h-full w-full gap-6">
      <div className="flex flex-col gap-2">
        {productDetails.items.map((item, index) => (
          <Image
            key={index}
            src={item.image_url}
            alt={index.toString()}
            width={125}
            height={125}
            className={`rounded-lg border-2 ${
              index === selected ? " border-zinc-700" : ""
            }`}
            priority
            onClick={() => setSelected(index)}
            unoptimized
          />
        ))}
      </div>
      <div className="flex w-200">
        <Image
          src={productDetails.items[selected].image_url}
          alt={productDetails.items[selected].id.toString()}
          width={620}
          height={620}
          className="rounded-lg"
          priority
          unoptimized
        />
      </div>
      <div className="flex flex-col w-140">
        <p className="text-xs font-bold text-muted-foreground p-2">
          Category: {productDetails.product.category}
        </p>
        <p className="font-semibold text-3xl p-2">
          {productDetails.product.title}
        </p>
        <p className="text-sm text-muted-foreground p-2">
          Brand: {productDetails.product.brand}
        </p>
        <p className="text-sm px-2">{productDetails.product.description}</p>
        <p className="text-2xl font-bold p-2">
          Rs {productDetails.product.price.toFixed(2)}
        </p>
        <p className="text-sm font-bold text-muted-foreground p-2">
          Product ID: {productDetails.product.id}
        </p>
        <p className="text-sm text-muted-foreground p-2">
          In Stock: {productDetails.product.in_stock}
        </p>
        {/* <div>
          <ButtonGroup>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setQuantityOnClick(-1)}
            >
              <IconMinus />
            </Button>
            <ButtonGroupSeparator />
            <Button variant="secondary" className="w-3">
              {quantity}
            </Button>
            <ButtonGroupSeparator />
            <Button
              size="icon"
              variant="outline"
              onClick={() => setQuantityOnClick(1)}
            >
              <IconPlus />
            </Button>
          </ButtonGroup>
        </div> */}
      </div>
    </div>
  );
};

export default ProductSelectImageGallery;
