"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@prisma/client"; // Prisma'dan gelen gerçek ürün tipi
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Button
      variant="ghost" // veya kendi kullandığın bir varyant
      className="w-full mt-2 flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800"
      onClick={() => addToCart(product)}
    >
      <ShoppingCart className="w-4 h-4" />
      Add to Cart
    </Button>
  );
}
