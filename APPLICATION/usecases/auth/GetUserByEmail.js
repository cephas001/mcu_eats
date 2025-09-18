import { z } from "zod";
import { UnexpectedError } from "../../domain/Error.js";

export default function GetUserByEmail(authService) {
  return async function (email) {
    const emailSchema = z.string().email("Invalid email address");

    const emailValidation = emailSchema.safeParse(email);

    if (!emailValidation.success) {
      throw new ValidationError("Invalid Email", "email");
    }

    try {
      const user = await authService.getUserByEmail(email);
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to get the user by their email",
        error
      );
    }
  };
}
