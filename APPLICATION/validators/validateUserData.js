import { z } from "zod";

const profileRefSchema = z.object({
  type: z.enum(["consumer", "delivery_person", "vendor"]),
  profileId: z.string().min(1, "Profile ID is required"),
});

export const createUserSchema = z.object({
  id: z.string().min(1, "ID is required"),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z.string().email("Invalid email address"),

  phoneNumber: z
    .string()
    .regex(/^0[789][01]\d{8}$/, "Phone number must be a valid Nigerian number"),

  verifiedEmail: z.boolean().optional().default(false),

  role: z
    .enum(["user", "admin", "superadmin"], {
      errorMap: () => ({ message: "Role must be user, admin or superadmin" }),
    })
    .default("user"),

  profiles: z.array(profileRefSchema).optional().default([]),

  status: z.enum(["active", "inactive", "banned"]).optional().default("active"),

  createdAt: z.coerce
    .date()
    .optional()
    .default(() => new Date()),

  updatedAt: z.coerce
    .date()
    .optional()
    .default(() => new Date()),

  lastLogin: z.coerce.date().nullable().optional(),
});
