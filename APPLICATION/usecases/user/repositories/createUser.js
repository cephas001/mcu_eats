import User from "../../../domain/User.js";
import { createUserSchema } from "../../../validators/validateUserData.js";
import {
  ValidationError,
  UserAlreadyExistsError,
} from "../../../domain/Error.js";

export default function createUser(userRepo) {
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

    // Check if user already exists
    const existingUser = await userRepo.findById(validatedData.id);

    if (existingUser) {
      throw new UserAlreadyExistsError("User already exists");
    }

    // Create a new user instance
    const user = new User(validatedData);
    return await userRepo.create(user);
  };
}
