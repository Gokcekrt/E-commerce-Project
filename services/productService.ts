import { prisma } from "@/lib/prisma";
import { CreateProductPayload } from "@/lib/schemas";


export const createProduct = async (data: CreateProductPayload) => {
  
  const newProduct = await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category,
      images: data.images, 
      currency: data.currency || "USD",
      stripeProductId: data.stripeProductId,
      stripePriceId: data.stripePriceId,
    },
  });

  return newProduct;
};
// 2. Tüm Ürünleri Getir 
export const getAllProducts = async () => {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
};

// 3. Tek Bir Ürünü ID ile Getir (Edit sayfası ve detaylar için)
export const getProductById = async (id: string) => {
   if (!id) return null;
  return await prisma.product.findUnique({
    where: { id },
  });
};

// 4. Ürünü Güncelle (updateProductAction için)
export const updateProduct = async (id: string, data: any) => {
  return await prisma.product.update({
    where: { id },
    data: data,
  });
};

// 5. Ürünü Sil (deleteProductAction için)
export const deleteProductFromDb = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};
