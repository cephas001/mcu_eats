import { createProfileSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  ProfileExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function selectProfile(localProfileRepo) {
  return async function (type) {
    if (!type) {
      throw new ValidationError("Profile type is not defined", null);
    }

    const profilesData = await localProfileRepo.getProfiles();

    if (!profilesData || profilesData.length === 0) {
      throw new ProfileExistenceError("No saved profiles found for this user");
    }

    const profileData = await localProfileRepo.getProfileByType(type);

    if (!profileData) {
      throw new ProfileExistenceError("This profile is not already saved");
    }

    const validationResult = createProfileSchema.safeParse(profileData);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));
      throw new ValidationError(
        "Profile data has been tampered with",
        null,
        errorList
      );
    }

    const validatedData = validationResult.data;

    try {
      await localProfileRepo.clearSelectedProfile();

      await localProfileRepo.selectProfile(validatedData);
    } catch (error) {
      throw new LocalStorageError("An error occurred while selecting profile");
    }
  };
}
