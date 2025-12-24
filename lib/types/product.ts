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
  braned: string;
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
}
