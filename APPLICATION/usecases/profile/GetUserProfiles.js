import {
  ValidationError,
  UnexpectedError,
  ProfileExistenceError,
  UserExistenceError
} from "../../domain/Error.js";

export default function getUserProfiles(userRepo, profileRepo) {
  return async function (userId) {
    if (!userId) {
      throw new ValidationError("The user id is not defined");
    }
    
    let user = null;
    try {
      user = await userRepo.findById(userId);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to find the user with the id",
        error
      );
    }

    if (!user) {
      throw new UserExistenceError("This user does not exist in the database");
    }

    try {
      const profiles = await profileRepo.getUserProfiles(userId);

      if (!profiles) {
        throw new ProfileExistenceError("This user has no profiles");
      }

      return profiles;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while getting the user profiles",
        error
      );
    }
  };
}
