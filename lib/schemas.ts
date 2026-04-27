// types/index.ts
import { z } from "zod";

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
  stripeProductId: string;
  stripePriceId: string;
};
export type Product = CreateProductPayload & {
  id: string;
};