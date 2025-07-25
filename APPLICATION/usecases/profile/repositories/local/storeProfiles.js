import Profile from "../../../../domain/Profile.js";
import { createProfileSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function storeProfiles(localProfileRepo, localUserRepo) {
  return async function (profilesData) {
    if (!profilesData) {
      throw new ValidationError("Profile data is not defined", null);
    }

    if (!Array.isArray(profilesData) || profilesData.length === 0) {
      throw new ValidationError(
        "Profiles data must be a non-empty array",
        null
      );
    }

    for (const profileData of profilesData) {
      if (!profileData.userId) {
        throw new ValidationError("User ID is not defined", null);
      }

      if (!profileData.type) {
        throw new ValidationError("Profile type is not defined", null);
      }

      const savedUser = await localUserRepo.getUser(profileData.userId);
      if (!savedUser) {
        throw new UserExistenceError("User is not already saved");
      }

      const validationResult = createProfileSchema.safeParse(profileData);
      if (!validationResult.success) {
        const errorList = validationResult.error.errors.map((e) => ({
          inputName: e.path.join(".") || "unknown",
          errorMessage: e.message,
        }));
        throw new ValidationError("Validation failed", null, errorList);
      }
    }

    try {
      await localProfileRepo.clearProfiles();

      const profiles = await localProfileRepo.storeProfiles(
        profilesData.map((profileData) => new Profile(profileData))
      );
      return profiles;
    } catch (error) {
      throw new LocalStorageError("An error occurred while storing profiles");
    }
  };
}
