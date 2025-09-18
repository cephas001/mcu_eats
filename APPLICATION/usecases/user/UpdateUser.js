import { updateUserSchema } from "../../validators/user/validateUserData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function UpdateUser(userRepo) {
  return async function (userId, updateData) {
    if (!userId) {
      throw new ValidationError("User ID is not defined");
    }

    if (!updateData) {
      throw new ValidationError("Update data is not defined");
    }

    let existingUser = null;
    try {
      existingUser = await userRepo.findById(userId);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while getting user by their id",
        error
      );
    }

    if (!existingUser) {
      throw new UserExistenceError("This user does not exist");
    }

    const parsedUpdateData = updateUserSchema.safeParse(updateData);
    if (!parsedUpdateData.success) {
      const errorList = parsedUpdateData.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    try {
      return await userRepo.update(userId, parsedUpdateData.data);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while updating the user data",
        error
      );
    }
  };
}
