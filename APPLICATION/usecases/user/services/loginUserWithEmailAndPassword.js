import { createLoginUserSchema } from "../../../validators/user/validateLoginUserData.js";
import {
  ValidationError,
  InvalidCredentialsError,
  UnexpectedError,
} from "../../../domain/Error.js";

export default function loginUserWithEmailAndPassword(loginService) {
  return async function ({ email, password }) {
    const validationResult = createLoginUserSchema.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedData = validationResult.data;

    try {
      const token = await loginService.loginWithEmailAndPassword(
        validatedData.email,
        validatedData.password
      );
      return token;
    } catch (error) {
      // This error type must be explicitly set on the frontend to display credentials error otherwise, an unexpected error would be thrown
      if (error.type == "InvalidCredentialsError") {
        throw new InvalidCredentialsError("Invalid login credentials");
      }
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
