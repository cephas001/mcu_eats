import { profileTypeSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UnexpectedError,
  UserExistenceError,
  UnauthorizedError,
} from "../../../../domain/Error.js";

export default function getProfilesDataByType(userRepo, profileRepo) {
  return async function (userId, type) {
    if (!userId || !type) {
      throw new ValidationError("User id or type is not defined", null);
    }

    const result = profileTypeSchema.safeParse(type);

    if (!result.success) {
      throw new ValidationError(
        "Profile type must be one of these: vendor, delivery_person, consumer"
      );
    }

    try {
      var user = await userRepo.findById(userId);
    } catch (error) {
      throw new UnexpectedError(
        "An error occurred while trying to get the user"
      );
    }

    if (!user) {
      throw new UserExistenceError("User does not exist in database");
    }

    if (type !== "consumer") {
      if (user.role == "user") {
        throw new UnauthorizedError("You are not permitted to get this data");
      }
    }

    try {
      const profilesData = await profileRepo.getProfilesDataByType(type);

      if (!profilesData) {
        return [];
      }

      return profilesData;
    } catch (error) {
      throw new UnexpectedError(
        "An error occurred while trying to get profiles data"
      );
    }
  };
}
