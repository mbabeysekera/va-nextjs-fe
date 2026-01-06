"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRef } from "react";

interface Props {
  title: string;
  brand?: string;
  description: string;
  price: string;
  items: ItemDetails[];
}

const ProductCard = ({ title, brand, description, price, items }: Props) => {
  const apiRef = useRef<CarouselApi | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    if (!apiRef.current || intervalRef.current) return;

    setTimeout(() => {
      apiRef.current?.scrollNext();
    }, 100);

    intervalRef.current = setInterval(() => {
      apiRef.current?.scrollNext();
    }, 1500);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    apiRef.current?.scrollTo(0);
  };
  return (
    <Card
      className="relative z-0 flex flex-col w-72 h-110 p-0 transition-shadow hover:shadow-md"
      onMouseEnter={startAutoPlay}
      onMouseLeave={stopAutoPlay}
    >
      <CardContent className="flex justify-center p-0 w-full">
        <Carousel
          setApi={(api) => (apiRef.current = api)}
          opts={{ loop: true }}
          className="flex mt-4"
        >
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <Image
                  src={item.image_url}
                  alt={item.image_url}
                  width={320}
                  height={320}
                  className="rounded-lg w-64 h-64"
                  priority
                  unoptimized
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
      <CardFooter className="flex-col items-start h-35 w-72">
        <CardTitle className="text-xl">{title}</CardTitle>
        {brand && <p className="text-sm">Brand: {brand}</p>}
        <p className="text-lg">
          Rs <span>{price}</span>
        </p>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
