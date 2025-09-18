import { UnexpectedError } from "../../domain/Error.js";

export default function DeleteUserProfiles(profileRepo) {
  return async function (userId) {
    try {
      await profileRepo.deleteUserProfiles(userId);
    } catch (error) {
      throw new UnexpectedError(
        "An error occurred while deleting user profiles data",
        error
      );
    }
  };
}
