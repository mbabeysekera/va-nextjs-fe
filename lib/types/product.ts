interface ItemDetails {
  id?: number;
  product_id?: number;
  item_code: number;
  in_stock: number;
  image_url: string;
  created_at?: Date;
}

interface Product {
  id?: number;
  title: string;
  brand: string;
  category: string;
  sku: string;
  description: string;
  price: number;
  created_at?: Date;
}
interface ProductDetails {
  product: Product;
  items: ItemDetails[];
}

interface ProductList {
  all: ProductDetails[];
  count: number;
}

type ProductCategory =
  | "EARRING"
  | "PENDANT"
  | "BRACELET"
  | "NECKLACE"
  | "RING"
  | "NONE";
