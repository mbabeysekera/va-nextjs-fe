import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Props {
  product: Product;
  items: ItemDetails[];
}

const ProductModifyCard = ({ product, items }: Props) => {
  return (
    <Card className="flex transition-shadow hover:shadow-md">
      <CardContent className="flex items-center justify-center p-0 h-full w-full">
        <Image
          src={items[0].image_url}
          alt={items[0].image_url}
          width={100}
          height={100}
          className="rounded-lg"
          priority
          unoptimized
        />
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
