import { UnexpectedError } from "../../domain/Error.js";

export default function clearUser(userRepo) {
  return async function (id) {
    try {
      await userRepo.deleteUser(id);
    } catch (error) {
      throw new UnexpectedError(
        "An error occurred while deleting the user",
        error
      );
    }
  };
}
