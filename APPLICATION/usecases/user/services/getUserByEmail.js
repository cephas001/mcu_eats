import { z } from "zod";
import { UnexpectedError } from "../../../domain/Error.js";

export default function loginUser(loginService) {
  return async function (email) {
    if (!email) {
      throw new Error("No email sent");
    }

    const emailSchema = z.string().email("Invalid email address");

    const result = emailSchema.safeParse(email);

    if (!result.success) {
      throw new ValidationError("Invalid Email", "email");
    }

    try {
      const user = await loginService.getUserByEmail(email);
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
