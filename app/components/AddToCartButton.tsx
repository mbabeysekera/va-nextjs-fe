import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import React from "react";

const AddToCartButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Login">
          <Image
            src="/add_to_cart.svg"
            alt=""
            width={30}
            height={30}
            className="opacity-80"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="text-white">
        <p>Checkout cart</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default AddToCartButton;
