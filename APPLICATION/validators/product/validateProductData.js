import { z } from "zod";

const comboItemSchema = z.object({
  productId: z.string().min(1, "Combo item must have a productId"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export const createProductSchema = z.object({
  vendorId: z.string().min(1, "Vendor ID is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  // isCombo: z.boolean(),
  // comboItems: z.array(comboItemSchema).optional(),
  category: z.string().min(1, "Category is required"),
  isAvailable: z.boolean("This field is required"),
  isArchived: z.boolean().default(false),
  productImage: z.string().url().optional().nullable(),
});

export const updateProductSchema = createProductSchema.partial().strict();
