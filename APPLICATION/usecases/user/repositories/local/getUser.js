import { createUserSchema } from "../../../../validators/user/validateUserData.js";
import {
  ValidationError,
  LocalStorageError,
  UserExistenceError,
} from "../../../../domain/Error.js";

export default function (localUserRepo) {
  return async function () {
    try {
      var userData = await localUserRepo.getUser();
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while trying to get user data"
      );
    }

    if (!userData) {
      throw new UserExistenceError("User is not stored locally");
    }

    const validationResult = createUserSchema.safeParse(userData);

    if (!validationResult.success) {
      console.log(validationResult.error);
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError(
        "User data has been tampered with",
        null,
        errorList
      );
    }

    const validatedData = validationResult.data;

    return validatedData;
  };
}
