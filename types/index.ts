// types/index.ts

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  images: [string];
}

export interface CartItem {
  product: Product;
  quantity: number;
}