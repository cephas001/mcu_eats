import { loginUserSchema } from "../../validators/auth/validateLoginUserData.js";
import {
  ValidationError,
  InvalidCredentialsError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function LoginUserViaService(loginService) {
  return async function ({ email, password }) {
    const loginValidation = loginUserSchema.safeParse({
      email,
      password,
    });

    if (!loginValidation.success) {
      const errorList = loginValidation.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    try {
      const token = await loginService.loginWithEmailAndPassword(
        email,
        password
      );
      return token;
    } catch (error) {
      // This error type must be explicitly from the service implementation to display credentials error otherwise, an unexpected error would be thrown
      if (error.type == "InvalidCredentialsError") {
        throw new InvalidCredentialsError("Invalid login credentials");
      }
      throw new UnexpectedError(
        "An unexpected error occurred while trying to log the user in",
        error
      );
    }
  };
}
