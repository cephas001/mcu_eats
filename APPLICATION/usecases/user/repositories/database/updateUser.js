import { updateUserSchema } from "../../../../validators/user/validateUserData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../../../domain/Error.js";

export default function updateUser(userRepo) {
  return async function (userId, dataToUpdateUserWith) {
    if (!userId) {
      throw new ValidationError("User Id is not defined", null);
    }

    if (!dataToUpdateUserWith) {
      throw new ValidationError(
        "The data to update user with is not defined",
        null
      );
    }

    // Check if user does not exist
    const existingUser = await userRepo.findById(userId);

    if (!existingUser) {
      throw new UserExistenceError("This user does not exists");
    }

    const validationResult = updateUserSchema.safeParse(dataToUpdateUserWith);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedData = validationResult.data;

    try {
      return await userRepo.update(userId, validatedData);
    } catch (error) {
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
