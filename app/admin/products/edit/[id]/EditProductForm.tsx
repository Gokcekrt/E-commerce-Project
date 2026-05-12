"use client";

import { useActionState } from "react";
import { updateProductAction } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditProductForm({ product }: { product: any }) {
  // Artık prevState (state) ve formData uyumlu!
  const [state, formAction, isPending] = useActionState(
    updateProductAction,
    null,
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>Update the product details below</CardDescription>
      </CardHeader>
      <CardContent>
        {/* action={formAction} kullanıyoruz */}
        <form action={formAction} className="grid w-full gap-6">
          {state?.error && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              {state.error}
            </div>
          )}

          {/* Gizli ID inputu şart! */}
          <input type="hidden" name="id" value={product.id} />

          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              id="title"
              defaultValue={product.title}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Price ({product.currency})</Label>
            <Input
              name="price"
              id="price"
              type="number"
              defaultValue={product.price}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              name="currency"
              id="currency"
              defaultValue={product.currency}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              name="description"
              id="description"
              defaultValue={product.description}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              name="category"
              id="category"
              defaultValue={product.category}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              name="stock"
              id="stock"
              type="number"
              defaultValue={product.stock}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
