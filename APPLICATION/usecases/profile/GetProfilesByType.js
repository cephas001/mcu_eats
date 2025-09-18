import { profileTypeSchema } from "../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UnexpectedError,
  UserExistenceError,
  UnauthorizedError,
} from "../../domain/Error.js";

export default function GetProfilesByType(userRepo, profileRepo) {
  return async function (userId, type) {
    if (!userId || !type) {
      throw new ValidationError("The user's id or profile type is not defined");
    }

    const profileTypeValidation = profileTypeSchema.safeParse(type);

    if (!profileTypeValidation.success) {
      throw new ValidationError(
        "Profile type must be one of these: vendor, delivery_person, consumer"
      );
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

    if (type !== "consumer" && user.role == "user") {
      throw new UnauthorizedError(
        "This user is not authorized to get the requested information"
      );
    }

    try {
      const profilesData = await profileRepo.getProfilesByType(type);

      if (!profilesData) {
        return [];
      }

      return profilesData;
    } catch (error) {
      throw new UnexpectedError(
        `An unexpected error occurred while trying to get the ${type} profiles data`,
        error
      );
    }
  };
}
