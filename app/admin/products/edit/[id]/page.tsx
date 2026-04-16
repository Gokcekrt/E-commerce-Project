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
import { prisma } from "@/lib/prisma";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>; //burası da promise old için await kullanarak id'yi aldık
}) {
  // promise old için await kullanarak id'yi aldık
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    return <div className="p-10 text-center">Product not found.</div>;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>

          <CardDescription>Update the product details below</CardDescription>
        </CardHeader>

        <CardContent>
          <form action={updateProductAction} className="grid w-full gap-6">
            <input type="hidden" name="id" value={product.id} />
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>

              <Input
                name="title"
                id="title"
                type="text"
                placeholder="Skincare Set"
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
                placeholder="100"
                defaultValue={product.price}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>

              <Input
                name="currency"
                id="currency"
                type="text"
                placeholder="USD"
                defaultValue={product.currency}
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
                defaultValue={product.description}
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
                placeholder="Enter product stock"
                defaultValue={product.stock}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
