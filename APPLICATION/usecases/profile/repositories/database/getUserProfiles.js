import { ValidationError, UnexpectedError } from "../../../../domain/Error.js";

export default function getUserProfiles(profileRepo) {
  return async function (userId, profileTypes) {
    if (!userId) {
      throw new ValidationError("User Id is not defined", null);
    }

    if (!Array.isArray(profileTypes) || profileTypes?.length == 0) {
      throw new ValidationError("Profile types are not properly defined", null);
    }

    try {
      const profiles = await profileRepo.getUserProfiles(userId, profileTypes);

      return profiles;
    } catch (error) {
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
