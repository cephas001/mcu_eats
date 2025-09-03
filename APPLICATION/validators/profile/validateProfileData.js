import { z } from "zod";

// Shared Schemas
const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const accountDetailsSchema = z.object({
  bankName: z.string().min(1),
  accountNumber: z.string().min(10),
  accountHolderName: z.string().min(1),
});

const orderRefSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

const pendingOrderSchema = orderRefSchema.extend({
  issuedAt: z.coerce.date(),
});

const activeOrderSchema = orderRefSchema.extend({
  pickedUpAt: z.coerce.date(),
});

const completedOrderSchema = orderRefSchema.extend({
  completedOn: z.coerce.date(),
});

const timeSchema = z.object({
  hour: z
    .number({ invalid_type_error: "Time must be a number" })
    .int()
    .min(0, "Hour must be between 0 and 23")
    .max(23, "Hour must be between 0 and 23"),

  minute: z
    .number({ invalid_type_error: "Time must be a number" })
    .int()
    .min(0, "Minute must be between 0 and 59")
    .max(59, "Minute must be between 0 and 59"),
});

// End of Shared Schemas

const consumerDataSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .regex(/^[^\d]/, "Username must not start with a number"),
  gender: z.enum(["male", "female"]),
  hostel: z.string().min(1),
  roomNumber: z.string().min(1),
  college: z.string().min(1).optional(),
  officeNumber: z.string().min(1).optional(),
  favorites: z
    .array(
      z.object({
        itemId: z.string().optional(),
        type: z.string().min(1), // 'vendor' or 'product'
      })
    )
    .optional()
    .default([]),
  addresses: z
    .array(
      z.object({
        id: z.string().optional(),
        address: z.string().min(1),
        tag: z.string().optional(), // e.g., 'home', 'work'
      })
    )
    .optional()
    .default([]),
  notes: z
    .array(
      z.object({
        id: z.string().optional(),
        note: z.string().min(1),
        type: z.enum(["delivery", "pickup"]),
      })
    )
    .optional()
    .default([]),
});

const deliveryPersonDataSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .regex(/^[^\d]/, "Username must not start with a number"),
  gender: z.enum(["male", "female"]),
  hostel: z.string().min(1, "Hostel is required"),
  roomNumber: z
    .string()
    .min(1, "Room number is required")
    .max(3, "Please enter a valid room number"),
  college: z.string().min(1, "College is required"),
  department: z.string().min(1, "Department is required"),
  matricNumber: z
    .string()
    .min(5, { message: "Please enter a valid matric number" })
    .max(10, { message: "Please enter a valid matric number" })
    .regex(/^\d+$/, "Matric number must contain only digits"),
  available: z.boolean().default(false),
  penaltyPoints: z.number().int().nonnegative().optional().default(0),
  averageDeliveryTime: z.number().nonnegative().optional().default(1),
  location: locationSchema.optional(),
  accountDetails: accountDetailsSchema.optional(),
  pendingOrders: z.array(pendingOrderSchema).optional().default([]),
  activeOrders: z.array(activeOrderSchema).optional().default([]),
  completedOrders: z.array(completedOrderSchema).optional().default([]),
});

const productSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be at most 100 characters")
    .regex(/^[^0-9]*$/, "Product name must not contain numbers"),
  description: z.string().max(500).optional(),
  price: z.number().positive("Price must be a positive number"),
  productType: z.string().min(1, "Product type is required"),
});

const vendorDataSchema = z.object({
  vendorName: z
    .string()
    .min(1, "Vendor name is required")
    .regex(/^[^0-9]*$/, "Vendor name must not contain numbers"),
  vendorType: z.enum(["restaurant", "retailer", "shop"]),
  description: z.string().min(1, "Description is required"),
  businessNumber: z
    .string()
    .regex(/^0[789][01]\d{8}$/, "Phone number must be a valid Nigerian number"),
  businessEmail: z.string().email("Invalid email address").optional(),
  category: z.enum([
    "pastries",
    "snacks and grills",
    "stationeries",
    "quick meals",
    "swallow and more",
    "electronics",
  ]),
  takingOrders: z.boolean().default(false),
  openingTime: timeSchema,
  closingTime: timeSchema,
  address: z.string().min(1, "Address is required"),
  products: z.array(productSchema).optional().default([]),
  verificationStatus: z
    .enum(["pending", "approved", "rejected"])
    .default("pending"),
  location: locationSchema.optional(),
  accountDetails: accountDetailsSchema.optional(),
  pendingOrders: z.array(pendingOrderSchema).optional().default([]),
  activeOrders: z.array(activeOrderSchema).optional().default([]),
  completedOrders: z.array(completedOrderSchema).optional().default([]),
});

// The main schema with discriminated union
export const createProfileSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string().optional(),
    type: z.literal("consumer"),
    userId: z.string(),
    data: consumerDataSchema,
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("delivery_person"),
    userId: z.string(),
    data: deliveryPersonDataSchema,
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("vendor"),
    userId: z.string(),
    data: vendorDataSchema,
  }),
]);
