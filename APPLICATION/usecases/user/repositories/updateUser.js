import User from "../../../domain/User.js";
import { createUserSchema } from "../../../validators/validateUserData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../../domain/Error.js";

export default function createUser(userRepo) {
  return async function (userId, userData) {
    if (!userId) {
      throw new ValidationError("User Id is not defined", null);
    }

    if (!userData) {
      throw new ValidationError("User data is not defined", null);
    }

    // Check if user does not exist
    const existingUser = await userRepo.findById(userId);

    if (!existingUser) {
      throw new UserExistenceError("This user does not exists");
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
      const user = new User(validatedData);
      return await userRepo.update(userId, user);
    } catch (error) {
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
