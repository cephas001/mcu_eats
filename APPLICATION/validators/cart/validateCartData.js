import { z } from "zod";

const CartItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
});

const CartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(CartItemSchema).default([]),
  totalPrice: z.number().nonnegative(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});

const UpdateCartItemSchema = CartItemSchema.partial().strict();

export { CartItemSchema, CartSchema, UpdateCartItemSchema };
