import Profile from "../../../../domain/Profile.js";
import { createProfileSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function storeUserProfiles(browserProfileRepo, browserUserRepo) {
  return async function (userProfiles) {
    if (!userProfiles) {
      throw new ValidationError("User profiles are not defined", null);
    }

    if (!Array.isArray(userProfiles) || userProfiles?.length === 0) {
      throw new ValidationError(
        "User profiles must be a non-empty array",
        null
      );
    }

    for (const userProfile of userProfiles) {
      if (!userProfile.userId) {
        throw new ValidationError(
          "User ID is not defined in profiles data",
          null
        );
      }

      if (!userProfile.type) {
        throw new ValidationError(
          "Profile type is not defined in profiles data",
          null
        );
      }

      const savedUser = await browserUserRepo.retrieveUserById(
        userProfile.userId
      );

      if (!savedUser) {
        throw new UserExistenceError("This user is not already saved");
      }

      const validationResult = createProfileSchema.safeParse(userProfile);

      if (!validationResult.success) {
        const errorList = validationResult.error.errors.map((e) => ({
          inputName: e.path.join(".") || "unknown",
          errorMessage: e.message,
        }));
        throw new ValidationError(
          "User profile data has been tampered with",
          null,
          errorList
        );
      }
    }

    try {
      await browserProfileRepo.clearUserProfiles();

      const profiles = await browserProfileRepo.storeUserProfiles(
        userProfiles.map((userProfile) => new Profile(userProfile))
      );
      return profiles;
    } catch (error) {
      throw new LocalStorageError("An error occurred while storing profiles");
    }
  };
}
