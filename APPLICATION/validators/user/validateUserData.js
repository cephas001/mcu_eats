import { z } from "zod";

const profileRefSchema = z.object({
  type: z.enum(["consumer", "delivery_person", "vendor"]),
  profileId: z.string().min(1, "Profile ID is required"),
});

const dateSchema = z
  .string()
  .refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    {
      message: "Invalid date string",
    }
  )
  .optional()
  .default(() => new Date().toISOString());

export const createUserSchema = z.object({
  id: z.string().min(1, "ID is required"),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(/^[^0-9]*$/, "Name must not contain numbers"),

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

  category: z.enum(["student", "staff", "visitor"], {
    errorMap: () => ({
      message: "Category must be student, staff or visitor",
    }),
  }),
  profiles: z.array(profileRefSchema).optional().default([]),

  status: z.enum(["active", "inactive", "banned"]).optional().default("active"),

  createdAt: dateSchema,

  updatedAt: dateSchema,

  lastLogin: dateSchema,
});
