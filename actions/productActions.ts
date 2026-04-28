"use server";
import {ProductSchema} from "@/lib/schemas"; 
import { stripe } from "@/lib/stripe"; 
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { createProduct, getProductById, updateProduct } from "@/services/productService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/authz";

export const addProductAction = async (prevState: any,formData: FormData) => {
  
  
  const adminUser = await getAdmin();
  if (!adminUser) {
    return { error: "Only users with admin privileges can add products." };
  }
const rawData = Object.fromEntries(formData.entries()); // Formdaki her şeyi objeye çevirir
const validatedFields = ProductSchema.safeParse(rawData);

  if (!validatedFields.success) {
   
    return { 
      error: "Validation failed", 
      details: validatedFields.error.flatten().fieldErrors 
    };
  }
  const { title, description, price, stock, category, currency } = validatedFields.data;
  const image = formData.get("image") as File | null;

  if (!image || image.size === 0){ return { error: "Image is required." };} 

  try {
    
    // 3. Vercel Blob Upload
    const filename = `products/${Date.now()}-${image.name}`;
    const blob = await put(filename, image, {
      access: "public",
      addRandomSuffix: true,
    });

    
    // Önce Stripe'ta ürünü oluşturuyoruz
    const stripeProduct = await stripe.products.create({
      name: title,
      description: description,
      images: [blob.url],
    });

    //  bu ürüne bağlı fiyatı oluşturuyoruz
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(price * 100),
      currency: currency.toLowerCase(),
    });

    // 5. Veritabanına Kayıt
    await createProduct({
      title,
      description,
      price,
      stock,
      category,
      currency,
      images: [blob.url],
      stripeProductId: stripeProduct.id, 
      stripePriceId: stripePrice.id,     
    });

    revalidatePath("/admin/products");
    
  } catch (err: any) {
    
   
    return { error: "Failed to create product in Stripe or Database." };
  }

  redirect("/admin/products");
};

export const deleteProductAction = async (prevState: any,formData: FormData) => {
  
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

export const updateProductAction = async (prevState: any, formData: FormData) => {
  const adminUser = await getAdmin();
  if (!adminUser) return { error: "Admin authentication required." };

  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = ProductSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { error: "Validation error", details: validatedFields.error.flatten().fieldErrors };
  }

  // Zod'dan gelen verileri alıyoruz
  const { title, price, description, stock, currency, category } = validatedFields.data;
  const productId = formData.get("id") as string;

  try {
    // 1. Mevcut ürünü bul (Eski Stripe ID'leri lazım)
    const existingProduct = await getProductById(productId);

    if (!existingProduct) return { error: "Product not found." };

    if (!existingProduct.stripeProductId || !existingProduct.stripePriceId) {
      return { error: "This product has no Stripe connection, cannot be updated." };
    }

    // Değişkeni try içinde güncelleyeceğiz 
    let currentStripePriceId = existingProduct.stripePriceId;

    
    // Eğer fiyat değiştiyse Stripe'ta yeni fiyat oluşturmalıyız
    if (price !== existingProduct.price) {
      const newStripePrice = await stripe.prices.create({
        product: existingProduct.stripeProductId!,
        unit_amount: Math.round(price * 100),
        currency: currency.toLowerCase(),
      });
      currentStripePriceId = newStripePrice.id;
    }

    // Ürün adı veya açıklaması değiştiyse Stripe ürününü de güncelle
    if (title !== existingProduct.title || description !== existingProduct.description) {
      await stripe.products.update(existingProduct.stripeProductId!, {
        name: title,
        description: description,
      });
    }

    // 3. MONGODB GÜNCELLEME
   await updateProduct(productId, {
        title,
        price,
        description,
        stock,
        currency,
        category,
        stripePriceId: currentStripePriceId, 
    });

    revalidatePath("/admin/products");
    
  } catch (err: any) {
    console.error("Update Error:", err);
    return { error: "Failed to update product." };
  }

  redirect("/admin/products");
};
