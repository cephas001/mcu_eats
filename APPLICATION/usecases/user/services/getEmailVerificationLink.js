import { z } from "zod";
import {
  InvalidTokenError,
  ValidationError,
  UnexpectedError,
} from "../../../domain/Error.js";

export default function getEmailVerificationLink(authService) {
  return async function (token, redirectURL) {
    if (!token) {
      throw new InvalidTokenError("Unauthorized: No token provided");
    }

    const urlSchema = z.string().url();
    const validation = urlSchema.safeParse(redirectURL);

    if (!validation.success) {
      throw new ValidationError("Invalid redirect URL");
    }

    try {
      var { email, id } = await authService.verifyToken(token);
    } catch (error) {
      throw new InvalidTokenError("Invalid or expired token");
    }

    try {
      const link = await authService.generateEmailVerificationLink(
        email,
        redirectURL
      );

      return { id, link };
    } catch (error) {
      console.log(error);
      throw new UnexpectedError("Failed to generate email verification link");
    }
  };
}
