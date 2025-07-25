import {
  ValidationError,
  UserExistenceError,
} from "../../../../domain/Error.js";

export default function getUser(userRepo) {
  return async function (userId) {
    if (!userId) {
      throw new ValidationError("User Id is not defined", null);
    }

    // Check if user does not exist
    const existingUser = await userRepo.findById(userId);

    if (!existingUser) {
      throw new UserExistenceError("This user does not exists");
    }

    return existingUser;
  };
}
