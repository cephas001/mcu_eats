import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function CreateUser(userRepo) {
  return async function (userData) {
    const id = userData?.id;

    if(!id) {
        throw new ValidationError("User id has to be defined")
    }

    const existingUser = await userRepo.findById(id);

    if (existingUser) {
      throw new UserExistenceError("This user already exists");
    }

    try {
      return await userRepo.createUser(userData);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while creating the user",
        error
      );
    }
  };
}
