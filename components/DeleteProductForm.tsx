"use client";

import { deleteProductAction } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeleteProductButton({ productId }: { productId: string }) {
  return (
    <Button
      type="submit"
      variant="ghost"
      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
      onClick={() => {
        deleteProductAction(productId);
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
