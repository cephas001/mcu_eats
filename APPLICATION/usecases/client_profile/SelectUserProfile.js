import { profileTypeSchema } from "../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  ProfileExistenceError,
  ProfileSelectionError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function SelectUserProfile(profileRepo) {
  return async function (userId, type) {
    const profileTypeValidation = profileTypeSchema.safeParse(type);

    if (!profileTypeValidation.success) {
      throw new ValidationError(
        "Profile type must be one of these: vendor, delivery_person, consumer"
      );
    }

    const userProfiles = await profileRepo.getUserProfiles(userId);

    if (!userProfiles || userProfiles.length === 0) {
      throw new ProfileExistenceError("No profiles are stored for this user");
    }

    const userProfile = await profileRepo.getUserProfileByType(userId, type);

    if (!userProfile) {
      throw new ProfileExistenceError(
        `The profile of type ${type} is not already stored`
      );
    }

    try {
      await profileRepo.selectUserProfile(userProfile);
    } catch (error) {
      throw new ProfileSelectionError(
        "An error occurred while selecting the user profile",
        error
      );
    }
  };
}
