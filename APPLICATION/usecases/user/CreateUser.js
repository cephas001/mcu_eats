import User from "../../domain/User.js";
import { createUserSchema } from "../../validators/user/validateUserData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function CreateUser(userRepo) {
  return async function (userData) {
    if (!userData) {
      throw new ValidationError("User data is missing");
    }

    const parsedUserData = createUserSchema.safeParse(userData);

    if (!parsedUserData.success) {
      const errorList = parsedUserData.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const { id } = parsedUserData.data;

    const existingUser = await userRepo.findById(id);
    if (existingUser) {
      throw new UserExistenceError("This user already exists");
    }

    try {
      const user = new User(parsedUserData.data);
      return await userRepo.createUser(user);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while creating the user",
        error
      );
    }
  };
}
