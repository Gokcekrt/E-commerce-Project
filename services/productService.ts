import { prisma } from "@/lib/prisma";


export type CreateProductPayload = {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[]; // Blob'a yüklendikten sonra buraya sadece URL'ler gelecek
  currency?: string; 
};

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
    },
  });

  return newProduct;
};