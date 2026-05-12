// types/index.ts
import { z } from "zod";
import { Product as PrismaProduct } from "@prisma/client";

export const ProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description is too short"),
  price: z.preprocess((val) => parseFloat(val as string), z.number().positive("Price must be a positive number")),
  stock: z.preprocess((val) => parseInt(val as string), z.number().int().nonnegative()),
  category: z.string().optional().default("General"),
  currency: z.string().optional().default("USD"),
});

export type ProductInput = z.infer<typeof ProductSchema>;


export type CreateProductPayload = z.infer<typeof ProductSchema> & {
  images: string[];
  stripeProductId: string | null;
  stripePriceId: string | null;
};
export type Product = PrismaProduct;

export const CartItemSchema = z.object({
  id: z.string(),
  stripePriceId: z.string(), // Ödeme yaparken Stripe'a göndereceğimiz ID
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be greater than 0"),
  image: z.string(),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});


export type CartItemType = z.infer<typeof CartItemSchema>;
