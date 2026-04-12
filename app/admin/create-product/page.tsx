import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
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

export default async function CreateProductPage() {
  const session = await auth0.getSession();

  if (!session) redirect("/auth/login");

  //server side => adminin dolduracağı ürün formunu paketleyip servera göndermek için gereken fonksiyonu yazıcaz.
  async function handleCreateProduct(formData: FormData) {
    //formdata hazır bi şablon paket:FormData gibi. Yani title değişkeni diyor ki formdata paketinden title etiketini al ve stringe çevir. Diğerleri de aynı şekilde.
    "use server";
    const title = (formData.get("title") as string) || "";
    const price = (formData.get("price") as string) || "";
    const description = (formData.get("description") as string) || "";
    const category = (formData.get("category") as string) || "";
    const image = (formData.get("image") as string) || "";
    //server side kısmında adminin formunda error handling yapıcaz. Yani eğer admin title kısmını boş bırakırsa hata mesajı vereceğiz.
    if (
      title.trim() === "" ||
      price.trim() === "" ||
      description.trim() === "" ||
      category.trim() === "" ||
      image.trim() === ""
    ) {
      throw new Error("All fields are required");
    }
    if (!price || Number(price) <= 0) {
      return;
    }

    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Add new Product</CardTitle>

          <CardDescription>Enter the product details below</CardDescription>
        </CardHeader>

        <CardContent>
          <form action={handleCreateProduct} className="grid w-full gap-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>

                <Input
                  name="title"
                  id="title"
                  type="text"
                  placeholder="Computer"
                  required
                />
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
                <Label htmlFor="image">Image</Label>

                <Input
                  name="image"
                  id="image"
                  type="text"
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
