import { signupUserSchema } from "../../validators/auth/validateSignupUserData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function SignupUserWithEmail(signupService) {
  return async function ({ email, password, confirmPassword }) {
    const signupValidation = signupUserSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!signupValidation.success) {
      const errorList = signupValidation.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    if (password !== confirmPassword) {
      throw new ValidationError("Passwords do not match", "confirmPassword");
    }

    const signedUpUser = await signupService.getUserByEmail(email);

    if (signedUpUser) {
      throw new UserExistenceError(
        "This user already exists. Please login instead."
      );
    }

    try {
      const { user, id, token } =
        await signupService.signUpUserWithEmailAndPassword({
          email,
          password,
        });

      return { user, id, token };
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while signing up"
      );
    }
  };
}
