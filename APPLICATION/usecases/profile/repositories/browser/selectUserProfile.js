import {
  ValidationError,
  ProfileExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function selectUserProfile(browserProfileRepo) {
  return async function (type) {
    if (!type) {
      throw new ValidationError("Profile type is not defined", null);
    }

    const userProfiles = await browserProfileRepo.retrieveUserProfiles();

    if (!userProfiles || userProfiles.length === 0) {
      throw new ProfileExistenceError("No profiles are stored for this user");
    }

    const userProfile = await browserProfileRepo.retrieveUserProfileByType(
      type
    );

    if (!userProfile) {
      throw new ProfileExistenceError("This profile is not already saved");
    }

    try {
      await browserProfileRepo.clearUserSelectedProfile();

      await browserProfileRepo.selectUserProfile(userProfile);
    } catch (error) {
      throw new LocalStorageError("An error occurred while selecting profile");
    }
  };
}
