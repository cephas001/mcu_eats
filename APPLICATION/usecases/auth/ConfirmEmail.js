import { z } from "zod";
import {
  InvalidTokenError,
  ValidationError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function ConfirmEmail(authService, messageService) {
  return async function (token, redirectURL) {
    if (!token) {
      throw new InvalidTokenError("There is no token provided");
    }

    const urlSchema = z.string().url();
    const urlValidation = urlSchema.safeParse(redirectURL);

    if (!urlValidation.success) {
      throw new ValidationError("Invalid redirect URL sent");
    }

    let userEmail, userId;

    try {
      const { email, id } = await authService.verifyToken(token);
      userEmail = email;
      userId = id;
    } catch (error) {
      throw new InvalidTokenError("Invalid or expired token");
    }

    let link;
    try {
      link = await authService.generateEmailVerificationLink(
        userEmail,
        redirectURL
      );
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while generating the email verification link",
        error
      );
    }

    try {
      const isVerificationLinkSent =
        await messageService.sendEmailVerificationLink(link);

      if (!isVerificationLinkSent) {
        throw new UnexpectedError(
          "An unexpected error occurred while sending verification link"
        );
      }
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while sending the email verification link",
        error
      );
    }

    return { message: "Email sent successly", isVerificationLinkSent };
  };
}
