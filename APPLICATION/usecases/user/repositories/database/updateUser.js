import User from "../../../../domain/User.js";
import { createUserSchema } from "../../../../validators/user/validateUserData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../../../domain/Error.js";

export default function updateUser(userRepo) {
  return async function (userId, dataToAdd) {
    if (!userId) {
      throw new ValidationError("User Id is not defined", null);
    }

    if (!dataToAdd) {
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

    const validationResult = createUserSchema.safeParse(dataToAdd);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedData = validationResult.data;

    try {
      const user = new User(validatedData);
      return await userRepo.update(userId, user);
    } catch (error) {
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
