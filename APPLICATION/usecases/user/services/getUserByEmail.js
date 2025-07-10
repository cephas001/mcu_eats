import { z } from "zod";

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

    const user = await loginService.getUserByEmail(email);

    if (!user) {
      throw new Error("User does not exist");
    }

    return user;
  };
}
