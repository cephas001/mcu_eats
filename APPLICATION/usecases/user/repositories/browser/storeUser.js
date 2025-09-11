import { createUserSchema } from "../../../../validators/user/validateUserData.js";
import {
  ValidationError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function storeUser(browserUserRepo) {
  return async function (userData) {
    if (!userData) {
      throw new ValidationError("The user to be stored is not defined", null);
    }

    console.log(userData);

    const validationResult = createUserSchema.safeParse(userData);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));
      console.log(errorList);
      throw new ValidationError(
        "The user data has been tampered with",
        null,
        errorList
      );
    }

    const validatedData = validationResult.data;

    try {
      await browserUserRepo.clearUser();

      return await browserUserRepo.storeUser(validatedData);
    } catch (error) {
      throw new LocalStorageError("An error occurred while storing user data");
    }
  };
}
