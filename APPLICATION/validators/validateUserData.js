const { z } = require("zod");

const createUserSchema = z
  .object({
    id: z.string().min(1, "ID is required"),
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().length(11, "Phone number must be 11 digits"),
    role: z.enum(["consumer", "delivery", "vendor", "admin"]),
  })
  .passthrough();

module.exports = { createUserSchema };
