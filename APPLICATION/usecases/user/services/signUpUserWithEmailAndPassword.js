import { createSignUpUserSchema } from "../../../validators/validateSignUpUserData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../../domain/Error.js";

export default function signUpUserWithEmailAndPassword(signUpService) {
  return async function ({ email, password, confirmPassword }) {
    const validationResult = createSignUpUserSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedData = validationResult.data;

    if (password !== confirmPassword) {
      throw new ValidationError("Passwords do not match", "confirmPassword");
    }

    const signedUpUser = await signUpService.getUserByEmail(
      validatedData.email
    );

    if (signedUpUser) {
      throw new UserExistenceError(
        "User already exists. Please login instead."
      );
    }

    try {
      const { user, id, token } =
        await signUpService.signUpUserWithEmailAndPassword({
          email: validatedData.email,
          password: validatedData.password,
        });

      return { user, id, token };
    } catch (error) {
      console.log(error);
      throw new UnexpectedError("Error while signing up");
    }
  };
}
