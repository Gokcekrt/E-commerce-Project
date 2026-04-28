"use client";

import { deleteProductAction } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useActionState } from "react";

export function DeleteProductForm({ productId }: { productId: string }) {
  const [state, formAction] = useActionState(deleteProductAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={productId} />
      <Button
        type="submit"
        variant="ghost"
        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      {state?.error && (
        <p className="text-red-500 text-xs mt-1">{state.error}</p>
      )}
    </form>
  );
}
