"use server";

import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { createProduct } from "@/services/productService";
import { revalidatePath } from "next/cache";

import { getAdmin } from "@/lib/authz"; // Doğru auth fonksiyonunu çekiyoruz

export const addProductAction = async (prevState: any,formData: FormData) => {
  
  const adminUser = await getAdmin();
  if (!adminUser) {
    return { error: "Only users with admin privileges can add products." };
  }

  
  const title = (formData.get("title") as string) || "";
  const price = parseFloat(formData.get("price") as string) || 0;
  const description = (formData.get("description") as string) || "";
  const stock = parseInt(formData.get("stock") as string) || 0;
  const category = (formData.get("category") as string) || "General";
  const currency = (formData.get("currency") as string) || "USD";
  const image = formData.get("image") as File | null;

  
  if (!title || price <= 0 || !description || !image || image.size === 0) {
    return { error: "Please fill in all required fields and upload a valid image." };
  }

  
  const filename = `products/${Date.now()}-${image.name}`;
  const blob = await put(filename, image, {
    access: "public",
    addRandomSuffix: true, 
  });

 
  await createProduct({
    title,
    description,
    price,
    stock,
    category,
    currency,
    images: [blob.url], // Sadece Blob'dan dönen URL'yi gönderiyoruz
  });

  
  revalidatePath("/admin/products");
  redirect("/admin/products");
};

export const deleteProductAction = async (formData: FormData) => {
  
  const adminUser = await getAdmin();
  if (!adminUser) {
    return { error: "Only users with admin privileges can delete products." };
  }

  const productId = formData.get("id") as string;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (product && product.images.length > 0) {
    
    await del(product.images[0]);
  }

  await prisma.product.delete({
    where: { id: productId },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
};

export const updateProductAction = async (formData: FormData) => {

  const adminUser = await getAdmin();
  if (!adminUser) {
    return { error: "Only users with admin privileges can update products." };
  }

  const productId = formData.get("id") as string;
  const title = (formData.get("title") as string) || "";
  const price = parseFloat(formData.get("price") as string) || 0;
  const description = (formData.get("description") as string) || "";
  const stock = parseInt(formData.get("stock") as string) || 0;
  const currency = (formData.get("currency") as string) || "USD";
  const category = (formData.get("category") as string) || "General";

  await prisma.product.update({
    where: { id: productId },
    data: {
      title,
      price,
      description,
      stock,
      currency,
      category,
      
    },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
};