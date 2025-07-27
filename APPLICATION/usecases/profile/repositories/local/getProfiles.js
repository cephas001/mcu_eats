import { createProfileSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  LocalStorageError,
  ProfileExistenceError,
} from "../../../../domain/Error.js";

export default function (localProfileRepo) {
  return async function () {
    try {
      var profilesData = await localProfileRepo.getProfiles();
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while trying to get profile data"
      );
    }

    if (!profilesData) {
      throw new ProfileExistenceError("Profiles are not stored locally");
    }

    for (const profileData of profilesData) {
      const validationResult = createProfileSchema.safeParse(profileData);
      if (!validationResult.success) {
        const errorList = validationResult.error.errors.map((e) => ({
          inputName: e.path.join(".") || "unknown",
          errorMessage: e.message,
        }));
        throw new ValidationError("Validation failed", null, errorList);
      }
    }

    return profilesData;
  };
}
