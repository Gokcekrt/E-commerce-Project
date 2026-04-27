"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom"; // Bunu ekledik
import { addProductAction } from "@/actions/productActions";
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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Saving..." : "Save Product"}
    </Button>
  );
}

export default function CreateProductPage() {
  const [state, formAction] = useActionState(addProductAction, null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Add new Product</CardTitle>
          <CardDescription>Enter the product details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid w-full gap-6">
            {state?.error && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                {state.error}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input name="title" id="title" type="text" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>

              <Input
                name="price"
                id="price"
                type="number"
                placeholder="100"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Currency</Label>

              <Input
                name="currency"
                id="currency"
                type="text"
                placeholder="USD"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>

              <Input
                name="description"
                id="description"
                type="text"
                placeholder="Enter product description"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>

              <Input
                name="category"
                id="category"
                type="text"
                placeholder="Enter product category"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>

              <Input
                name="stock"
                id="stock"
                type="number"
                placeholder="Enter product stock"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                name="image"
                id="image"
                type="file"
                accept="image/*"
                required
              />
            </div>

            {/* 4. ADIM: Kendi butonumuz buraya geldi */}
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
