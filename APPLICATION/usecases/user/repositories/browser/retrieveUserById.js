import { createUserSchema } from "../../../../validators/user/validateUserData.js";
import {
  ValidationError,
  LocalStorageError,
  UserExistenceError,
} from "../../../../domain/Error.js";

export default function retrieveUser(browserUserRepo) {
  return async function (id) {
    try {
      var user = await browserUserRepo.retrieveUserById(id);
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while trying to get user data"
      );
    }

    if (!user) {
      throw new UserExistenceError("User is not stored locally");
    }

    const validationResult = createUserSchema.safeParse(user);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError(
        "The user's data has been tampered with",
        null,
        errorList
      );
    }

    const validatedData = validationResult.data;

    return validatedData;
  };
}
