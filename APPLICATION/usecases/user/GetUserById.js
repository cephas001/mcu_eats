import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function GetUserById(userRepo) {
  return async function (userId) {
    if (!userId) {
      throw new ValidationError("User ID is not defined");
    }

    let user = null;
    try {
      user = await userRepo.findById(userId);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to find the user by their id",
        error
      );
    }

    if (!user) {
      throw new UserExistenceError("This user does not exist");
    }

    return user;
  };
}
