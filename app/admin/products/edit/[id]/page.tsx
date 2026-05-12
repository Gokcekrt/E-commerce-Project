import { getProductById } from "@/services/productService"; // Servisi çağırdık
import EditProductForm from "@/app/admin/products/edit/[id]/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ARTIK BURADA PRISMA YOK!
  // Sadece servise "şu ID'li ürünü getir" diyoruz.
  const product = await getProductById(id);

  if (!product) {
    return <div className="p-10 text-center">Product not found.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <EditProductForm product={product} />
    </div>
  );
}
