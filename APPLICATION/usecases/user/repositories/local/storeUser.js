import User from "../../../../domain/User.js";
import { createUserSchema } from "../../../../validators/user/validateUserData.js";
import {
  ValidationError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function (localUserRepo) {
  return async function (userData) {
    if (!userData) {
      throw new ValidationError("User data is not defined", null);
    }

    const validationResult = createUserSchema.safeParse(userData);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedData = validationResult.data;

    try {
      await localUserRepo.clearUser();

      return await localUserRepo.storeUser(validatedData);
    } catch (error) {
      throw new LocalStorageError("An error occurred while storing user data");
    }
  };
}
